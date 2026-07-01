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
const countProblems = (req, res) => {

    const sql = `
        SELECT COUNT(*)
        FROM problems
    `;

    db.query(sql, (err, result) => {

        if (err) {

            return res.status(500).json({
                error: err.message
            });

        }
        const probCount = {
            "totalProblems" : result[0]['COUNT(*)']
        }
        res.json(probCount);

    });

};

module.exports = {
    getProblems,
    countProblems
};