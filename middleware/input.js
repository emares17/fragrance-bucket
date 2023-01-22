module.exports = {
    validateInput: (req, res, next) => {
        const { name, email, password, password2 } = req.body;
        let errors = [];
    
        // Check that all fields are filled in
        if (!name || !email || !password || !password2) {
            errors.push({ msg: 'Please fill in all fields' });
        }
    
        // Check passwords match
        if (password !== password2) {
            errors.push({ msg: 'Passwords do not match' });
        }
    
        // Check password length
        if (password.length < 6) {
            errors.push({ msg: 'Password should be at least 6 characters' });
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