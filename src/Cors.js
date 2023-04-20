let cors = require('cors');
require('dotenv').config();

class Cors {
    whiteList = process.env.CORS_ALLOWED.split(',');

    constructor() {
        return cors(this.options);
    }

    // check if domain is in the whiteList
    // ignore cors if it's dev environment
    get options() {
        return {
            origin: (origin, callback) => {
                if (process.env.APP_ENV === 'dev') {
                    callback(null, true);
                } else if (this.whiteList.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            }
        }
    }
}

module.exports = Cors;