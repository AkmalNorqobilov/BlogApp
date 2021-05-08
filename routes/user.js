const router = require('express').Router();
const User = require('../models/users.model');
const config = require('../config');
const jwt = require('jsonwebtoken');
const { checkToken } = require('../middleware');

router.get('/:username', checkToken, (req, res) => {
    User.findOne({ username: req.params.username }, (err, result) => {
        if (error) {
            return res.status(500).json({ msg: error });
        }

        return res.json({
            data: result,
            username: req.params.username
        })
    })
});

router.route('/login', (req, res) => {
        User.findOne({ username: req.body.username }, (err, result) => {
            if (err)
                return res.status(500).json("Username or password is incorrect!!!");

            if (result?.password === req.body.password) {
                const token = jwt.sign({ username: result?.username }, config.key, { expiresIn: '24h' });
                return res.status(200).json({
                    token: token,
                    msg: "success"
                });
            }
        })
})

router.post('/register', (req, res) => {
    console.log('inside the register');

    console.log(req.body);
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });

    user.save()
        .then(() => {
            console.log("user registered");
            res.status(200).json('OK');
        })
        .catch((error) => {
            res.status(403).json({ message: error });
        });
});

router.route('/update/:username').patch(checkToken, (req, res) => {
    User.findOneAndUpdate({ username: req.params.username },
        { $set: { password: req.body.password } },
        (err, data) => {
            if (err) {
                return res.status(500).json({ message: err });
            }
            const msg = {
                msg: "password successfully updated",
                username: req.params.username
            }
            return res.status(201).json(msg);
        })
});

router.route('/delete/:username').delete(checkToken, (req, res) => {
    console.log("ishlayapti hozir delete part", req.params.username);
    User.findOneAndDelete({ username: req.params.username }, (error, data) => {
        if (error)
            return res.status(500).json({ msg: error });

        const msg = {
            msg: `${req.params.username} deleted successfully!!!`,
            username: req.params.username
        };

        return res.status(200).json(msg);
    });
})

module.exports = router;