module.exports = {    
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/auth/login');
    },
    forwardAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated()) {
            // console.log('FORWARD IF LOOP');
            return next();
        }
        // console.log('FORWARD EI IF LOOP');
        res.redirect('/');
    }
};
