Ext.define("InAcc.view.west.search.SearchAddressDoroSido", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressDoroSido",
	
    layout :{
    	type:"hbox"
    },
    width: "100%",
    height: "100%",
    items:[{
    	xtype:"container",
    	width:50
    },{
    	id: 'cmd_doro_sido',
    	xtype:"combo",
    	fieldLabel: "시도",
    	store: Ext.create('InAcc.store.west.Search_Doro_Sido',{
    		layerType: '2sido'
    	}),
    	width: 200,
    	displayField: 'name',
		valueField: 'id',
    	editable: false,
    	listeners:{
    		select: function(){
    			var cmd_doro_sigungu = Ext.getCmp("cmd_doro_sigungu");
    			
    			Ext.getCmp("cmd_doro_sigungu").setValue("");
    			
    			var dorosigunguStore = Ext.create("InAcc.store.west.Search_Doro_Sigungu",{
    				layerType: '2sigungu'
    			});
    			dorosigunguStore.load();
    			cmd_doro_sigungu.setStore(dorosigunguStore);
    		}
    	}
    }]
});