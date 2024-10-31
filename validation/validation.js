import Joi from "joi";

const signupValidation = Joi.object({
    name: Joi.string()
        .pattern(/^[A-Za-z]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Name must only contain alphabet letters',
            'any.required': 'Missing required name field',
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            "any.required": "Missing required email field",
            "string.email": "Invalid email format",
        }),
    password: Joi.string().min(6).required().messages({
        "any.required": "Missing required password field",
        "string.min": "Password must be at least {#limit} characters long",
        "string.max": "Password cannot be longer than {#limit} characters",
    }),
});

const loginValidation = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            "any.required": "Missing required email field",
            "string.email": "Invalid email format",
        }),
    password: Joi.string().min(6).required().messages({
        "any.required": "Missing required password field",
        "string.min": "Password must be at least {#limit} characters long",
        "string.max": "Password cannot be longer than {#limit} characters",
    }),
});

const updateValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
});

const intakeValidation = Joi.object({
    user: Joi.string()
    .required()
    .messages({
        "any.required": "Missing required user field",
        "user.string": "Invalid user format",
    }),
    date: Joi.date()
    .required()
    .messages({
        "any.required": "Missing required date field",
        "date.date": "Invalid date format",
    }),
    height: Joi.string()
    .max(3)
    .pattern(/^\d+$/)
    .required()
    .messages({
        'string.pattern.base': 'Height must only contain numerical',
        "string.max": "height cannot be longer than {#limit} characters",
        'any.required': 'Missing required height field',
    }),
    age: Joi.string()
    .max(3)
    .pattern(/^\d+$/)
    .required()
    .messages({
        'string.pattern.base': 'Age must only contain numerical',
        "string.max": "Age cannot be longer than {#limit} characters",
        'any.required': 'Missing required age field',
    }),
    weight: Joi.string()
    .max(3)
    .pattern(/^\d+$/)
    .required()
    .messages({
        'string.pattern.base': 'Weight must only contain numerical',
        "string.max": "Weight cannot be longer than {#limit} characters",
        'any.required': 'Missing required weight field',
    }),
    weightDesired: Joi.string()
    .max(3)
    .pattern(/^\d+$/)
    .required()
    .messages({
        'string.pattern.base': 'Desired weight must only contain numerical',
        "string.max": "Desired weight cannot be longer than {#limit} characters",
        'any.required': 'Missing required desired weight field',
    }),
    blood: Joi.string()
    .required()
    .messages({
        "any.required": "Missing required blood group field",
        "blood.string": "Invalid blood format",
    }),
    dailyRate: Joi.string()
    .required()
    .messages({
        "any.required": "Missing required intake field",
        "dailyRate.string": "Invalid intake format",
    }),
});


export { signupValidation, loginValidation, updateValidation, intakeValidation };