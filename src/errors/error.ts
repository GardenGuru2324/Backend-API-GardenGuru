export class CustomError extends Error {
	statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;

		Object.setPrototypeOf(this, CustomError.prototype);
	}
}

export class NotFoundError extends CustomError {
	constructor(message?: string) {
		super(message || 'Not Fount', 404);
		Object.setPrototypeOf(this, NotFoundError.prototype);
	}
}

export class ConflictError extends CustomError {
	constructor(message?: string) {
		super(message || 'Conflict', 409);
		Object.setPrototypeOf(this, ConflictError.prototype);
	}
}

export class BadRequestError extends CustomError {
	constructor(message?: string) {
		super(message || 'Bad Request', 400);
		Object.setPrototypeOf(this, BadRequestError.prototype);
	}
}

export const errorTypes = [NotFoundError, ConflictError, BadRequestError];
