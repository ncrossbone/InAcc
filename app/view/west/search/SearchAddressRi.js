Ext.define("InAcc.view.west.search.SearchAddressRi", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressRi",

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
    	fieldLabel:'동리',
    	id: "cmd_ri",
    	width: 250,
    	editable: false,
    	displayField: 'name',
		valueField: 'id',
    	editable: false
    }]
});