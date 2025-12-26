;; This contract is used to manage user reputation.

(define-constant ERR_PAUSED u1000)
(define-constant ERR_ADMIN_ALREADY_SET u1002)
(define-constant ERR_NOT_AUTHORIZED u1003)

(define-map reputation {user: principal} {score: uint})
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

(define-public (set-score (score uint))
  (if (var-get paused)
      (err ERR_PAUSED)
      (begin
        (map-set reputation {user: tx-sender} {score: score})
        (ok true)
      )))

(define-read-only (get-score (user principal))
  (default-to u0 (get score (map-get? reputation {user: user})))
)

(define-public (pause)
  (if (is-admin tx-sender)
      (begin (var-set paused true) (ok true))
      (err ERR_NOT_AUTHORIZED)))

(define-public (unpause)
  (if (is-admin tx-sender)
      (begin (var-set paused false) (ok true))
      (err ERR_NOT_AUTHORIZED)))
