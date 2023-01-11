const ApiError = require("../error/ApiError");
const {Suggestions_accepted} = require("../models/models");

class suggestions_acceptedsController {
    async post_suggestions_accepteds(req, res, next) {
        try {
            const {suggestionId} = req.body
            const suggestions_accepted = await Suggestions_accepted.create({suggestionId})
            return res.json(suggestions_accepted);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async all_suggestions_accepteds(req, res, next) {

        try {
            const suggestions_accepted = await Suggestions_accepted.findAll();
            return res.json(suggestions_accepted);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(id)
    }
}

module.exports = new suggestions_acceptedsController()