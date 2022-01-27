const express = require('express');

const router = express.Router();

router.get('/',(req, res) => {
    res.render('home');
});

router.get('/login',(req, res) => {
    res.render('login');
});

router.get('/services',(req, res) => {
    res.render('services');
});

router.get('/form',(req, res) => {
    res.render('form');
});

router.get('/register',(req, res) => {
    res.render('register');
});

router.get('/complaint_id',(req, res) => {
    res.render('complaint_id');
});

router.get('/update',(req, res) => {
    res.render('update');
});
router.get('/delete',(req, res) => {
    res.render('delete');
});

module.exports = router;