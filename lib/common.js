var common={
	formatArrByKey:function(arr,key,pKey){
		var k=key?key:"id";
		var pk=pKey?pKey:"parent_id";
		var pa=[];
		// var a=[];
		if(arr && arr.length){
			var l=arr.length;
			for(var i=0;i<l;i++){
				var item=arr[i];
				if(item[pk]==0){
					item.children=[];
					pa.push(item);
				}
			}
			// console.log(pa)
			for(var j=0;j<pa.length;j++){
				var jItem=pa[j];
				for(var m=0;m<l;m++){
					var mItem=arr[m];
					if(jItem[k]==mItem[pk]){
						pa[j].children.push(mItem);
					}
				}
			}
		}
		console.log(pa);
		return pa;
	}
}
module.exports=common;