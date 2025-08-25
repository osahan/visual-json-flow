import { ErrorObject } from "ajv";
export interface Validator {
    validate(value: unknown): {
        valid: boolean;
        errors: ErrorObject[];
    };
}
export declare function createValidator(schema: any): Validator;
