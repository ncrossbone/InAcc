Ext.define("InAcc.view.west.search.SearchAddressSido", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressSido",

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
    	fieldLabel: "시도",
    	width: 200,
    	editable: false
    }]
});