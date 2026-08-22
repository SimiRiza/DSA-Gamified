const fs = require("fs");
const path = require("path");

const sheetsPath = path.join(__dirname, "sheets.json");
const patternsPath = path.join(__dirname, "patterns.json");
const problemsPath = path.join(__dirname, "problems.json");
const outputPath = path.join(__dirname, "../../database/seed.sql");

const sheets = JSON.parse(fs.readFileSync(sheetsPath, "utf8"));
const patterns = JSON.parse(fs.readFileSync(patternsPath, "utf8"));
const problems = JSON.parse(fs.readFileSync(problemsPath, "utf8"));

function sqlValue(value) {
    if (value === null || value === undefined) {
        return "NULL";
    }
    if (typeof value === "number") {
        return String(value);
    }
    return `'${String(value).replace(/'/g, "''")}'`;
}

function normalizeDifficulty(value) {
    if (value === null || value === undefined) {
        return null;
    }

    const str = String(value).trim().toLowerCase();

    if (str === "easy") return "Easy";
    if (str === "medium") return "Medium";
    if (str === "hard") return "Hard";

    return value;
}


const sheetRows = sheets.map((sheet) => {
    return `(${sqlValue(sheet.sheet_id)}, ${sqlValue(sheet.title)})`;
});

const sheetsSQL = `-- ============================================
-- SHEETS
-- ============================================

INSERT INTO sheets (id, title)
VALUES
${sheetRows.join(",\n")};
`;

const patternsRows = patterns.map((pattern, index) => {
    return `(${sqlValue(pattern.pattern_id)}, ${sqlValue(pattern.sheet_id)}, ${sqlValue(pattern.source_id)}, ${sqlValue(pattern.pattern_name)}, ${sqlValue(index + 1)})`;
});

const patternsSQL = `-- ============================================
-- PATTERNS
-- ============================================

INSERT INTO patterns (id, sheet_id, source_id, pattern_name, order_number)
VALUES
${patternsRows.join(",\n")};
`;

const problemOrderMap = {};

const problemRows = problems.map((problem) => {
    if (!problemOrderMap[problem.pattern_id]) {
        problemOrderMap[problem.pattern_id] = 1;
    }

    const currentOrder = problemOrderMap[problem.pattern_id];
    problemOrderMap[problem.pattern_id]++;

    return `(${sqlValue(problem.problem_id)}, ${sqlValue(problem.pattern_id)}, ${sqlValue(problem.subcategory_name)}, ${sqlValue(problem.problem_name)}, ${sqlValue(normalizeDifficulty(problem.difficulty))}, ${sqlValue(problem.official_article)}, ${sqlValue(problem.recommended_article)}, ${sqlValue(problem.official_youtube)}, ${sqlValue(problem.recommended_youtube)}, ${sqlValue(problem.official_leetcode)}, ${sqlValue(problem.recommended_leetcode)}, ${sqlValue(problem.plus)}, ${sqlValue(problem.official_editorial)}, ${sqlValue(problem.recommended_editorial)}, ${sqlValue(currentOrder)})`;
});

const problemsSQL = `-- ============================================
-- PROBLEMS
-- ============================================

INSERT INTO problems (
    id,
    pattern_id,
    subcategory_name,
    problem_name,
    difficulty,
    official_article,
    recommended_article,
    official_youtube,
    recommended_youtube,
    official_leetcode,
    recommended_leetcode,
    plus,
    official_editorial,
    recommended_editorial,
    order_number
)
VALUES
${problemRows.join(",\n")};

`;

const finalSQL = `-- ============================================
-- DSA Quest - PostgreSQL Seed
-- Auto-generated from scraper/parser JSON files
-- ============================================

${sheetsSQL}${patternsSQL}${problemsSQL}`;

fs.writeFileSync(outputPath, finalSQL);

console.log(`Seed SQL generated successfully at: ${outputPath}`);

console.log("Seed SQL generated successfully!");
console.log("Output:", outputPath);
console.log("Inserted sheets:", sheets.length);
console.log("Inserted patterns:", patterns.length);
console.log("Inserted problems:", problems.length);


