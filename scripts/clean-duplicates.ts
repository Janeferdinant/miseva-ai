import fs from "fs";

let content = fs.readFileSync("lib/data/table-styling-concepts.ts", "utf8");
content = content.replace(/(collection:\s*"[^"]+",\s*\n)\s*collection:\s*"[^"]+",\s*\n/g, "$1");
fs.writeFileSync("lib/data/table-styling-concepts.ts", content, "utf8");
console.log("Cleaned duplicates in table-styling-concepts.ts");
