const db = require("../config/db");

const getPatterns = (req, res) => {

    const { sheetId } = req.params;

    const sql = `
        SELECT *
        FROM patterns
        WHERE sheet_id = ?
        ORDER BY order_number;
    `;

    db.query(sql, [sheetId], (err, result) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);

    });

};

module.exports = {
    getPatterns
};