import { glob } from "glob";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// When installed via npx, set MCP_AGENTS_ROOT to the local repo clone.
// When running from the repo directly, the default resolves correctly.
export function getAgentsRoot(): string {
  return process.env.MCP_AGENTS_ROOT ?? path.resolve(__dirname, "../..");
}

export interface Agent {
  name: string;
  description: string;
  content: string;
}

const ENTRY_FILENAMES = ["agent.md", "SKILL.md"];

export function loadAgents(): Agent[] {
  const root = getAgentsRoot();
  const agents: Agent[] = [];

  const storeDirs = glob.sync("*-agents-store/*/", { cwd: root });

  for (const relDir of storeDirs) {
    const agentDir = path.join(root, relDir);

    const entryFile = ENTRY_FILENAMES
      .map(f => path.join(agentDir, f))
      .find(f => fs.existsSync(f));

    if (!entryFile) continue;

    const raw = fs.readFileSync(entryFile, "utf-8");
    const { data, content } = matter(raw);

    const name: string = data.name;
    const description: string =
      typeof data.description === "string"
        ? data.description.trim()
        : String(data.description ?? "").trim();

    if (!name || !description) continue;

    const supportingFiles = fs
      .readdirSync(agentDir)
      .filter(
        f =>
          f.endsWith(".md") &&
          f !== path.basename(entryFile) &&
          f !== "README.md"
      )
      .sort()
      .map(f => path.join(agentDir, f));

    let fullContent = content.trim();
    for (const sf of supportingFiles) {
      fullContent += `\n\n---\n\n${fs.readFileSync(sf, "utf-8").trim()}`;
    }

    agents.push({ name, description, content: fullContent });
  }

  return agents;
}
