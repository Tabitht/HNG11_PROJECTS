const joi = require('joi');

function validateCreateOrg(request, response, next) {

    const schema = joi.object({
        name: joi.string().trim().required().min(3).max(30),
        description: joi.string().trim().optional().min(3)
        
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
module.exports = validateCreateOrg;