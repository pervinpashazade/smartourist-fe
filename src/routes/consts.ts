export const ROUTES = {
    AUTH: {
        LOGIN: "/login",
        FORGOT_PASSWORD: "/forgot-password",
    },
    ERROR: {
        NOT_FOUND: "/404",
        UNAUTHORIZED: "/unauthorized",
    },
    CALENDAR: {
        index: "/calendar",
    },
    DASHBOARD: {
        index: "/dashboard",
        DETAILS: "/dashboard/:id",
    },
    BOOKING: {
        index: "/booking",
        CALENDAR: "/booking/calendar",
        LIST: "/booking/list",
        DETAILS: "/booking/:id",
        FILTER: "/booking/filter",
        CREATE: "/booking/create",
    },
};
