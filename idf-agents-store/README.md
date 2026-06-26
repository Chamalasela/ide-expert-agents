# Agents made with 99x Intent Delivery Framework for AI-DLC

Standalone IDE agents exported from the 99x Intent Delivery Framework for AI-DLC.

Each agent is a self-contained markdown file with Claude Code agent frontmatter. Copy any folder into a project's `.claude/agents/` directory and the agent becomes available as a slash command in that project.

All agents resolve the framework root path dynamically by reading the project's master rule file (`CLAUDE.md`, `.cursorrules`, or `.github/copilot-instructions.md`) — no hardcoded paths.

---

## Available Agents

| Agent | Folder | Invoke with | When to use |
|---|---|---|---|
| **Design Session** | `design-session/` | `/design-session` | Before the first unit is proposed in any mob elaboration — establishes API contracts, data models, and architectural patterns as binding constraints |
| **Bolt Risk Assessment** | `bolt-risk-assessment/` | `/bolt-risk-assessment` | After elaboration sign-off, before the first unit in a bolt executes — assesses blast radius, sequencing risks, rollback, and feature flag requirements |
| **UAT** | `uat/` | `/uat` | When all units under an intent are marked Done — generates a plain-language demo script and records the stakeholder validation outcome |
| **Root Cause Analysis** | `root-cause-analysis/` | `/root-cause-analysis` | When an incident is resolved or recurring failures suggest a systemic issue — surfaces root causes across solution design, technology, and process |
| **Progress Digest** | `progress-digest/` | `/progress-digest` | At any point during delivery — generates a plain-language stakeholder update with no engineering jargon |
| **New Engineer Induction** | `new-engineer-induction/` | `/new-engineer-induction` | When an engineer joins the project for the first time — explains the framework using the project's actual files and produces a personalised quick-reference card |
| **Process Health** | `process-health/` | `/process-health` | After every third or fourth bolt, or when the team suspects process drift — produces a quantitative health report across four metrics |
| **Dependency Audit** | `dependency-audit/` | `/dependency-audit` | Monthly or when the scheduled audit date in the master rule file is reached — audits dependencies and converts findings into remediation backlog items |
| **Codebase Archaeology** | `codebase-archaeology/` | `/codebase-archaeology` | Before onboarding AI-DLC into a mature project, before joining a new team, or as a standalone technical due diligence exercise — maps architecture, extracts coding patterns, audits for defects and technical debt, and classifies all identified work |

---

## Installation

Copy the agent folder to `.claude/agents/` in the target project:

```
your-project/
  .claude/
    agents/
      design-session/
        agent.md
      uat/
        agent.md
      ...
```

The agent is then available as `/design-session`, `/uat`, etc. in any Claude Code session within that project.

---

## Requirements

These agents require the 99x Intent Delivery Framework to be installed in the project (`process-onboarding-agent/onboard.md` → run onboarding). They read framework files (`rules/`, `guidelines/`, `ops/`) to personalise their behavior to the specific project. Without the framework, path resolution will fail and the agents will ask the engineer where things are.

**Exception:** `dependency-audit` can run without the framework installed — it reads dependency manifest files directly and only requires the master rule file to exist for scheduling.

**Exception:** The `codebase-archaeology` agent is fully standalone — it reads the codebase directly and writes output to an `archaeology/` folder. No framework installation required.
