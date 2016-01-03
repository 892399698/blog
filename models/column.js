var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    parent_id: {
        type: String,
        // unique: true
    },
    sort: String,
    seo_title: String,
    keyword: String,
    desc: String,
    created_at:Date,
    updated_at:Date,
    children:[],
    link:String
    // parent_id:Number
}, {
    collection: "column"
});
var Column = mongoose.model('column', userSchema);

module.exports=Column;