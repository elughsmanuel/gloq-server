import Joi from "joi";
import {
    USERNAME_REQUIRED,
    EMPTY_USERNAME,
    EMAIL_REQUIRED,
    EMPTY_EMAIL,
    VALID_EMAIL,
} from '../utils/constants';

export const createWalletSchema = Joi.object({
    username: Joi.string().trim().required().messages({
        "any.required": USERNAME_REQUIRED,
        "string.empty": EMPTY_USERNAME,
    }),
    email: Joi.string().trim().email().required().lowercase().messages({
        "any.required": EMAIL_REQUIRED,
        "string.empty": EMPTY_EMAIL,
        "string.email": VALID_EMAIL,
    }),
    balance: Joi.number(),
    currency: Joi.string().trim(),
});

export const updateWalletSchema = Joi.object({
    username: Joi.string().trim(),
    email: Joi.string().trim(),
    balance: Joi.number(),
    currency: Joi.string().trim(),
});
