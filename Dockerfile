FROM node:22-alpine AS builder
WORKDIR /app
COPY mcp-server/package*.json ./mcp-server/
RUN cd mcp-server && npm ci
# Full repo context (not just mcp-server/) so postbuild can bundle every
# *-agents-store/ into mcp-server/dist/agents-bundle/ — see scripts/postbuild.mjs.
# New stores are picked up automatically; no Dockerfile edit needed.
COPY . .
RUN cd mcp-server && npm run build

FROM node:22-alpine
WORKDIR /app

COPY mcp-server/package*.json ./mcp-server/
RUN cd mcp-server && npm ci --omit=dev

# dist/ already contains agents-bundle/ from the builder stage.
COPY --from=builder /app/mcp-server/dist/ ./mcp-server/dist/

ENV PORT=3000
EXPOSE 3000

CMD ["node", "mcp-server/dist/http.js"]
