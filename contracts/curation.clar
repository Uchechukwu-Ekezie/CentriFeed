;; This contract is used to manage the curation of content.

(define-constant ERR_PAUSED u1000)
(define-constant ERR_ADMIN_ALREADY_SET u1002)
(define-constant ERR_NOT_AUTHORIZED u1003)

(define-data-var next-topic-id uint u0)
(define-data-var next-submission-id uint u0)
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

(define-map topics {id: uint} {treasury: principal, fee_bps: uint})
(define-map stakes {curator: principal, topic: uint} {amount: uint, until: uint})
(define-map submissions {id: uint} {topic: uint, curator: principal, hash: (buff 32)})
(define-map votes {submission: uint, voter: principal} {dir: int, weight: uint})

(define-public (create-topic (treasury principal) (fee_bps uint))
  (if (var-get paused)
      (err ERR_PAUSED)
      (begin
        (var-set next-topic-id (+ (var-get next-topic-id) u1))
        (map-set topics {id: (var-get next-topic-id)} {treasury: treasury, fee_bps: fee_bps})
        (ok (var-get next-topic-id))
      )))

(define-public (stake (topic uint) (amount uint) (until uint))
  (if (var-get paused)
      (err ERR_PAUSED)
      (begin
        (map-set stakes {curator: tx-sender, topic: topic} {amount: amount, until: until})
        (ok true)
      )))

(define-public (submit (topic uint) (hash (buff 32)))
  (if (var-get paused)
      (err ERR_PAUSED)
      (begin
        (var-set next-submission-id (+ (var-get next-submission-id) u1))
        (map-set submissions {id: (var-get next-submission-id)} {topic: topic, curator: tx-sender, hash: hash})
        (ok (var-get next-submission-id))
      )))

(define-public (vote (submission uint) (dir int) (weight uint))
  (if (var-get paused)
      (err ERR_PAUSED)
      (begin
        (map-set votes {submission: submission, voter: tx-sender} {dir: dir, weight: weight})
        (ok true)
      )))

(define-public (pause)
  (if (is-admin tx-sender)
      (begin (var-set paused true) (ok true))
      (err ERR_NOT_AUTHORIZED)))

(define-public (unpause)
  (if (is-admin tx-sender)
      (begin (var-set paused false) (ok true))
      (err ERR_NOT_AUTHORIZED)))
