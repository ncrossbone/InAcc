Ext.define("InAcc.view.west.search.SearchAddressResult", {
	
	extend: "Ext.panel.Panel",
	
	xtype: "inacc-west-search-SearchAddressResult",
	

    layout :{
    	type:"vbox"
    },
    width: "100%",
    height: "100%",
    items:[{
    	xtype:"container",
    	width: '100%',
		height: '100%',
		items:[{
			xtype: 'grid',
			id: 'resultGrid',
			selType: 'checkboxmodel',
			plugins: ['gridfilters'],
			title:'검색결과',
			columns:[{
		    	align:'center',
		    	dataIndex:'TITLE',
		    	text:'분류',
				width: 145
		    },{
		    	align:'center',
		    	dataIndex:'NAME',
		    	text:'명칭',
				width: 145
		    },{
		    	align:'center',
		    	dataIndex:'LAYER',
		    	text:'레이어명칭',
		    	hidden: true
		    }],
		    listeners: {
		    	 deselect: function(model, record, index) {
		    		 var coreMap = Ext.getCmp("_mapDiv_");
		    		 for(var i = 0 ; i < coreMap.map.layers.length  ; i++){
		    			 if(coreMap.map.layers[i].name == record.data.LAYER){
		    				 coreMap.map.layers[i].setVisibility(false);
		    			 }
		    		 }
		             
		         },
		         select: function(model, record, index) {
		    		 var coreMap = Ext.getCmp("_mapDiv_");
		    		 for(var i = 0 ; i < coreMap.map.layers.length  ; i++){
		    			 if(coreMap.map.layers[i].name == record.data.LAYER){
		    				 coreMap.map.layers[i].setVisibility(true);
		    			 }
		    		 }
		        	 
		         }
		    },
		    viewConfig:{
		    	listeners:{
		    		beforerefresh: function(view){
		    			var store = view.getStore();
		    			var model = view.getSelectionModel();
		    			var s = [];
		    			store.queryBy(function(record) {
	        				s.push(record);
	        			});
		    			model.select(s);
		    		}
		    	}
		    }
		}]
    }]
});