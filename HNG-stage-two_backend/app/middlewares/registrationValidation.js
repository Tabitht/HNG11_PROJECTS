const joi = require('joi');

function validateRegistration(request, response, next) {

    const schema = joi.object({
        firstName: joi.string().trim().required().min(3).max(30),
        lastName: joi.string().trim().required().min(3).max(30),
        email: joi.string().trim().required().email(),
        password: joi.string().trim().required().min(6).max(30),
        phone: joi.string().trim().optional().min(8).max(30)
    });

    const { error } = schema.validate(request.body, { abortEarly: false});

    if (error) {
        const errorDetails = error.details.map(function(detail) {
            const message = detail.message.split('"')[2].trim();

            const key = detail.context.key;

            return { [key]: `The ${key} field ${message}` };
        });

        return response.status(422).json({
            'errors': {
                'field': 'validation error',
                'message': errorDetails
            }
            }
        );
    }
    next();
}
module.exports = validateRegistration;