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
    	width:30
    },{
    	id: 'cmd_sido',
    	xtype:"combo",
    	fieldLabel: "시도",
    	store: Ext.create('InAcc.store.west.Search_Sido',{
    		layerType: '2sido'
    	}),
    	width: 250,
    	displayField: 'name',
		valueField: 'id',
    	editable: false,
    	listeners:{
    		select: function(){
    			var cmd_sigungu = Ext.getCmp("cmd_sigungu");
    			
    			
    			Ext.getCmp("cmd_sigungu").setValue("");
    			Ext.getCmp("cmd_dong").setValue("");
    			Ext.getCmp("cmd_ri").setValue("");
    			
    			
    			
    			var sigunguStore = Ext.create("InAcc.store.west.Search_Sigungu",{
    				layerType: '2sigungu'
    			});
    			sigunguStore.load();
    			cmd_sigungu.setStore(sigunguStore);
    		}
    	}
    }]
});