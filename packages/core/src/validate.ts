import Ajv, { ErrorObject } from "ajv";
import addFormats from "ajv-formats";
export interface Validator { validate(value: unknown): { valid: boolean; errors: ErrorObject[] } }
export function createValidator(schema: any): Validator {
  const ajv = new Ajv({ allErrors: true, strict: false, $data: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  return { validate(value) { const ok = validate(value); return { valid: !!ok, errors: (validate.errors ?? []) as ErrorObject[] }; } };
}
