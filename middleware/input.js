const Joi = require('joi');

module.exports = {
    validateInput: (req, res, next) => {
        const { name, email, password, password2 } = req.body;
        let errors = [];

        const schema = Joi.object({
            name: Joi.string().when('email', {
                is: Joi.string().empty(),
                then: Joi.string().required().messages({
                    'string.empty': 'Please fill in all fields',
                    'any.required': 'Please fill in all fields'
                }),
                otherwise: Joi.string()
            }),
            email: Joi.string().when('password', {
                is: Joi.string().empty(),
                then: Joi.string().required().messages({
                    'string.empty': 'Please fill in all fields',
                    'any.required': 'Please fill in all fields'
                }),
                otherwise: Joi.string().email()
            }),
            password: Joi.string().min(6).required().messages({
                'string.min': 'Password should be at least 6 characters long',
                'any.required': 'Please fill in all fields'
            }),
            password2: Joi.string().valid(Joi.ref('password')).messages({
                'any.only': 'Passwords do not match'
            })
        
        });

        const { error } = schema.validate({ name, email, password, password2 }, {abortEarly: false});

        if(error) {
            error.details.forEach(err => {
                errors.push({ msg: err.message });
            });
        }

        if (errors.length > 0) {
            res.render('register', {
                errors,
                name,
                email,
                password,
                password2
            });
        } else {
            next();
        }
    }
};



