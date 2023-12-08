import Joi from "joi";
import {
    TYPE_REQUIRED,
    EMPTY_TYPE,
    AMOUNT_REQUIRED,
    EMPTY_AMOUNT,
    DESCRIPTION_REQUIRED,
    EMPTY_DESCRIPTION,
} from '../transaction/utils/constants';

export const recordTransactionSchema = Joi.object({
    type: Joi.string().trim().required().messages({
        "any.required": TYPE_REQUIRED,
        "string.empty": EMPTY_TYPE,
    }),
    amount: Joi.number().required().messages({
        "any.required": AMOUNT_REQUIRED,
        "number.empty": EMPTY_AMOUNT,
    }),
    description: Joi.string().required().messages({
        "any.required": DESCRIPTION_REQUIRED,
        "string.empty": EMPTY_DESCRIPTION,
    }),
});
