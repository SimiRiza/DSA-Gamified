const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for empty fields
        if ( !email || !password) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }


        // Check if email doesnt exists
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

                if (results.rows.length === 0) {
                    return res.status(401).json({
                        message: "Invalid email or password."
                    });
                }
                const isMatch = await bcrypt.compare(password,results.rows[0].password) 
                if(isMatch){
                    const token = jwt.sign(
                        { id: results.rows[0].id, email: results.rows[0].email },
                        process.env.JWT_SECRET,
                        { expiresIn: "1h" }
                    );
                    res.status(200).json({
                        message: "User logged in successfully!",
                        token
                    });
                }
                else{
                    res.status(401).json({
                            message: "Invalid email or password."
                      });
                }
       
            }
        );

        
    }
     catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error."
        });
    }

};

module.exports = {
    loginUser
};