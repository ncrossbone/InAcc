Ext.define("InAcc.view.west.search.SearchAddressSigungu", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressSigungu",

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
    	id: "cmd_sigungu",
    	fieldLabel:"시군구",
    	width: 250,
    	displayField: 'name',
		valueField: 'id',
    	editable: false,
    	listeners:{
    		select: function(){
    			var cmd_dong = Ext.getCmp("cmd_dong");
    			
    			Ext.getCmp("cmd_dong").setValue("");
    			Ext.getCmp("cmd_ri").setValue("");
    			
    			var dongStore = Ext.create("InAcc.store.west.Search_Dong",{
    				layerType: '2um'
    			});
    			dongStore.load();
    			cmd_dong.setStore(dongStore);
    		}
    	}
    }]
});