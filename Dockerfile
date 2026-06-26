FROM node:22-alpine AS builder
WORKDIR /app
COPY mcp-server/package*.json ./mcp-server/
RUN cd mcp-server && npm ci
COPY mcp-server/ ./mcp-server/
RUN cd mcp-server && npm run build

FROM node:22-alpine
WORKDIR /app

COPY mcp-server/package*.json ./mcp-server/
RUN cd mcp-server && npm ci --omit=dev

COPY --from=builder /app/mcp-server/dist/ ./mcp-server/dist/

COPY idf-agents-store/ ./idf-agents-store/
COPY devops-agents-store/ ./devops-agents-store/
COPY architect-agents-store/ ./architect-agents-store/
COPY coding-agents-store/ ./coding-agents-store/
COPY qa-agents-store/ ./qa-agents-store/
COPY ux-agents-store/ ./ux-agents-store/
COPY compliance-agents-store/ ./compliance-agents-store/
COPY delivery-agents-store/ ./delivery-agents-store/

ENV PORT=3000
ENV MCP_AGENTS_ROOT=/app
EXPOSE 3000

CMD ["node", "mcp-server/dist/http.js"]
