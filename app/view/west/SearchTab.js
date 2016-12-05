Ext.define("InAcc.view.west.SearchTab", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-searchtab",
	
	requires: ["InAcc.view.west.search.SearchCondition",
			   "InAcc.view.west.search.SearchAddressSido",
			   "InAcc.view.west.search.SearchAddressDoroSido",
		       "InAcc.view.west.search.SearchAddressSigungu",
		       "InAcc.view.west.search.SearchAddressDoroSigungu",
		       "InAcc.view.west.search.SearchAddressDong",
		       "InAcc.view.west.search.SearchAddressDoro",
		       "InAcc.view.west.search.SearchAddressRi",
		       "InAcc.view.west.search.SearchAddressNum",
		       "InAcc.view.west.search.SearchAddressJibun"],
        
    width: "100%",
    height: "100%",
    title: "",
    
    layout :{
    	type:"vbox"
    },
    
    
	items:[{
		xtype: "inacc-west-search-SearchCondition",
		title:"검색조건",
		border:false
	},{
		xtype: 'container',
		height: 10,
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressSido",
		id: "SearchAddressSido",
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressDoroSido",
		id: "SearchAddressDoroSido",
		border:false,
		hidden:true
	},{
		xtype: 'container',
		height: 10,
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressSigungu",
		id: "SearchAddressSigungu",
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressDoroSigungu",
		id: "SearchAddressDoroSigungu",
		border:false,
		hidden:true
	},{
		xtype: 'container',
		height: 10,
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressDong",
		id:"SearchAddressDong",
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressDoro",
		id:"SearchAddressDoro",
		border:false,
		hidden:true
	},{
		xtype: 'container',
		height: 10,
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressRi",
		id:"SearchAddressRi",
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressNum",
		id:"SearchAddressNum",
		border:false,
		hidden:true
	},{
		xtype: 'container',
		height: 10,
		border:false
	},{
		xtype: "inacc-west-search-SearchAddressJibun",
		id:"SearchAddressJibun",
		border:false
	},{
		xtype: 'container',
		height: 10,
		border:false
	},{
		xtype:'button',
		style:'margin-left:120px;',
		width:60,
		text:'검색',
		handler: function() {
			
			
			
			var addressRadio = Ext.getCmp("addressRadio");
			//addressRadio.lastValue
			
			//검색된 레이어 reset
			ResetLayer();
			
			//라디오 버튼 (시도검색//도로검색)
			var addressRadio = Ext.getCmp("addressRadio");
			
			
			//검색결과 param 분기 
			if(addressRadio.lastValue.rb == "Pnu"){
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
				
				SearchResult("Pnu");
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
				SearchResult("Doro");
				
			}
			
			
		}
	}/*,{
		xtype:'button',
		style:'margin-left:120px;',
		width:60,
		text:'layer확인',
		handler: function() {
			var coreMap = Ext.getCmp("_mapDiv_");
			console.info(coreMap.map.layers);
		}
	},{
		xtype:'button',
		style:'margin-left:120px;',
		width:60,
		text:'초기화',
		handler: function() {
			ResetLayer();
		}
	}*/,{
		xtype: 'container',
		height: 10,
		border:false
	}]
});