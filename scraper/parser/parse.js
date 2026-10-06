const fs = require("fs");

// --------------------------------------------------
// CONFIG
// --------------------------------------------------

const RAW_FILE = "../input/raw.html";
const BASE_URL = "https://takeuforward.org";

// --------------------------------------------------
// READ RAW HTML
// --------------------------------------------------

const raw = fs.readFileSync(RAW_FILE, "utf8");

// --------------------------------------------------
// EXTRACT NEXT.JS PAYLOADS
// --------------------------------------------------

function extractPayload(raw, start) {
    let payload = "";
    let escaped = false;
    let i = start;

    while (i < raw.length) {
        const ch = raw[i];

        if (escaped) {
            payload += ch;
            escaped = false;
            i++;
            continue;
        }

        if (ch === "\\") {
            payload += ch;
            escaped = true;
            i++;
            continue;
        }

        if (ch === '"') {
            break;
        }

        payload += ch;
        i++;
    }

    return {
        payload,
        end: i
    };
}

const marker = 'self.__next_f.push([1, "';

const payloads = [];
let position = 0;

while (true) {
    const markerIndex = raw.indexOf(marker, position);

    if (markerIndex === -1) {
        break;
    }

    position = markerIndex + marker.length;

    const result = extractPayload(raw, position);

    payloads.push(result.payload);

    position = result.end + 1;
}

if (payloads.length === 0) {
    console.error("No Next.js payloads found.");
    process.exit(1);
}

const stream = JSON.parse(
    '"' + payloads.join("") + '"'
);

console.log(
    `Found ${payloads.length} Next.js payload(s).`
);

// --------------------------------------------------
// EXTRACT JSON OBJECT
// --------------------------------------------------

function extractJSONObject(text, start) {
    let depth = 0;
    let insideString = false;
    let escaped = false;

    for (let i = start; i < text.length; i++) {
        const ch = text[i];

        if (escaped) {
            escaped = false;
            continue;
        }

        if (insideString && ch === "\\") {
            escaped = true;
            continue;
        }

        if (ch === '"') {
            insideString = !insideString;
            continue;
        }

        if (insideString) {
            continue;
        }

        if (ch === "{") {
            depth++;
        }

        else if (ch === "}") {
            depth--;

            if (depth === 0) {
                return text.substring(start, i + 1);
            }
        }
    }

    return null;
}

// --------------------------------------------------
// FIND sheet_syllabus
// --------------------------------------------------

const syllabusIndex =
    stream.indexOf('"sheet_syllabus"');

if (syllabusIndex === -1) {
    console.error("sheet_syllabus not found.");
    process.exit(1);
}

const syllabusStart =
    stream.indexOf("{", syllabusIndex);

if (syllabusStart === -1) {
    console.error(
        "Could not find sheet_syllabus object."
    );
    process.exit(1);
}

const syllabusText =
    extractJSONObject(stream, syllabusStart);

if (!syllabusText) {
    console.error(
        "Could not extract sheet_syllabus object."
    );
    process.exit(1);
}

const syllabus = JSON.parse(syllabusText);

if (
    !Array.isArray(syllabus.rows) ||
    !Array.isArray(syllabus.roots)
) {
    console.error(
        "Invalid sheet_syllabus structure."
    );
    process.exit(1);
}

const rows = syllabus.rows;
const roots = syllabus.roots;

console.log(`Rows: ${rows.length}`);
console.log(`Roots: ${roots.length}`);

// --------------------------------------------------
// URL NORMALIZATION
// --------------------------------------------------

function normalizeUrl(url) {
    if (!url || url === "$undefined") {
        return null;
    }

    if (typeof url !== "string") {
        return null;
    }

    if (url.startsWith("/")) {
        return BASE_URL + url;
    }

    return url;
}

// --------------------------------------------------
// DIFFICULTY NORMALIZATION
// --------------------------------------------------

