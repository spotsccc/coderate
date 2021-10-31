export class BaseError extends Error {
    static template = (s) => s;
    static of = (e) => {
        if (e instanceof Error) {
            return new BaseError(BaseError.template(e.message));
        }
        if (typeof e === 'string') {
            // @ts-ignore
            return new BaseError(BaseError.template(e));
        }
        return new BaseError('unknown error');
    };
}
export class AccessError extends BaseError {
    static template = (s) => `Access denied: ${s}`;
    static of = (e) => {
        if (e instanceof Error) {
            return new AccessError(AccessError.template(e.message));
        }
        if (typeof e === 'string') {
            // @ts-ignore
            return new AccessError(AccessError.template(e));
        }
        return new AccessError('unknown error');
    };
}
export class ValidationError extends BaseError {
    static template = (s) => `Invalid input: ${s}`;
    static of = (e) => {
        if (e instanceof Error) {
            return new ValidationError(ValidationError.template(e.message));
        }
        if (typeof e === 'string') {
            return new ValidationError(ValidationError.template(e));
        }
        return new ValidationError('unknown error');
    };
}
export class DBNotFoundError extends BaseError {
    static template = (s) => `Not found in database: ${s}`;
    static of = (e) => {
        if (e instanceof Error) {
            return new DBNotFoundError(DBNotFoundError.template(e.message));
        }
        if (typeof e === 'string') {
            return new DBNotFoundError(DBNotFoundError.template(e));
        }
        return new DBNotFoundError('unknown error');
    };
}
export class DataBaseError extends BaseError {
    static template = (s) => `Database error: ${s}`;
    static of = (e) => {
        if (e instanceof Error) {
            return new DataBaseError(DataBaseError.template(e.message));
        }
        if (typeof e === 'string') {
            return new DataBaseError(DataBaseError.template(e));
        }
        return new DataBaseError('unknown error');
    };
}
export class ConnectionError extends BaseError {
    static template = (s) => `Connection established: ${s}`;
    static of = (e) => {
        if (e instanceof Error) {
            return new ConnectionError(ConnectionError.template(e.message));
        }
        if (typeof e === 'string') {
            // @ts-ignore
            return new ConnectionError(ConnectionError.template(e));
        }
        return new ConnectionError('unknown error');
    };
}
//# sourceMappingURL=index.js.map