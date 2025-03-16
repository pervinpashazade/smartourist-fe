export enum EBookingStatus {
    CREATED = 'created',
    PENDING_PAYMENT = 'pending_payment',
    PAYMENT_EXPIRED = 'payment_expired',
    NOT_FULLY_PAID = 'not_fully_paid',
    FULLY_PAID = 'fully_paid',
    PAYMENT_FAILED = 'payment_failed',
    NOT_ARRIVED = 'not_arrived',
    ONBOARD = 'onboard',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}