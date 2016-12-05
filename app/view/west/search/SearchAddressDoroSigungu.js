Ext.define("InAcc.view.west.search.SearchAddressDoroSigungu", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressDoroSigungu",

    layout :{
    	type:"hbox"
    },
    width: "100%",
    height: "100%",
    items:[{
    	xtype:"container",
    	width:50
    },{
    	xtype:"combo",
    	id: "cmd_doro_sigungu",
    	fieldLabel:"시군구",
    	width: 200,
    	displayField: 'name',
		valueField: 'id',
    	width: 200,
    	editable: false
    }]
});