function normalizeDifficulty(layoutType, row) {
    if (layoutType === "basic") {
        return "Easy";
    }

    if (layoutType === "core") {
        return "Medium";
    }

    if (layoutType === "pro") {
        return "Hard";
    }

    // Learning / theory items may not have
    // basic/core/pro difficulty.
    if (layoutType === "learning") {
        return "Easy";
    }

    // Fallback: look for explicit difficulty.
    for (const value of row) {
        if (value === "Easy") {
            return "Easy";
        }

        if (value === "Medium") {
            return "Medium";
        }

        if (value === "Hard") {
            return "Hard";
        }
    }

    return "Easy";
}

// --------------------------------------------------
// RESOURCE DETECTION
// --------------------------------------------------

// Find YouTube URL anywhere inside the row.
function findYoutubeUrl(row) {
    for (const value of row) {
        if (typeof value !== "string") {
            continue;
        }

        if (
            value.includes("youtube.com/") ||
            value.includes("youtu.be/")
        ) {
            return normalizeUrl(value);
        }
    }

    return null;
}

// Find actual TUF article URL.
// Do NOT treat values like "unsolved", "solved",
// "true", "false", etc. as article URLs.
function findArticleUrl(row) {
    for (const value of row) {
        if (typeof value !== "string") {
            continue;
        }

        if (
            value.startsWith(
                "https://takeuforward.org/"
            )
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/blogs/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/data-structure/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/recursion/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/binary-search/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/graph/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/dynamic-programming/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/strings/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/greedy/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/bit-manipulation/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/arrays/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/linked-list/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/stack/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/queue/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/trees/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/binary-tree/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/binary-search-tree/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/heaps/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/trie/")
        ) {
            return normalizeUrl(value);
        }

        if (
            value.startsWith("/maths/")
        ) {
            return normalizeUrl(value);
        }
    }

    return null;
}

// Find actual LeetCode problem URL.
function findLeetcodeUrl(row) {
    for (const value of row) {
        if (typeof value !== "string") {
            continue;
        }

        if (
            value.includes(
                "leetcode.com/problems/"
            )
        ) {
            return normalizeUrl(value);
        }
    }

    return null;
}

// --------------------------------------------------
// OUTPUT ARRAYS
// --------------------------------------------------

const sheets = [];
const patterns = [];
const problems = [];

// --------------------------------------------------
// SHEET
// --------------------------------------------------

sheets.push({
    sheet_id: 1,
    title:
        "Striver's A2Z Sheet - Learn DSA from A to Z"
});

// --------------------------------------------------
// COUNTERS
// --------------------------------------------------

let patternId = 1;
let problemId = 1;

let categoryCount = 0;
let itemCount = 0;
let contestCount = 0;

let practiceUrlCount = 0;
let youtubeCount = 0;
let articleCount = 0;
let leetcodeCount = 0;

// --------------------------------------------------
// ADD PROBLEM
// --------------------------------------------------

function addProblem(
    row,
    pattern,
    subcategoryName
) {
    const layoutType = row[4];
    const itemSlug = row[2];
    const problemName = row[5];

    // ------------------------------------------------
    // TUF PRACTICE URL
    // ------------------------------------------------

    let practiceUrl = null;

    if (
        layoutType === "practice" &&
        itemSlug
    ) {
        practiceUrl =
            `${BASE_URL}/practice/dsa/${itemSlug}`;

        practiceUrlCount++;
    }

    // ------------------------------------------------
    // RESOURCE URLS
    // ------------------------------------------------

    const youtubeUrl =
        findYoutubeUrl(row);

    const articleUrl =
        findArticleUrl(row);

    const leetcodeUrl =
        findLeetcodeUrl(row);

    if (youtubeUrl) {
        youtubeCount++;
    }

    if (articleUrl) {
        articleCount++;
    }

    if (leetcodeUrl) {
        leetcodeCount++;
    }

    // ------------------------------------------------
    // DIFFICULTY
    // ------------------------------------------------

    const difficulty =
        normalizeDifficulty(
            layoutType,
            row
        );

    // ------------------------------------------------
    // CREATE PROBLEM
    // ------------------------------------------------

    problems.push({
        problem_id: problemId++,

        pattern_id: pattern.patternId,

        subcategory_name:
            subcategoryName,

        problem_name:
            problemName,

        difficulty:
            difficulty,

        practice_url:
            practiceUrl,

        youtube_url:
            youtubeUrl,

        article_url:
            articleUrl,

        leetcode_url:
            leetcodeUrl
    });

    itemCount++;
}

