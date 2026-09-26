const fs = require("fs");
const path = require("path");

// --------------------------------------------------
// FILE PATHS
// --------------------------------------------------

const sheetsPath = path.join(
    __dirname,
    "sheets.json"
);

const patternsPath = path.join(
    __dirname,
    "patterns.json"
);

const problemsPath = path.join(
    __dirname,
    "problems.json"
);

const outputPath = path.join(
    __dirname,
    "../../database/seed.sql"
);

// --------------------------------------------------
// READ JSON FILES
// --------------------------------------------------

const sheets = JSON.parse(
    fs.readFileSync(sheetsPath, "utf8")
);

const patterns = JSON.parse(
    fs.readFileSync(patternsPath, "utf8")
);

const problems = JSON.parse(
    fs.readFileSync(problemsPath, "utf8")
);

// --------------------------------------------------
// SQL VALUE HELPER
// --------------------------------------------------

function sqlValue(value) {
    if (
        value === null ||
        value === undefined
    ) {
        return "NULL";
    }

    if (typeof value === "number") {
        return String(value);
    }

    return `'${String(value).replace(/'/g, "''")}'`;
}

// --------------------------------------------------
// NORMALIZE DIFFICULTY
// --------------------------------------------------

function normalizeDifficulty(value) {
    if (
        value === null ||
        value === undefined
    ) {
        return null;
    }

    const str =
        String(value)
            .trim()
            .toLowerCase();

    if (str === "easy") {
        return "Easy";
    }

    if (str === "medium") {
        return "Medium";
    }

    if (str === "hard") {
        return "Hard";
    }

    return value;
}

// --------------------------------------------------
// SHEETS
// --------------------------------------------------

const sheetRows = sheets.map((sheet) => {
    return `(
        ${sqlValue(sheet.sheet_id)},
        ${sqlValue(sheet.title)}
    )`;
});

const sheetsSQL = `
-- ============================================
-- SHEETS
-- ============================================

INSERT INTO sheets (
    id,
    title
)
VALUES
${sheetRows.join(",\n")};

`;

// --------------------------------------------------
// PATTERNS
// --------------------------------------------------

const patternsRows = patterns.map(
    (pattern, index) => {
        return `(
            ${sqlValue(pattern.pattern_id)},
            ${sqlValue(pattern.sheet_id)},
            ${sqlValue(pattern.source_id)},
            ${sqlValue(pattern.pattern_name)},
            ${sqlValue(index + 1)}
        )`;
    }
);

const patternsSQL = `
-- ============================================
-- PATTERNS
-- ============================================

INSERT INTO patterns (
    id,
    sheet_id,
    source_id,
    pattern_name,
    order_number
)
VALUES
${patternsRows.join(",\n")};

`;

// --------------------------------------------------
// PROBLEM ORDER
// --------------------------------------------------

const problemOrderMap = {};

// --------------------------------------------------
// PROBLEMS
// --------------------------------------------------

const problemRows = problems.map(
    (problem) => {

        if (
            !problemOrderMap[problem.pattern_id]
        ) {
            problemOrderMap[
                problem.pattern_id
            ] = 1;
        }

        const currentOrder =
            problemOrderMap[
                problem.pattern_id
            ];

        problemOrderMap[
            problem.pattern_id
        ]++;

        return `(
            ${sqlValue(problem.problem_id)},
            ${sqlValue(problem.pattern_id)},
            ${sqlValue(problem.subcategory_name)},
            ${sqlValue(problem.problem_name)},
            ${sqlValue(
                normalizeDifficulty(
                    problem.difficulty
                )
            )},
            ${sqlValue(problem.practice_url)},
            ${sqlValue(problem.youtube_url)},
            ${sqlValue(problem.article_url)},
            ${sqlValue(problem.leetcode_url)},
            ${sqlValue(currentOrder)}
        )`;
    }
);

const problemsSQL = `
-- ============================================
-- PROBLEMS
-- ============================================

INSERT INTO problems (
    id,
    pattern_id,
    subcategory_name,
    problem_name,
    difficulty,
    practice_url,
    youtube_url,
    article_url,
    leetcode_url,
    order_number
)
VALUES
${problemRows.join(",\n")};

`;

// --------------------------------------------------
// FINAL SQL
// --------------------------------------------------

const finalSQL = `-- ============================================
-- DSA Quest - PostgreSQL Seed
-- Auto-generated from scraper/parser JSON files
-- ============================================

${sheetsSQL}${patternsSQL}${problemsSQL}`;

// --------------------------------------------------
// WRITE FILE
// --------------------------------------------------

fs.writeFileSync(
    outputPath,
    finalSQL
);

// --------------------------------------------------
// SUMMARY
// --------------------------------------------------

console.log(
    `Seed SQL generated successfully at: ${outputPath}`
);

console.log(
    "Inserted sheets:",
    sheets.length
);

console.log(
    "Inserted patterns:",
    patterns.length
);

console.log(
    "Inserted problems:",
    problems.length
);