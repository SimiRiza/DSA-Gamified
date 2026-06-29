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

module.exports = {
    getSheets
};