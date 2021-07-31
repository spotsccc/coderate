export class BaseError extends Error {}

export class ReadFileError extends BaseError {
	static of(e: unknown) {
		if (e instanceof Error) {
			return new ReadFileError(e.message)
		}
		return new ReadFileError('unknown error')
	}
}

export class AppError extends BaseError {
	static of(e: unknown) {
		if (e instanceof Error) {
			return new AppError(e.message)
		}
		return new AppError('unknown error')
	}
}

export class ValidationError extends BaseError {
	static of(e: unknown) {
		if (e instanceof Error) {
			return new ValidationError(e.message + e.stack)
		}
		return new ValidationError('unknown error')
	}
}