// --------------------------------------------------
// WALK CATEGORY TREE
// --------------------------------------------------

function walkCategory(
    rowIndex,
    pattern,
    currentSubcategory = null
) {
    const row = rows[rowIndex];

    if (!row) {
        return;
    }

    const rowType = row[3];

    // ------------------------------------------------
    // CATEGORY
    // ------------------------------------------------

    if (rowType === "category") {
        categoryCount++;

        const categoryName = row[4];
        const children = row[5];

        if (!Array.isArray(children)) {
            return;
        }

        for (const childIndex of children) {
            walkCategory(
                childIndex,
                pattern,
                categoryName
            );
        }

        return;
    }

    // ------------------------------------------------
    // ITEM
    // ------------------------------------------------

    if (rowType === "item") {
        addProblem(
            row,
            pattern,
            currentSubcategory
        );

        return;
    }

    // ------------------------------------------------
    // CONTEST
    // ------------------------------------------------

    if (rowType === "contest") {
        contestCount++;
        return;
    }
}

// --------------------------------------------------
// PROCESS ROOT PATTERNS
// --------------------------------------------------

for (const rootIndex of roots) {
    const rootRow = rows[rootIndex];

    if (!rootRow) {
        continue;
    }

    if (rootRow[3] !== "category") {
        continue;
    }

    const currentPatternId =
        patternId++;

    const pattern = {
        patternId:
            currentPatternId,

        sourceId:
            Number(rootRow[1]),

        name:
            rootRow[4]
    };

    patterns.push({
        pattern_id:
            currentPatternId,

        source_id:
            pattern.sourceId,

        sheet_id:
            1,

        pattern_name:
            pattern.name
    });

    walkCategory(
        rootIndex,
        pattern,
        null
    );
}

// --------------------------------------------------
// VALIDATION
// --------------------------------------------------

const problemIds = new Set();

let duplicateProblemIds = 0;

for (const problem of problems) {
    if (
        problemIds.has(
            problem.problem_id
        )
    ) {
        duplicateProblemIds++;
    }

    problemIds.add(
        problem.problem_id
    );
}

// --------------------------------------------------
// VERIFY PATTERN 19
// --------------------------------------------------

const pattern19 =
    problems.find(
        problem =>
            problem.problem_name ===
            "Pattern 19"
    );

if (pattern19) {
    console.log("\nPattern 19:");
    console.log(pattern19);
}

// --------------------------------------------------
// WRITE JSON FILES
// --------------------------------------------------

fs.writeFileSync(
    "sheets.json",
    JSON.stringify(
        sheets,
        null,
        2
    )
);

fs.writeFileSync(
    "patterns.json",
    JSON.stringify(
        patterns,
        null,
        2
    )
);

fs.writeFileSync(
    "problems.json",
    JSON.stringify(
        problems,
        null,
        2
    )
);

// --------------------------------------------------
// SUMMARY
// --------------------------------------------------

console.log(
    "\n========================================"
);

console.log(
    "JSON files generated successfully!"
);

console.log(
    "========================================"
);

console.log(
    `Sheets: ${sheets.length}`
);

console.log(
    `Patterns: ${patterns.length}`
);

console.log(
    `Problems: ${problems.length}`
);

console.log(
    `Categories visited: ${categoryCount}`
);

console.log(
    `Items parsed: ${itemCount}`
);

console.log(
    `Contests ignored: ${contestCount}`
);

console.log("\nResources:");

console.log(
    `TUF practice URLs: ${practiceUrlCount}`
);

console.log(
    `YouTube URLs: ${youtubeCount}`
);

console.log(
    `Article URLs: ${articleCount}`
);

console.log(
    `LeetCode URLs: ${leetcodeCount}`
);

console.log("\nValidation:");

console.log(
    `Duplicate problem IDs: ${duplicateProblemIds}`
);

console.log(
    "========================================"
);