const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');


exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword  } = req.body;
       
        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match",
            });
        }

        const [existingUser] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = `
            INSERT INTO users (firstName, lastName, email, password)
            VALUES (?, ?, ?, ?)
        `;
        await connection.promise().query(insertQuery, [firstName, lastName, email, hashedPassword]);

        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
        });

    } catch (e) {
        console.error("Error in SignUp controller", e);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Try again later",
            data: e.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        const [rows] = await connection.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "User not found. Please sign up.",
            });
        }

        const user = rows[0];

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Password does not match",
            });
        }

        const payload = {
            email: user.email,
            id: user.id,
        };
        const token = jwt.sign(payload, "ASHISH" ,{
            expiresIn: "10d",
        });

        const options = {
            expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
            httpOnly: true,
            secure: true,
        };

        res.cookie("token", token, options).json({
            success: true,
            token,
            user: {id: user.userId, email: user.email },
            message: "User logged in successfully",
        });

    } catch (e) {
        console.error("Error in Login controller", e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
};

