import Ajv from "ajv";
import addFormats from "ajv-formats";
export function createValidator(schema) {
    const ajv = new Ajv({ allErrors: true, strict: false, $data: true });
    addFormats(ajv);
    const validate = ajv.compile(schema);
    return { validate(value) { const ok = validate(value); return { valid: !!ok, errors: (validate.errors ?? []) }; } };
}
