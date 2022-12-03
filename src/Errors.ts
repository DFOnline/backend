export default class CustomError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class NetworkError   extends CustomError  {}
export class RateLimitError extends NetworkError {}