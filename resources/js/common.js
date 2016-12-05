SearchResult = function(searchType){
	
	SearchDataCheck(searchType);
	
	var resultStore = "";
	
	if(searchType == "Pnu"){//지번
		resultStore = Ext.create("InAcc.store.west.Search_PnuCode");
	}else{//도로명
		resultStore = Ext.create("InAcc.store.west.Search_DoroCode");
	}
	
	resultStore.load();
	
	var searchAddressResult = Ext.getCmp("SearchAddressResult");
	searchAddressResult.setVisible(true);
	
	var resultSet = [];
	var timerCnt = 0;
	var timerId = window.setInterval(function(){
		if(resultStore.data.items.length > 0){
				
				window.clearInterval(timerId);
				
				
				var coreMap = Ext.getCmp("_mapDiv_");
				
				//검색결과에 전역변수 store 초기화
				coreMap.resultStore= [];
				
				var tmUnitCd = resultStore.data.items[0].data.TM_UNIT_CD; //단위유역
				var tmSunitCd = resultStore.data.items[0].data.TM_SUNIT_CD;	//특대유역
				var miaCd = resultStore.data.items[0].data.MIA_CD;	//중권역
				var envrnBsisFcltyCd = resultStore.data.items[0].data.ENVRN_BSIS_FCLTY_CD; //환경기초시설
				var excrsPrcpltCd = resultStore.data.items[0].data.EXCRS_PRCPLT_CD;	//분노처리장
				
				
				
				//단위유역
				if(tmUnitCd.substr(0,1) != "-"){
					coreMap.resultStore.push({TITLE:"단위유역", NAME:resultStore.data.items[0].data.TM_UNIT_NM}); //데이터가 있을시 전역변수 벼열 설정
					if(tmUnitCd.substr(0,1) == "J"){//진위천
						AddLayer(tmUnitCd,"jinAdan","TM_UNIT_CD");
					}else if(tmUnitCd.substr(0,1) == "H"){ //한강
						AddLayer(tmUnitCd,"9hangang","TM_UNIT_CD");
						//TmUnitLayer(tmUnitCd,"9hangang");
					}else if(tmUnitCd.substr(0,1) == "N"){ //낙동강
						AddLayer(tmUnitCd,"12nak","TM_UNIT_CD");
					}else if(tmUnitCd.substr(0,1) == "D" || tmUnitCd.substr(0,1) == "K" || tmUnitCd.substr(0,1) == "M"){ //금강
						AddLayer(tmUnitCd,"10km","TM_UNIT_CD");
					}else if(tmUnitCd.substr(0,1) == "S" || tmUnitCd.substr(0,1) == "T" || tmUnitCd.substr(0,1) == "Y"){ //영산강
						AddLayer(tmUnitCd,"11yeoung","TM_UNIT_CD");
					}	
				}
				
				
				
//				AddLayer("cd","layerName","colName");
				
				//특대단위 유역
				if(tmSunitCd.substr(0,1) != "-"){
					//coreMap.resultStore.push({TITLE:"특대단위", NAME:resultStore.data.items[0].data.TM_SUNIT_NM});  //데이터가 있을시 전역변수 벼열 설정
					if(tmSunitCd.substr(0,1) == "H"){//
						AddLayer(tmSunitCd,"tkdaeyuyeok","TM_SNIT_CD");
					}else if(tmUnitCd.substr(0,1) == "K"){ //
						AddLayer(tmSunitCd,"kktkdaeyuyeok","TM_SNIT_CD");
					}	
				}
				
				//중권역
				if(miaCd.substr(0,1) != "-"){
					coreMap.resultStore.push({TITLE:"중권역", NAME:resultStore.data.items[0].data.MIA_NM});  //데이터가 있을시 전역변수 벼열 설정
					AddLayer(miaCd,"3jong","MW_CODE")
//					MiaLayer(miaCd,"3jong");
				}
				
				
				//환경기초시설
				if(envrnBsisFcltyCd.substr(0,1) != "-"){
					coreMap.resultStore.push({TITLE:"환경기초시설", NAME:resultStore.data.items[0].data.ENVRN_BSIS_FCLTY_NM});  //데이터가 있을시 전역변수 벼열 설정
					AddLayer(envrnBsisFcltyCd,"17merge","EN_BSIS_CD");
//					EnvrnBsisFcltyLayer(envrnBsisFcltyCd,"17merge");
				}
				
				
				//분뇨처리장
				if(excrsPrcpltCd.substr(0,1) != "-"){
					coreMap.resultStore.push({TITLE:"분뇨처리시설", NAME:resultStore.data.items[0].data.EXCRS_PRCPLT_NM});  //데이터가 있을시 전역변수 벼열 설정
					AddLayer(excrsPrcpltCd,"17boon","EN_BSIS_CD");
				}
				
				//SigunguCenter(resultStore.data.items[0].data.SIGUNGU_CD,"2sigungu");
				
				Center(resultStore.data.items[0].data.SIGUNGU_CD,"2sigungu");
				
				
				//검색결과 데이터 붙이기
				var resultSetStore = Ext.create("InAcc.store.west.Search_ResultStore");
				resultSetStore.load();
				
				//검색결과 그리드 setStore
				var resultGrid = Ext.getCmp("resultGrid");
				resultGrid.setStore(resultSetStore);
				
				
				
				
				
			}else{
				
				timerCnt++;
				
				if(timerCnt > 5){
					alert("데이터가 없습니다");
					window.clearInterval(timerId);
				}
			}
		}, 1000);
	
	
	
}


