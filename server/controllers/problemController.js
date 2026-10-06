const db = require("../config/db");

const getProblems = (req, res) => {

    const { patternId } = req.params;

    const sql = `
        SELECT
            id,
            pattern_id,
            subcategory_name,
            problem_name,
            difficulty,
            practice_url,
            youtube_url,
            article_url,
            leetcode_url,
            recommended_editorial_url
        FROM problems
        WHERE pattern_id = $1
        ORDER BY id;
    `;

    db.query(sql, [patternId], (err, result) => {

        if (err) {

            return res.status(500).json({
                error: err.message
            });

        }

        res.json(result.rows);

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
            "totalProblems": result.rows[0].count
        };

        res.json(probCount);

    });

};


module.exports = {
    getProblems,
    countProblems
};