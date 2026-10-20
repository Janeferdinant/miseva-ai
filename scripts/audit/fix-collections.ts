import fs from "fs";

let fileContent = fs.readFileSync("lib/data/table-styling-concepts.ts", "utf8");

const missingCollections: Record<string, string> = {
  // Kerala Sadya
  "tab-kerala-syrian-christian-easter": "kerala-sadya-banquet",
  "tab-kerala-backwater-houseboat": "kerala-sadya-banquet",
  "tab-kerala-village-oottupura": "kerala-sadya-banquet",
  "tab-kerala-karkidakam-healing": "kerala-sadya-banquet",
  "tab-kerala-coastal-chic": "kerala-sadya-banquet",
  "tab-kerala-banana-fiber-eco": "kerala-sadya-banquet",

  // Festive Indian
  "tab-pongal-kolam-harvest": "festive-indian",
  "tab-ganesh-chaturthi-marigold": "festive-indian",
  "tab-holi-color-splash": "festive-indian",
  "tab-karwa-chauth-moonlit": "festive-indian",
  "tab-raksha-bandhan-sweet": "festive-indian",
};

for (const [id, col] of Object.entries(missingCollections)) {
  const idRegex = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?transliteration:[^\\n]+,)`, "g");
  fileContent = fileContent.replace(idRegex, (match) => {
    if (match.includes("collection:")) {
      return match;
    }
    return `${match}\n    collection: "${col}",`;
  });
}

fs.writeFileSync("lib/data/table-styling-concepts.ts", fileContent, "utf8");
console.log("Patched remaining collections.");
