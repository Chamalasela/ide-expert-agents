# IDE Expert Agents — MCP Server

An MCP server that exposes every agent in this repository as an MCP **prompt**. Connect it to Claude Code, Cursor, or GitHub Copilot and all agents become available as slash commands.

## How it works

On startup the server scans all `*-agents-store/*/` folders, reads each agent's entry file (`agent.md` or `SKILL.md`), and registers it as a named MCP prompt. Supporting docs in the same folder (e.g. `workflow.md`, `templates.md`) are concatenated into the prompt so the full context is always available.

The server exposes two entry points:

| Entry point | Transport | Use when |
|---|---|---|
| `dist/index.js` | stdio | Local use or `npx` (Option B) |
| `dist/http.js` | HTTP Streamable | Central shared server (Option A) |

---

## Option A — Central shared server (team deployment)

Run once, everyone on the team connects via URL. No local install or build step required per developer.

### Build and run locally

```bash
cd mcp-server
npm install
npm run build
npm run start:http        # default port 3000
PORT=8080 npm run start:http
```

### Deploy with Docker

Build and run from the **repository root**:

```bash
docker build -t ide-expert-agents-mcp .
docker run -p 3000:3000 ide-expert-agents-mcp
```

### Team member config

Once deployed, each developer adds the server URL to their tool config — no `node` or local path needed.

**Claude Code** — `~/.claude/settings.json`:
```json
{
  "mcpServers": {
    "ide-expert-agents": {
      "url": "http://your-server:3000/mcp"
    }
  }
}
```

**Cursor** — `~/.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "ide-expert-agents": {
      "url": "http://your-server:3000/mcp"
    }
  }
}
```

**GitHub Copilot (VS Code)** — `.vscode/mcp.json`:
```json
{
  "servers": {
    "ide-expert-agents": {
      "type": "http",
      "url": "http://your-server:3000/mcp"
    }
  }
}
```

---

## Option B — npm package (per-developer, no server required)

Publish once to npm (private registry or GitHub Packages). Each developer runs the server locally via `npx` — no clone or build step needed.

### Publish

```bash
cd mcp-server
npm run build
npm publish --access restricted   # private registry
```

### Developer config

Set `MCP_AGENTS_ROOT` to the path of a local clone of this repository so the server knows where to find the agents.

**Claude Code** — `~/.claude/settings.json`:
```json
{
  "mcpServers": {
    "ide-expert-agents": {
      "command": "npx",
      "args": ["-y", "@99x/ide-expert-agents-mcp"],
      "env": {
        "MCP_AGENTS_ROOT": "/path/to/ide-expert-agents"
      }
    }
  }
}
```

**Cursor** — `~/.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "ide-expert-agents": {
      "command": "npx",
      "args": ["-y", "@99x/ide-expert-agents-mcp"],
      "env": {
        "MCP_AGENTS_ROOT": "/path/to/ide-expert-agents"
      }
    }
  }
}
```

**GitHub Copilot (VS Code)** — `.vscode/mcp.json`:
```json
{
  "servers": {
    "ide-expert-agents": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@99x/ide-expert-agents-mcp"],
      "env": {
        "MCP_AGENTS_ROOT": "/path/to/ide-expert-agents"
      }
    }
  }
}
```

---

## Running from a local clone (no npm publish)

If you have the repo cloned and just want to connect directly without publishing to npm:

```bash
cd mcp-server
npm install
npm run build
```

Then use the local path in your tool config:

```json
{
  "mcpServers": {
    "ide-expert-agents": {
      "command": "node",
      "args": ["/absolute/path/to/ide-expert-agents/mcp-server/dist/index.js"]
    }
  }
}
```

---

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `MCP_AGENTS_ROOT` | Two directories above `dist/` | Path to the repo root where `*-agents-store/` folders are located |
| `PORT` | `3000` | HTTP port (Option A only) |

---

## Adding a new agent

1. Create a folder in the appropriate `*-agents-store/` directory.
2. Add an `agent.md` (or `SKILL.md`) with YAML frontmatter containing `name` and `description`.
3. Rebuild: `npm run build`.
4. For Option A: redeploy. For Option B: publish a new version. For local clone: restart the MCP connection.
