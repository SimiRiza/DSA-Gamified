const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for empty fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format."
            });
        }

        // Password length
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters."
            });
        }

        // Check if email already exists
        db.query(
            "SELECT * FROM users WHERE email = $1",
            [email],
            async (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        message: "Database error."
                    });
                }

                if (results.rows.length > 0) {
                    if(results.rows[0].google_id){
                        return res.status(409).json({
                            message: "This email is already registered with Google. Please continue with Google to log in."
                        });
                    }
                    else {
                        return res.status(409).json({
                            message: "This email is already registered. Please log in instead."
                        });
                    }
                }

                const hashedPassword = await bcrypt.hash(password, 10);

               db.query(
                `INSERT INTO users (name, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, name, email`,
                [name, email, hashedPassword],
                    (err, result) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json({
                                message: "Database error."
                            });
                        }

                        const user = result.rows[0];
                        const token = jwt.sign(
                            {
                                id: user.id,
                                email: user.email
                            },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "7d"
                            }
                        );

                        res.status(201).json({
                            message: "User registered successfully!",
                            token
                        });
                    }
                );
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error."
        });
    }
};

module.exports = {
    registerUser
};