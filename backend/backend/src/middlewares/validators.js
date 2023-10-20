export const SaveUser = (req, res) => {
    req.checkBody('name')
        .notEmpty()
        .withMessage('Name required');

        req.checkBody('email')
        .notEmpty()
        .withMessage('email required');

        req.checkBody('email')
        .isEmail()
        .withMessage('Invalid email format');

        req.checkBody('password')
        .notEmpty()
        .withMessage('password required');

        req.checkBody('userType')
        .notEmpty()
        .withMessage('userType required');

};