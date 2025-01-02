const express = require('express');
const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', signup);
router.post('/login', login);

router.get('/logout', (req, res) => {
    console.log('Logout request received');
    res.clearCookie('token', { path: '/' });
    res.redirect('/login');

});


module.exports = router;
