let OpenAI = require('./../OpenAI.js');
let openai = new OpenAI();

class Router {
    static list(req, res) {
        if (! req.body.products) {
            return res.status(403).json({
                message: 'Products value is required'
            })
        }

        openai.request('Generate unique recipe names list recommendations based on the input: What can I cook using exactly these ingredients: ' + req.body.products + '. If user input doesnt contain ingredients just respond "error". Do not use any other ingredient. Start every item with $ sign. It shouldnt include any special characters or numbers')
            .then(response => {
                if (response.data.choices[0].text.includes('Error')) {
                    return res.status(403).json({
                        status: 'error',
                        message: null
                    });
                }

                res.json({
                    message: response.data
                });
            });
    }

    static make(req, res) {
        if (! req.body.recipe || ! req.body.products) {
            return res.status(403).json({
                message: 'Recipe name and products are required'
            });
        }

        openai.request('Generate a comprehensive recipe like for a beginner cook for user input: ' + req.body.recipe + '. Strictly use only these ingredients: ' + req.body.products + '. Return failed message if anything inappropriate is requested', 0.5, 1000)
            .then(response => {
                if (response.data.choices[0].text.includes('Error')) {
                    return res.status(403).json({
                        status: 'error',
                        message: null
                    });
                }

                res.status(200).json({
                    message: response.data
                });
            });
    }
}

module.exports = Router;