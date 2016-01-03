var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    title: String,
    created_at:Date,
    updated_at:Date,
    column_id:String,
    click:Number,
    HTML:Number,
    status:Number,
    editor:String
    // parent_id:Number
}, {
    collection: "article"
});
var Article = mongoose.model('article', userSchema);

module.exports=Article;