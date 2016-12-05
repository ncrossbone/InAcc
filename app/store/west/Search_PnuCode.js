Ext.define('InAcc.store.west.Search_PnuCode', {
	
	extend: 'Ext.data.Store',
	
	fields: ['TM_UNIT_CD'
			,'TM_UNIT_NM'
			,'TM_SUNIT_CD'
			,'TM_SUNIT_NM'
			,'MIA_CD','MIA_NM'
			,'ENVRN_BSIS_FCLTY_CD'
			,'ENVRN_BSIS_FCLTY_NM'
			,'EXCRS_PRCPLT_CD'
			,'EXCRS_PRCPLT_NM'
			,'SIGUNGU_CD'],

	remoteSort: true,
	
	listeners: {
		load: function(store) {
			
			var adm_cd = Ext.getCmp("cmd_ri").value;
			var jibun = Ext.getCmp("cmd_jibun").value;
			
			Ext.Ajax.request({
        		url: './resources/jsp/searchResult/searchPnu.jsp',
        		params: {adm_cd : adm_cd, jibun: jibun},
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
			
			/*var doName = Ext.getCmp("cmd_sido").rawValue;
			
			var filter = '<Filter xmlns:ogc="http://www.opengis.net/ogc">';
	    	filter += '<PropertyIsEqualTo>';
	    	filter += '<PropertyName>DO_NM</PropertyName><Literal>';
	    	filter += doName;
	    	filter += '</Literal></PropertyIsEqualTo></Filter>';
			
			var serviceParam = {
		    		service: "WFS",
		    		//service: "WMS",
		    		version: "1.1.0",
		    		request: "GetFeature",
		    		//typeName: "woo:tmdl_tmdl",
		    		typeName: "tmdl:2sigungu",
		    		maxFeatures: "50",
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
				
				var nameVal = media.properties.CTY_NM;
				var idVal= media.properties.ADM_CD;
				
				receiveData.push({id: idVal, name: nameVal});
				
			});
			
			store.setData(receiveData);*/
			
        }
    }
});
