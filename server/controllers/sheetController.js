const db = require("../config/db");

const getSheets = (req, res) => {

    const sql = "SELECT * FROM sheets";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);

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
        totalSheets : (result)[0]['COUNT(*)']
        }
        res.json(countObj);

    });

};

module.exports = {
    getSheets,
    countSheets 
};