import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super('Invalid request data passed through');

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map((error) => {
            if (error.type === "field") {
                return { message: error.msg, field: error.path } as {
                    message: string;
                    field: string;
                };
            }
            return { message: error.msg } as { message: string; field?: string };
            /* return this.errors.map(error => {
                if(error.type === 'field'){
                    return {message: error.msg, field: error.path}
                }
            }); */
        });
    }
}