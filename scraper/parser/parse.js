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

console.log(payloads.length);