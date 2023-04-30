let OpenAI = require('./../OpenAI.js');
let openai = new OpenAI();

class Router {
    static list(req, res) {
        if (!req.body.products) {
            return res.status(403).json({
                message: 'Products value is required',
            });
        }

        openai
            .request(
                `If none of the given ingredients are not edible return ["error: please provide some ingredients"] else you can continue: I ${req.body.products}. Write me a json array list of maximum of 10 (can be less than 10 if there's not enough possible recipes) unique recipe names each seperated by symbol you can make only with these ingredients (add difficulty and origin without any symbols):`
            )
            .then(response => {
                if (
                    response.data.choices[0].text.includes('error') ||
                    response.data.choices[0].text.includes('Error')
                ) {
                    return res.status(403).json({
                        status: 'error',
                        message: null,
                    });
                }

                res.json({
                    message: response.data,
                });
            });
    }

    static make(req, res) {
        if (!req.body.recipe || !req.body.products) {
            return res.status(403).json({
                message: 'Recipe name and products are required',
            });
        }

        openai
            .request(
                `If none of the given ingredients are not edible return ["error: please provide some ingredients"] else you can continue: Can you give me the steps for a beginner to prepare ${req.body.recipe} using ${req.body.products} in a json array format in the structure like this: [step directions for first step without labeling", ...]?`,
                0.5,
                1000
            )
            .then(response => {
                if (response.data.choices[0].text.includes('Error')) {
                    return res.status(403).json({
                        status: 'error',
                        message: null,
                    });
                }

                res.status(200).json({
                    message: response.data,
                });
            });
    }
}

module.exports = Router;
