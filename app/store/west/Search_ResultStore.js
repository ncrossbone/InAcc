Ext.define('InAcc.store.west.Search_ResultStore', {
	
	extend: 'Ext.data.Store',
	
	fields: ['TITLE','NAME'],

	remoteSort: true,
	
	listeners: {
		load: function(store) {
			
			var coreMap = Ext.getCmp("_mapDiv_");
			
			store.setData(coreMap.resultStore);
			
			
        }
    }
});