Center = function(sigungu_cd,layerName){
	
	
	var filter = '<Filter xmlns:ogc="http://www.opengis.net/ogc">';
	filter += '<PropertyIsLike escapeChar="!" wildCard="*" singleChar="#">';
	filter += '<PropertyName>ADM_CD</PropertyName><Literal>';
	filter += sigungu_cd+'*';
	filter += '</Literal></PropertyIsLike></Filter>';
	
	var serviceParam = {
    		service: "WFS",
    		//service: "WMS",
    		version: "1.1.0",
    		request: "GetFeature",
    		//typeName: "woo:tmdl_tmdl",
    		typeName: "tmdl:"+layerName,
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
	
	
	var arrCoord = obj.features[0].geometry.coordinates[0];
	var arrCoord2 = arrCoord[0];
	
	
	
	var arrX = arrCoord2.map(function(obj){
		return obj[0];
	});
	
	var minX = Math.min.apply(null, arrX);
	var maxX = Math.max.apply(null, arrX);
	
	var arrY = arrCoord2.map(function(obj){
		return obj[1];
	});
	
	var minY = Math.min.apply(null, arrY);
	var maxY = Math.max.apply(null, arrY);
	
	var x = minX + ((maxX - minX) / 2);
	var y = minY + ((maxY - minY) / 2);
	
	var minCoord = new OpenLayers.LonLat(minX, minY).transform(Ext.getCmp("_mapDiv_").map.displayProjection, Ext.getCmp("_mapDiv_").map.projection);
	var maxCoord = new OpenLayers.LonLat(maxX, maxY).transform(Ext.getCmp("_mapDiv_").map.displayProjection, Ext.getCmp("_mapDiv_").map.projection);
	Ext.getCmp("_mapDiv_").map.zoomToExtent(new OpenLayers.Bounds(minX, minY, maxX, maxY).transform(Ext.getCmp("_mapDiv_").map.displayProjection, Ext.getCmp("_mapDiv_").map.projection));
	
	return;
	
	var vectors = new OpenLayers.Layer.Vector("vector", {isBaseLayer: false});
	var feature = new OpenLayers.Feature.Vector("tet", obj.features[0].geometry);
	vectors.addFeatures([feature]);
	
	vectors.events.register("featureselected", vectors, function(evt){
		
		Ext.getCmp("_mapDiv_").map.zoomToExtent(evt.feature.geometry.getBounds(), closest=true);
	});
	
	var control = new OpenLayers.Control.SelectFeature(vectors);

	Ext.getCmp("_mapDiv_").map.addControl(control);

	control.activate();
	
	return;
	var coreMap = Ext.getCmp("_mapDiv_");
	//coreMap.map.zoomToExtent(vectors.getDataExtent());
	if(obj.features.length == 0 ){
		return;
	}
	
}

AddLayer = function(code,layerName,colName){
var coreMap = Ext.getCmp("_mapDiv_");
	
	var Layer = new OpenLayers.Layer.WMS("sch_"+layerName, "http://112.217.167.123:38080/geoserver/tmdl/wms",
			{
		"LAYERS": layerName,
		//style : {strokeColor:'#ff0000'},
		transparent: true,
		format: 'image/png'
			},         
			{
				singleTile: false,
				visibility : false,
				legend: true,
				ratio: 1, 
				//isBaseLayer: true,
				yx : {'EPSG:4326' : true}
			} 
	);
	
	Layer.mergeNewParams({cql_filter: ""+colName+" = '"+code+"'"});
	coreMap.map.addLayers([Layer]);
	
	Layer.setVisibility(true);
}



ResetLayer = function(){
	var coreMap = Ext.getCmp("_mapDiv_");
	
	var resultGrid = Ext.getCmp("resultGrid");
	resultGrid.getStore().removeAll();
	resultGrid.getStore().sync();
	
	for(var i = 0; i < coreMap.map.layers.length ; i++){
		if(coreMap.map.layers[i].name.substr(0,3) == "sch"){
			coreMap.map.removeLayer(coreMap.map.layers[i]);
			i--;
		}
	}
	
}


SearchDataCheck = function(searchType){
	
	if(searchType == "Pnu"){
		if(Ext.getCmp("cmd_sido").value == null){
			alert("시도를 선택하세요");
			return;
		}else{
			if(Ext.getCmp("cmd_sigungu").value == null){
				alert("시군구를 선택하세요");
				return;
			}else{
				if(Ext.getCmp("cmd_dong").value == null){
					alert("읍면동을 선택하세요");
					return;
				}else{
					if(Ext.getCmp("cmd_ri").value == null){
						alert("동리를 선택하세요");
						return;
					}else{
						if(Ext.getCmp("cmd_jibun").value == ""){
							alert("지번을 입력하세요");
							return;
						}
					}
				}
			}
		}
	}else{
		
		if(Ext.getCmp("cmd_doro_sido").value == null){
			alert("시도를 선택하세요");
			return;
		}else{
			if(Ext.getCmp("cmd_doro_sigungu").value == null){
				alert("시군구를 선택하세요");
				return;
			}else{
				if(Ext.getCmp("cmd_doro").value == ""){
					alert("도로명을 입력하세요");
					return;
				}else{
					if(Ext.getCmp("cmd_doro_num").value == ""){
						alert("건물명을 입력하세요");
						return;
					}
				}
			}
		}
	}
	
	
	
	
	
	

}