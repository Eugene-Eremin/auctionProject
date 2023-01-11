const ApiError = require("../error/ApiError");
const {Applications} = require("../models/models");

class applicationsController {
    async post_application(req, res, next) {
        try {
            const {amount, delivery_time, offer_time, status, productNameId} = req.body
            if (!amount || !delivery_time || !offer_time || !productNameId) {
                return next(ApiError.badRequest('Некорректные данные'))
            }
            const applications = await Applications.create({amount, delivery_time, offer_time, status, productNameId})
            return res.json(applications);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async all_application(req, res) {
        let {status} = req.body
        let {limit, page} = req.query
        limit = limit || 10
        page = page || 1
        let offset = page * limit - limit
        const applications = await Applications.findAndCountAll({where: {status: status}, limit, offset});
        return res.json(applications);
    }

    async update_application_status(req, res) {
        let {applicationId} = req.body

        const applications = await Applications.update({ status: true }, {
            where: {
                id: applicationId
            }
        })
        return res.json(applications)
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const application = await Applications.findOne(
                {
                    where: {id}
                }
            )
            return res.json(application)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new applicationsController()