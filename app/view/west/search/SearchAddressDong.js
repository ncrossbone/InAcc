Ext.define("InAcc.view.west.search.SearchAddressDong", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressDong",

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
    	id: "cmd_dong",
    	fieldLabel:'읍면동',
    	width: 200,
    	displayField: 'name',
		valueField: 'id',
    	editable: false,
    	listeners:{
    		select: function(){
    			var cmd_ri = Ext.getCmp("cmd_ri");
    			
    			Ext.getCmp("cmd_ri").setValue("");
    			
    			var riStore = Ext.create("InAcc.store.west.Search_Ri",{
    				layerType: '2ri'
    			});
    			riStore.load();
    			cmd_ri.setStore(riStore);
    		}
    	}
    }]
});