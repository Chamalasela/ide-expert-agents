import fs from "fs";

const SHEBANG = "#!/usr/bin/env node\n";
const target = new URL("../dist/index.js", import.meta.url).pathname;

const content = fs.readFileSync(target, "utf-8");
if (!content.startsWith("#!")) {
  fs.writeFileSync(target, SHEBANG + content);
}
fs.chmodSync(target, 0o755);
