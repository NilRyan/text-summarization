import "dotenv/config";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createToolCallingAgent } from "langchain/agents";

async function main() {
  const agent = createToolCallingAgent({
    llm: new ChatOpenAI({
      model: "llama3-8b-8192",
      temperature: 0,
      configuration: {
        baseURL: "https://api.groq.com/openai/v1",
      },
      apiKey: process.env.OPENAI_API_KEY,
    }),
    tools: [],
    prompt: ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are a summarizer. Summarize the news article provided. Be as concise as possible.",
      ],
      ["human", "{input}"],
      ["placeholder", "{agent_scratchpad}"],
    ]),
  });

  const agentExecutor = new AgentExecutor({
    agent,
    tools: [],
    // verbose: true
  });

  const result = await agentExecutor.invoke({
    input: `<a href="https://www.facebook.com/NBMidnightSmokersBBQ">Midnight Smokers BBQ</a>
is now cooking brisket plates and more at
<a href="https://redbusfoodpark.com/">Red Bus Food Park&#x2019;s</a> walk-up
ordering window.<br /><br />Owner Brian Rabel began selling brisket plates
around New Braunfels during the pandemic after receiving positive feedback at
barbecue competitions. An electrician by trade, Rabel built the grill for the
San Marcos location by hand, said Jennifer Betus, Rabel&#x2019;s partner. She
said they are excited to be near the Texas State University campus and be
&#x201c;part of the energy.&#x201d;<br /><br />&#x201c;His motto is rolling
smoke and feeding friends,&#x201d; Betus said. &#x201c;He meets a new friend and
just loves to cook for them.&#x201d;<br /><br /><strong>What they offer</strong
><br /><br />Midnight Smokers BBQ serves sliced and chopped brisket sandwiches,
brisket nachos, loaded baked potatoes and brisket mac and cheese. The menu also
offers smoked sausage combos and sides like homemade street corn and beans.
<br /><br />The business&#x2019; soft opening hours will be from 10 a.m.-2 p.m.
from Wednesday to Friday. They would like to extend the hours to serve breakfast
eventually.
<ul>
  <li>Opened Sept. 25</li>
  <li>801 Chestnut St., San Marcos</li>
  <li>
    Facebook:
    <a href="https://www.facebook.com/NBMidnightSmokersBBQ"
      >Midnight Smokers BBQ</a
    >
  </li>
</ul>
<div
  class="iframe-scroll"
  data-iframe='&lt;iframe height="480" src="https://www.google.com/maps/d/u/0/embed?mid=1haqiJBLcYTYYQFbA56fvTTkBcG4NRJQ&amp;ehbc=2E312F" width="640"&gt;&lt;/iframe&gt;'
></div>
`,
  });

  console.log(result.output);
}

main();
