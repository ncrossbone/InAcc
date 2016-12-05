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
			plugins: ['gridfilters'],
			title:'검색결과',
			columns:[{
		    	align:'center',
		    	dataIndex:'TITLE',
		    	text:'분류',
				width: 120
		    },{
		    	align:'center',
		    	dataIndex:'NAME',
		    	text:'명칭',
				width: 120
		    }]
		}]
    }]
});