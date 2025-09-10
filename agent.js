import dotenv from "dotenv";

dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "@langchain/community/tools/serpapi";

const model = new ChatGoogleGenerativeAI({
    model : "gemini-2.5-flash",
    maxOutputTokens : 2000,
    temperature : 0.7,
    apiKey : process.env.GEMINI_KEY
});

// Direct using built in tools
const searchTool = new SerpAPI( process.env.SERP_API , {
    location : "India", // Optional set india
});

// Create agent with langchain built in function

const agent = await initializeAgentExecutorWithOptions(
    [searchTool], // You can use multiple tool ,  which whould agent select for thier specific need
    model
);

// Create our prompt 

const res = await agent.invoke({
    input : "Let me show trending news?"
});

// Response which is come from agent
console.log("Lates News :" , res.output);