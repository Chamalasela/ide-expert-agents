import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { loadAgents } from "./agents.js";

const agents = loadAgents();

export function createServer(): Server {
  const server = new Server(
    { name: "ide-expert-agents", version: "1.0.0" },
    { capabilities: { prompts: {} } }
  );

  server.setRequestHandler(ListPromptsRequestSchema, async () => ({
    prompts: agents.map(({ name, description }) => ({ name, description })),
  }));

  server.setRequestHandler(GetPromptRequestSchema, async request => {
    const agent = agents.find(a => a.name === request.params.name);
    if (!agent) throw new Error(`Agent '${request.params.name}' not found`);
    return {
      description: agent.description,
      messages: [
        {
          role: "user" as const,
          content: { type: "text" as const, text: agent.content },
        },
      ],
    };
  });

  return server;
}
