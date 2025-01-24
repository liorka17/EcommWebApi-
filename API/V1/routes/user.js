const router=require('express').Router();//יצירת אובייקט ראוטר
const bcrypt=require('bcrypt');


const userModel=require('../models/user');

router.post('/login', (req, res) => {
    const { userName, pass } = req.body;
    userModel.findOne({ userName }).then((user) => {
        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }
        bcrypt.compare(pass, user.pass).then((ans) => {
            if (ans) {
                // יצירת טוקן
                const token = jwt.sign({ id: user._id, userName: user.userName }, JWT_SECRET, { expiresIn: '1h' });

                return res.status(200).json({ msg: 'Login successful', token });
            } else {
                return res.status(401).json({ msg: 'Invalid password' });
            }
        }).catch((err) => {
            return res.status(500).json({ msg: 'Error while comparing passwords', error: err.message });
        });
    }).catch((err) => {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    });
});

// נקודת קצה עבור הרשמה
router.post('/signup', (req, res) => {
    const saltRounds = 10; // מספר סבבים ליצירת ה-Salt
    const { userName, pass, fullName } = req.body;

    // בדוק אם שם המשתמש כבר קיים
    userModel.findOne({ userName }).then((existingUser) => {
        if (existingUser) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        bcrypt.hash(pass, saltRounds, (err, hash) => {
            if (err) {
                return res.status(500).json({ msg: err.message });
            } else {
                userModel.insertMany([{ userName, pass: hash, fullName }]).then((data) => {
                    return res.status(200).json(data);
                }).catch((err) => {
                    return res.status(500).json({ msg: 'Error saving user', error: err.message });
                });
            }
        });
    }).catch((err) => {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    });
});

module.exports = router;

