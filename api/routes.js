const appRouter = function (app) {
    app.post('/event', (req, res) => {
        res.status(200).send("Hello rest api");
    });
};

module.exports = appRouter;