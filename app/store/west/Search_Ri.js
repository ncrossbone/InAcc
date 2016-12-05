Ext.define('InAcc.store.west.Search_Ri', {
	
	extend: 'Ext.data.Store',
	
	fields: ['id', 'name'],

	remoteSort: true,
	
	listeners: {
		load: function(store) {
			
			var dongName = Ext.getCmp("cmd_dong").value;
			
			Ext.Ajax.request({
        		url: './resources/jsp/searchResult/searchRi.jsp',
        		params : {value : dongName},
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
			
			/*var dongName = Ext.getCmp("cmd_dong").rawValue;
			console.info(dongName);
			
			var filter = '<Filter xmlns:ogc="http://www.opengis.net/ogc">';
	    	filter += '<PropertyIsEqualTo>';
	    	filter += '<PropertyName>DONG_NM</PropertyName><Literal>';
	    	filter += dongName;
	    	filter += '</Literal></PropertyIsEqualTo></Filter>';
			
			var serviceParam = {
		    		service: "WFS",
		    		//service: "WMS",
		    		version: "1.1.0",
		    		request: "GetFeature",
		    		//typeName: "woo:tmdl_tmdl",
		    		typeName: "tmdl:2ri",
		    		maxFeatures: "800",
		    		outputFormat: "JSON",
		    		srs: "EPSG:4326"
		    	};
			
			serviceParam.filter = filter;
			
			var request = OpenLayers.Request.POST({
				
				url: "http://112.217.167.123:38080/geoserver/tmdl/wms",
				params: serviceParam,
				filter: "",
			    async: false
			});
			var obj = JSON.parse(request.responseText);
			console.info(obj);
			if(obj.features.length == 0 ){
				return;
			}
			
			
			var receiveData = [];
			
			Ext.each(obj.features, function(media, index) {
				
				var nameVal = media.properties.RI_NM;
				var idVal= media.properties.ADM_CD;
				
				receiveData.push({id: idVal, name: nameVal});
				
			});
			
			store.setData(receiveData);*/
			
        }
    }
});
