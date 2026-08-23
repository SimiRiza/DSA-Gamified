const db = require("../config/db");

const getSheets = (req, res) => {

    const sql = "SELECT * FROM sheets";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result.rows);

    });

};
const countSheets = (req, res) => {

    const sql = "SELECT COUNT(*) FROM sheets";

    
    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        const countObj = {
        totalSheets : result.rows[0].count
        }
        res.json(countObj);

    });

};

module.exports = {
    getSheets,
    countSheets 
};