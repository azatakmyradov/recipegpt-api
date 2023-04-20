let simpleGit = require('simple-git');
require('dotenv').config();

class Deploy {
    static pull(req, res) {
        const webhookSecret = req.query.secret;

        // check if secret matches
        if (webhookSecret !== process.env.GITHUB_WEBHOOK_SECRET) {
            return res.status(403).send('Invalid webhook secret');
        }

        // pull from repository
        simpleGit().pull((err, update) => {
            if (err) {
                return res.status(500).send('Could not update repository');
            }

            res.status(200).send('Repository updated successfully');
        });
    }
}

module.exports = Deploy;