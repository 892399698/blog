var crypto = require('crypto');

var common = {
    //栏目数据格式化
    formatArrByKey: function(arr, key, pKey) {
        var k = key ? key : "id";
        var pk = pKey ? pKey : "parent_id";
        var pa = [];
        // var a=[];
        if (arr && arr.length) {
            var l = arr.length;
            for (var i = 0; i < l; i++) {
                var item = arr[i];
                if (item[pk] == 0) {
                    item.children = [];
                    pa.push(item);
                }
            }
            // console.log(pa)
            for (var j = 0; j < pa.length; j++) {
                var jItem = pa[j];
                for (var m = 0; m < l; m++) {
                    var mItem = arr[m];
                    if (jItem[k] == mItem[pk]) {
                        pa[j].children.push(mItem);
                    }
                }
            }
        }
        console.log(pa);
        return pa;
    },
    md5: function(content) {
        var content = content;
        if (!content) {
            return content;
        }
        var md5 = crypto.createHash('md5');
        md5.update(content);
        var d = md5.digest("hex");
        return d;
    }
}
module.exports = common;
