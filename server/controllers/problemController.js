const db = require("../config/db");

const getProblems = (req, res) => {

    const { patternId } = req.params;

    const sql = `
        SELECT *
        FROM problems
        WHERE pattern_id = ?
    `;

    db.query(sql, [patternId], (err, result) => {

        if (err) {

            return res.status(500).json({
                error: err.message
            });

        }

        res.json(result);

    });

};

module.exports = {
    getProblems
};