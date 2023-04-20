class Router {
    static index(req, res) {
        res.status(200).json({
            message: 'success',
        });
    }
}

module.exports = Router;