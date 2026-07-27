const fs = require("fs");

const raw = fs.readFileSync("../input/raw.html", "utf8");

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

let start = raw.indexOf(marker);

if (start === -1) {
    console.error("Marker not found.");
    process.exit(1);
}

const payloads = [];
let position = 0;

while (true) {
    let markerIndex = raw.indexOf(marker, position);
    if (markerIndex === -1) {
        break;
    }
    position = markerIndex + marker.length;
    const result = extractPayload(raw, position);
    payloads.push(result.payload);
    position = result.end + 1;
}

const stream = JSON.parse('"' + payloads.join("") + '"');

function extractJSONObject(stream, start) {

    let depth = 0;
    let insideString = false;
    let escaped = false;

    // console.log("Started at index:", start);
    // console.log("First 100 chars:");
    // console.log(stream.substring(start, start + 100));
    // console.log("----------------------------------");

    for (let i = start; i < stream.length; i++) {

        const ch = stream[i];

        // Escaped character
        if (escaped) {
            escaped = false;
            continue;
        }

        // Escape sequence inside string
        if (insideString && ch === "\\") {
            escaped = true;
            continue;
        }

        // Enter / Exit string
        if (ch === '"') {
            insideString = !insideString;
            continue;
        }

        // Ignore braces inside strings
        if (insideString) {
            continue;
        }

        if (ch === "{") {
            depth++;
            // console.log(`OPEN  @ ${i}   depth = ${depth}`);
        }

        else if (ch === "}") {
            depth--;
          
            if (depth === 0) {
                return stream.substring(start, i + 1);
            }
        }
    }

    return null;
}

const idx = stream.indexOf("sections");

const titleIndex = stream.lastIndexOf('"title"', idx);

// console.log("idx =", idx);
// console.log("title =", titleIndex);

// Find the opening {
let start2 = titleIndex;

while (stream[start2] !== "{") {
    start2--;
}


const objectText = extractJSONObject(stream, start2);
const course = JSON.parse(objectText);

if (objectText === null) {
    console.log("Parser returned NULL.");
}
else {
    
    console.log("OBJECT FOUND!");
}

const BASE_URL = "https://takeuforward.org";

function normalizeUrl(url) {

    if (!url || url === "$undefined") {
        return null;
    }

    if (url.startsWith("/")) {
        return BASE_URL + url;
    }

    return url;
}

const sheets = [];
const patterns = [];
const problems = [];

sheets.push({
    sheet_id: 1,
    title: course.title
});

let patternId = 1;
let problemId = 1;

for (const category of course.sections) {

    const currentPatternId = patternId++;

    patterns.push({
        pattern_id: currentPatternId,
        source_id: Number(category.category_id),
        sheet_id: 1,
        pattern_name: category.category_name
    });
    for (const subcategory of category.subcategories) {
        for (const problem of subcategory.problems) {
                problems.push({

    problem_id: problemId++,

    pattern_id: currentPatternId,

    subcategory_name: subcategory.subcategory_name,

    problem_name: problem.problem_name,

    difficulty: problem.difficulty,

    official_article: normalizeUrl(problem.article),
    recommended_article: null,

    official_youtube: normalizeUrl(problem.youtube),
    recommended_youtube: null,

    official_leetcode: normalizeUrl(problem.leetcode),
    recommended_leetcode: null,

    plus: normalizeUrl(problem.plus),

    official_editorial: normalizeUrl(problem.editorial),
    recommended_editorial: null

});
        }
    }

}

// console.log("===== SHEETS =====");
// console.log(sheets);

// console.log("\n===== PATTERNS =====");
// console.log("Total patterns:", patterns.length);

// console.log("\nFirst Pattern:");
// console.log(patterns[0]);

// console.log("\nLast Pattern:");
// console.log(patterns[patterns.length - 1]);

// console.log("Problems:", problems.length);
// console.log(problems[0]);
// console.log(problems[problems.length - 1]);

// console.log("\n===== VALIDATION =====");

// console.log("Sheets:", sheets.length);
// console.log("Patterns:", patterns.length);
// console.log("Problems:", problems.length);

const duplicateProblemIds = new Set();
let hasDuplicate = false;

for (const problem of problems) {
    if (duplicateProblemIds.has(problem.problem_id)) {
        hasDuplicate = true;
        break;
    }
    duplicateProblemIds.add(problem.problem_id);
}

// console.log("Duplicate Problem IDs:", hasDuplicate ? "YES" : "NO");

fs.writeFileSync(
    "sheets.json",
    JSON.stringify(sheets, null, 2)
);

fs.writeFileSync(
    "patterns.json",
    JSON.stringify(patterns, null, 2)
);

fs.writeFileSync(
    "problems.json",
    JSON.stringify(problems, null, 2)
);

console.log("\nJSON files generated successfully!");