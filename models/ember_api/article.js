var mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
    title: String,
    created_at:Date,
    updated_at:Date,
    keyword:String,
    description:String,
    body:String,
    pName:String,
    name:String
}, {
    collection: "ember"
});
var Article = mongoose.model('ember', articleSchema);

module.exports=Article;