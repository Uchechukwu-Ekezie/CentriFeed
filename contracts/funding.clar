;; This contract is used to manage funding rounds for content.

(define-constant ERR_PAUSED u1000)
(define-constant ERR_ADMIN_ALREADY_SET u1002)
(define-constant ERR_NOT_AUTHORIZED u1003)
(define-constant ERR_ROUND_NOT_FOUND u1004)

(define-data-var next-round-id uint u0)
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
(define-map rounds {id: uint} {topic: uint, pool: uint})
(define-map pledges {round: uint, submission: uint, pledger: principal} {amount: uint})

(define-public (create-round (topic uint) (pool uint))
  (if (var-get paused)
      (err ERR_PAUSED)
      (begin
        (var-set next-round-id (+ (var-get next-round-id) u1))
        (map-set rounds {id: (var-get next-round-id)} {topic: topic, pool: pool})
        (ok (var-get next-round-id))
      )))

(define-public (pledge (round uint) (submission uint) (amount uint))
  (if (var-get paused)
      (err ERR_PAUSED)
      (begin
        (map-set pledges {round: round, submission: submission, pledger: tx-sender} {amount: amount})
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

(define-public (cancel-round (round-id uint))
  (if (is-admin tx-sender)
      (let ((round (map-get? rounds {id: round-id})))
        (match round
          r (begin
              (map-delete rounds {id: round-id})
              (ok true))
          (err ERR_ROUND_NOT_FOUND))))
      (err ERR_NOT_AUTHORIZED)))

(define-public (unpause)
  (if (is-admin tx-sender)
      (begin (var-set paused false) (ok true))
      (err ERR_NOT_AUTHORIZED)))
