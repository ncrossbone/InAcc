Ext.define("InAcc.view.west.search.SearchCondition", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchCondition",

    layout :{
    	type:"vbox"
    },
    width: "100%",
    height: "100%",
	items:[{
		xtype:"radiogroup",
		id: "addressRadio",
		vertical:true,
		style: "margin-top: 4px; margin-left: 70px;",
		listeners:{
			change:{
				fn:function(field,newValue,oldValue,options){
					//var rb = newValue.rb;
					
					
					
					var searchAddress = [];
					searchAddress[0] = Ext.getCmp("SearchAddressSido");
					searchAddress[1] = Ext.getCmp("SearchAddressSigungu");
					searchAddress[2] = Ext.getCmp("SearchAddressDong");
					searchAddress[3] = Ext.getCmp("SearchAddressRi");
					searchAddress[4] = Ext.getCmp("SearchAddressJibun");
					
					var searchDoroAddres = [];
					searchDoroAddres[0] = Ext.getCmp("SearchAddressDoroSido");
					searchDoroAddres[1] = Ext.getCmp("SearchAddressDoroSigungu");
					searchDoroAddres[2] = Ext.getCmp("SearchAddressDoro");
					searchDoroAddres[3] = Ext.getCmp("SearchAddressNum");
					
					if(newValue.rb == "Doro"){
						for(var i = 0; i < searchAddress.length; i++){
							searchAddress[i].setVisible(false);
						}
						for(var i = 0; i < searchDoroAddres.length; i++){
							searchDoroAddres[i].setVisible(true);
						}
					}else{
						for(var i = 0; i < searchAddress.length; i++){
							searchAddress[i].setVisible(true);
						}
						for(var i = 0; i < searchDoroAddres.length; i++){
							searchDoroAddres[i].setVisible(false);
						}
					}
				}
			}
		},
		items:[{
			boxLabel: '지번', 
			name: 'rb', 
			inputValue: 'Pnu', 
			checked: true,
			width:80,
			
		},{
			xtype: "container",
			width: 10
		},{
			boxLabel: '도로명', 
			name: 'rb', 
			inputValue: 'Doro',
			width:80
		}]
	}]
});