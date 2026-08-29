const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({
                message: "Google credential is required"
            });
        }

        // 1. Verify Google's ID token
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        // 2. Get trusted information from Google
        const payload = ticket.getPayload();

        const googleId = payload.sub;
        const email = payload.email;
        const name = payload.name;

        // 3. Check whether this user already exists
        let result = await pool.query(
            "SELECT id, name, email FROM users WHERE google_id = $1",
            [googleId]
        );

        let user;

        if (result.rows.length > 0) {
            // Existing Google user
            user = result.rows[0];
        } else {
            // Check whether email already belongs to an account
            result = await pool.query(
                "SELECT id, name, email, google_id FROM users WHERE email = $1",
                [email]
            );

            if (result.rows.length > 0) {
                // Existing normal account
                // For now, link Google to that account
                user = result.rows[0];

                await pool.query(
                    "UPDATE users SET google_id = $1 WHERE id = $2",
                    [googleId, user.id]
                );
            } else {
                // Completely new user
                result = await pool.query(
                    `INSERT INTO users (name, email, google_id)
                     VALUES ($1, $2, $3)
                     RETURNING id, name, email`,
                    [name, email, googleId]
                );

                user = result.rows[0];
            }
        }

        // 4. Create DSA-Quest's JWT
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

        // 5. Send OUR JWT to React
        res.status(200).json({
            message: "Google login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
    console.error("Google login error:", error);

    res.status(401).json({
        message: "Google authentication failed",
        error: error.message
    });
    }
};

module.exports = { googleLogin };