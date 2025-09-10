import dotenv from "dotenv";

dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts"

// create our model 
const model = new ChatGoogleGenerativeAI({
    model : "gemini-2.5-flash",
    maxOutputTokens : 2000,
    temperature : 0.7,
    apiKey : process.env.GEMINI_KEY
});

// create prompt 
const prompt = PromptTemplate.fromTemplate(
    "You are a helpful career assistant for student , suggest the career path for student according thier need : {question}"
);

// another way you can use LLmchain which is provided by langchain
const chain = new LLMChain({
    llm : model,
    prompt
})

// create chain using LCEL ( langchain expression language )
// const chain = prompt.pipe(model);

// create our prompt with LCEL and run
const res = await chain.invoke({
    question : "I am from computer sciend and i want to become a data analyst can you suggest me , best path "
})

console.log("Final output :" , res.text)