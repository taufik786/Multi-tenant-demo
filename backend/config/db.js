require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const db = mongoose.connect("mongodb://127.0.0.1:27017/MultiTenantApp", {
}).then(res => {
    console.log('Database Connected Successfully!')
});
module.exports = db;