const {Product_names} = require("../models/models");
const ApiError = require("../error/ApiError");

class product_namesController {
    async post_product_names(req, res, next) {
        try {
            const {name} = req.body
            const product_names = await Product_names.create({name})
            return res.json(product_names);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async all_product_names(req, res) {
        const product_names = await Product_names.findAll();
        return res.json(product_names);
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.body
            const product_name = await Product_names.findOne(
                {
                    where: {id}
                }
            )
            return res.json(product_name.name)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new product_namesController()