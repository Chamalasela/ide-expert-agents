# Data Platform Agents Store

Agents for analyzing and evolving a data platform — repository/warehouse discovery, health auditing, architecture advisory, opportunity scouting, implementation, independent validation, regression monitoring, and cycle close-out. Ported from `agent-platform`'s data-platform pipeline agents (originally built for a Microsoft Fabric/Medallion-architecture project), adapted to be standalone and platform-agnostic: no external database, no `agents/context/` tree — each agent asks which platform/warehouse you're using and writes its output as a file in your own project.

All agents in this store are served via the repository's MCP server. See [mcp-server/README.md](../mcp-server/README.md) for setup instructions.

---

## Available Agents

| Agent | Prompt name | When to use |
|---|---|---|
| **Repo Analyst** | `repo-analyst` | Onboarding into an unfamiliar data platform, or starting any analysis pipeline — builds a structured knowledge graph of schema, pipelines, and lineage, cross-referenced against documentation |
| **Data Platform Developer** | `data-platform-developer` | Implementing one approved opportunity or ADR end to end — creates or changes schema and pipeline code with human checkpoints and mandatory idempotency |
| **Data Platform Validator** | `data-platform-validator` | Independently reviewing a completed data-platform change against its approved opportunity or ADR before merge, with evidence-backed approve/reject findings |
| **Regression Monitor** | `regression-monitor` | Periodically comparing current platform state against an established baseline to report schema drift, undocumented pipeline changes, and data-quality degradation |
| **Context Keeper** | `context-keeper` | Closing out a completed data-platform work cycle with a plain-language summary of what changed, current state, open follow-ups, and recommended next steps |

More agents (`due-diligence`, `architecture-advisor`, `opportunity-scout`) are planned for this store, forming a full analyze → audit → advise → scout → build → validate → monitor → close-out pipeline — see [ide-expert-agents#19](https://github.com/xianix-team/ide-expert-agents/issues/19), [#20](https://github.com/xianix-team/ide-expert-agents/issues/20), [#21](https://github.com/xianix-team/ide-expert-agents/issues/21).

---

## Adding an agent

1. Create a folder here with an `agent.md` file containing `name` and `description` in YAML frontmatter.
2. Rebuild the MCP server (`npm run build` in `mcp-server/`).
3. The agent appears automatically on the next server restart — no other changes needed.
4. Add a row to the table above so this README stays accurate.

These agents are fully standalone — no external database, no ticket refs, no `agents/context/` tree. Each one asks which data platform/warehouse you're using and writes its output as a plain file in your own repo.
