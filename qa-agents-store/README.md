# QA Agents Store

Agents for testing and quality assurance.

All agents in this store are served via the repository's MCP server. See [mcp-server/README.md](../mcp-server/README.md) for setup instructions.

---

## Available Agents

| Agent | Prompt name | When to use |
|---|---|---|
| **OWASP Security Scanner** | `owasp-security-scanner` | When you want a static code scan against OWASP Top 10 (2025) and/or OWASP Top 25 Parameters, with the latest standards fetched live from owasp.org. You choose which scan(s) to run; the agent reports severity-ranked findings with evidence — it does not edit code |
| **Bug Drafter** | `bug-drafter` | When you want to turn a conversational bug description (plus an optional screenshot) into a structured report and file it as an Azure DevOps Bug or a GitHub issue, with severity set. Uses the `az`/`gh` CLIs already authenticated on your machine — no credentials are stored by the agent. Waits for explicit approval before creating anything |

---

## Adding an agent

1. Create a folder here with an `agent.md` file containing `name` and `description` in YAML frontmatter.
2. Rebuild the MCP server (`npm run build` in `mcp-server/`).
3. The agent appears automatically on the next server restart — no other changes needed.
