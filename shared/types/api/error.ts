export class ApiError extends Error {
    constructor(
        public type:
            | "NETWORK"
            | "HTTP"
            | "JSON"
            | "REQUEST_VALIDATION"
            | "SERVER_VALIDATION"
            | "UNKNOWN",
        public err?: unknown,
        public statusCode?: number,
    ) {
        super(type)
    }
}
