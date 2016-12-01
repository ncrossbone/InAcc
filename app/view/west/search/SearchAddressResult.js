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
			columnLines: true,
			hideHeaders: false,
			title:'검색결과',
			selType: 'checkboxmodel',
		    columns:[{
		    	align:'center',
		    	dataIndex:'NAME',
		    	text:'분류',
				width: 120
		    },{
		    	align:'center',
		    	dataIndex:'TITLE',
		    	text:'명칭',
				width: 120
		    }]
		}]
    }]
});