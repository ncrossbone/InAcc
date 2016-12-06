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
    	width:30
    },{
    	xtype:"combo",
    	id: "cmd_doro_sigungu",
    	fieldLabel:"시군구",
    	width: 250,
    	displayField: 'name',
		valueField: 'id',
    	editable: false
    }]
});