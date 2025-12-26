;; This contract is used to store attestations about content.

(define-constant ERR_PAUSED u1000)
(define-constant ERR_ADMIN_ALREADY_SET u1002)
(define-constant ERR_NOT_AUTHORIZED u1003)
(define-constant ERR_NOT_ATTESTOR u1004)
(define-constant ERR_CONTENT_NOT_FOUND u1005)

(define-map content {hash: (buff 32)} {url: (string-ascii 200), attestor: principal})
(define-data-var paused bool false)
(define-data-var admin (optional principal) none)

(define-private (is-admin (p principal))
  (match (var-get admin)
    admin-p (is-eq p admin-p)
    false))

(define-public (init-admin (p principal))
  (if (is-none (var-get admin))
      (begin (var-set admin (some p)) (ok true))
      (err ERR_ADMIN_ALREADY_SET)))

(define-public (attest (hash (buff 32)) (url (string-ascii 200)))
  (if (var-get paused)
      (err ERR_PAUSED)
      (begin
        (map-set content {hash: hash} {url: url, attestor: tx-sender})
        (ok true)
      )))

(define-public (pause)
  (if (is-admin tx-sender)
      (begin (var-set paused true) (ok true))
      (err ERR_NOT_AUTHORIZED)))

(define-public (transfer-admin (new-admin principal))
  (if (is-admin tx-sender)
      (begin
        (var-set admin (some new-admin))
        (ok true))
      (err ERR_NOT_AUTHORIZED)))

(define-public (revoke (hash (buff 32)))
  (if (var-get paused)
      (err ERR_PAUSED)
      (let ((attestation (map-get? content {hash: hash})))
        (match attestation
          att
            (if (is-eq tx-sender (get attestor att))
                (begin
                  (map-delete content {hash: hash})
                  (ok true))
                (err ERR_NOT_ATTESTOR))
          (err ERR_CONTENT_NOT_FOUND)))))

(define-public (unpause)
  (if (is-admin tx-sender)
      (begin (var-set paused false) (ok true))
      (err ERR_NOT_AUTHORIZED)))
