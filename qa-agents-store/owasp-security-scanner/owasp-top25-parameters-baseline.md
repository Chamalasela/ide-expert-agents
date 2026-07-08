# OWASP Top 25 Parameters — Cached Baseline

**Source of truth:** https://owasp.org/www-project-top-25-parameters/ — always attempt a live `WebFetch` of this page first.

**Important — no static parameter list to cache:** unlike the Top 10, this OWASP project page does **not** embed the literal parameter-name lists itself; it only describes the six vulnerability categories and points to an externally-hosted list (as of this writing, the project's linked GitHub repository). This means there is no meaningful "cached list of names" to fall back to — the names must always be fetched live, following whatever link the OWASP page currently points to. If both the OWASP page and its linked source are unreachable, tell the user this scan cannot run and fall back to the OWASP Top 10 scan only, or ask the user to paste the parameter list manually.

**Cached:** 2026-07-08 — the six category definitions below are stable page content and safe to use as a description fallback; the parameter names themselves are not.

## Categories

| Category | Attack type | What a match means |
|---|---|---|
| XSS | Cross-Site Scripting | Parameter value is reflected/rendered into HTML/JS output without encoding. |
| SSRF | Server-Side Request Forgery | Parameter value is used to construct a server-side outbound request (URL fetch) without allow-listing. |
| LFI | Local File Inclusion | Parameter value is used to build a filesystem path that is read/included. |
| SQLi | SQL Injection | Parameter value flows into a SQL query without parameterization. |
| RCE | Remote Code Execution (GET-based) | Parameter value flows into a shell/exec/eval call. |
| Open Redirect | Open Redirect (GET-based) | Parameter value is used as a redirect target without validation against an allow-list. |

## How to use this in a static scan

1. Fetch the live OWASP page; follow its current link to the parameter-name source and fetch that too.
2. For each category, search the codebase for route/query-string/body parameters whose *names* appear in that category's list (e.g. names commonly used for redirect targets, file paths, URLs).
3. For each match, trace whether the value reaches a sensitive sink (query builder, `exec`/`eval`, filesystem API, outbound HTTP call, redirect call) without validation/sanitization in between.
4. A name match alone is not a finding — only report it as a finding when the taint actually reaches a sink unsanitized. Name-only matches with no sink reached should be noted as "low-signal, no reachable sink" rather than omitted, so the user can judge.
