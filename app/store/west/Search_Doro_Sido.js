Ext.define('InAcc.store.west.Search_Doro_Sido', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	remoteSort: true,
	autoload: true,
	
	listeners: {
		load: function(store) {
			
			
			Ext.Ajax.request({
        		url: './resources/jsp/searchResult/searchSido.jsp',
        		async: true, // 비동기 = async: true, 동기 = async: false
        		success : function(response, opts) {
        			
        			jsonData = Ext.util.JSON.decode( response.responseText );
        			if(jsonData.data[0].msg == undefined || jsonData.data[0].msg == ""){
        				store.setData(jsonData.data);
        			}
        			
        		},
        		failure: function(form, action) {
        			alert("오류가 발생하였습니다.");
        		}
        	});
			
			/*var serviceParam = {
		    		service: "WFS",
		    		//service: "WMS",
		    		version: "1.1.0",
		    		request: "GetFeature",
		    		//typeName: "woo:tmdl_tmdl",
		    		typeName: "tmdl:2sido",
		    		maxFeatures: "50",
		    		outputFormat: "JSON",
		    		srs: "EPSG:4326"
		    	};
			
			//serviceParam.filter = filter;
			
			var request = OpenLayers.Request.POST({
				
				url: "http://112.217.167.123:38080/geoserver/tmdl/wms",
				params: serviceParam,
				filter: "",
			    async: false
			});
			
			var obj = JSON.parse(request.responseText);
			
			if(obj.features.length == 0 ){
				return;
			}
			
			
			var receiveData = [];
			
			Ext.each(obj.features, function(media, index) {
				
				var nameVal = media.properties.DO_NM;
				var idVal= media.properties.ADM_CD;
				
				receiveData.push({id: idVal, name: nameVal});
				
			});*/
			
			//store.setData(receiveData);
			
        }
    }
});
