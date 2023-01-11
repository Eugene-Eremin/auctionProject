const ApiError = require('../error/ApiError');
// в {} мы берем переменные или функции
const {Users} = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateJwt = (id, login, role) => {
    return jwt.sign(
        {id, login, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserController {
    // Так же можно принимать картинку от пользователя и записывать ее, как можно посмотреть на видео https://youtu.be/H2GCkRF9eko

    async registration(req, res, next) {
        try {
            const {login, password, role} = req.body
            if (!login || !password) {
                return next(ApiError.badRequest('Некорректный login или password'))
            }
            const candidate = await Users.findOne({where: {login}})
            if(candidate) {
                return next(ApiError.badRequest('Пользователь с таким login уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const users = await Users.create({login: login, password: hashPassword, role: role})
            const token = generateJwt(users.id, users.login, users.role)
            return res.json({token});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        const {login, password} = req.body
        const users = await Users.findOne({where: {login}})
        if (!users) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, users.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(users.id, users.login, users.role)
        return res.json({token})
    }

    async all_users(req, res) {
        let {limit, page} = req.query // body берет тело запроса а query берет с строки запроса (параметры - ?id=1%some=1...)
        limit = limit || 10
        page = page || 1
        let offset = page * limit - limit // позволяет сделать отступ для первых элементов. В зависимости от страницы
        // функция возвращает общее количество всех юзеров в качестве аргументов можно передать параметры чтобы...
        // ...вывести несколько limit элементов
        const users = await Users.findAndCountAll({limit, offset});
        return res.json(users);
    }

    async get_one_user(req, res, next) {
        const {userId} = req.body
        const user = await Users.findOne({where: {id: userId}})
        return res.json(user.login)
    }

    async check(req, res, next) {
        const token = generateJwt(req.users.id, req.users.login, req.users.role)
        return res.json({token})
    }

    async checkMyRole(req, res, next) {
        try {
            const {login} = req.params
            const user = await Users.findOne(
                {
                    where: {login}
                }
            )
            return res.json(user.role)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async checkMyId(req, res, next) {
        try {
            const {login} = req.params
            const user = await Users.findOne(
                {
                    where: {login}
                }
            )
            return res.json(user.id)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new UserController()