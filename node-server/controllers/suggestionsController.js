const ApiError = require("../error/ApiError");
const {Suggestions, Suggestions_accepted} = require("../models/models");
const jwt = require("jsonwebtoken");
const {DataTypes} = require("sequelize");

class suggestionsController {
    async post_suggestions(req, res, next) {
        try {
            const {price, comment, applicationId} = req.body

            try {
                const token = req.headers.authorization.split(' ')[1] // Bearer asdfasd
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                const userId = decoded.id;

                const suggestionsFind = await Suggestions.findOne({where: {userId: userId, applicationId: applicationId}})

                if (suggestionsFind != null) {
                    return res.json('null')
                }

                const suggestions = await Suggestions.create({price, comment, applicationId, userId})
                return res.json(suggestions);
            } catch (e) {
                res.status.json(e.message)
            }
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async all_suggestions(req, res) {
        let {applicationId} = req.body
        let {limit, page} = req.query
        limit = limit || 10
        page = page || 1
        let offset = page * limit - limit
        const suggestions = await Suggestions.findAndCountAll({where: {applicationId: applicationId}, limit, offset});
        return res.json(suggestions);
    }

    async all_suggestions_for_user(req, res) {
        try {
            const {userId} = req.params
            const suggestions = await Suggestions.findAndCountAll({where: {userId: userId}});
            
            return res.json(suggestions)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async all_suggestions_accepted_for_user(req, res) {
        
    }

    async get_selected_suggestions(req, res) {
        let {applicationId} = req.body
        const suggestions = await Suggestions.findAndCountAll({where: {applicationId: applicationId}});

        const suggestionsAccepted = await Suggestions_accepted.findAndCountAll();


        let arraySug = [];
        // я не знал как преобразовать suggestions в data и сделал так
        arraySug = JSON.parse(JSON.stringify(suggestions["rows"]))

        let arraySugAcc = [];
        arraySugAcc = JSON.parse(JSON.stringify(suggestionsAccepted["rows"]))

        console.log(arraySug)

        console.log(arraySugAcc)

        let NoOrYes = "No"

        arraySugAcc.forEach(arrSgAc => {
            arraySug.forEach(arrSg => {
                if (arrSg.id == arrSgAc.suggestionId) {
                    NoOrYes = arrSg;
                }
            })
        })

        return res.json(NoOrYes);
    }

    async getOne(req, res, next) {
        const {id} = req.query
        if (!id) {
            return next(ApiError.badRequest('Не задан ID'))
        }
        res.json(id)
    }
}

module.exports = new suggestionsController()