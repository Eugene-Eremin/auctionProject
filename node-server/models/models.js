const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Users = sequelize.define('users',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const Applications = sequelize.define('applications',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    amount: {type: DataTypes.INTEGER},
    delivery_time: {type: DataTypes.STRING},
    offer_time: {type: DataTypes.STRING},
    status: {type: DataTypes.BOOLEAN}
})
//
const Product_names = sequelize.define('product_names',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true}
})

const Suggestions = sequelize.define('suggestions',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // application_id: {type: DataTypes.INTEGER}, // внешние ключи sequelize добавляет сам после того как ниже мы указали
    // связки таблиц
    // user_id: {type: DataTypes.INTEGER},
    price: {type: DataTypes.STRING},
    comment: {type: DataTypes.STRING}
})

const Suggestions_accepted = sequelize.define('suggestions_accepted',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // suggestions_id: {type: DataTypes.INTEGER}
})

// описываем как эти модели связаны друг с другом

// одна ко многим
Applications.hasMany(Suggestions)
Suggestions.belongsTo(Applications)
Users.hasMany(Suggestions)
Suggestions.belongsTo(Users)
Product_names.hasMany(Applications)
Applications.belongsTo(Product_names)
// один к одному
Suggestions.hasOne(Suggestions_accepted);
Suggestions_accepted.belongsTo(Suggestions);

module.exports = {
    Users,
    Applications,
    Product_names,
    Suggestions,
    Suggestions_accepted
}