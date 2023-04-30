let { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

class OpenAI {
    constructor() {
        let configuration = new Configuration({
            organization: process.env.OPEN_AI_ORG,
            apiKey: process.env.OPEN_AI_KEY,
        });

        this.openai = new OpenAIApi(configuration);
    }

    // Ask a prompt from text-davinci
    request(prompt, temperature = 0.5, max_tokens = 150) {
        return this.openai.createCompletion({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: max_tokens,
            temperature: temperature,
        });
    }
}

module.exports = OpenAI;
