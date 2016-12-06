Ext.define("InAcc.view.west.WestContainer", {
	
	extend: "Ext.TabPanel",
	
	xtype: "inacc-westcontainer",
	
	requires: ["InAcc.view.west.LayerTab",
	           "InAcc.view.west.SearchTab",
	           "InAcc.view.west.search.SearchAddressResult"],
	
	tabBarPosition: 'top',
	
    defaults: {
        styleHtmlContent: true
    },
    collapsible: true,
    collapseDirection: 'left',
    width: 320,
    tabBar: {
        items: [{
        	xtype:"container",
        	width:145
        },{
            xtype: 'button',
            text: '초기화',
            handler:function(){
            	window.location.reload();
            }
        }]
    },
    items: [{
    	title: '주제도',
    	
    	//iconCls: 'home',
    	//html: 'Home Screen'
    	items: [{
    		xtype: "inacc-layertab"
    	}]
    },{
    	title: '검색',
    	items: [{
    		xtype: "inacc-searchtab"
    	},{
    		xtype:"container",
    		height:150
    	},{
    		xtype:"inacc-west-search-SearchAddressResult",
    		id:"SearchAddressResult",
    		hidden:true
    	}]
    }],
    
    initComponent: function(){
    	
    	this.callParent();
    	
    	this.setHeight(Ext.getBody().getHeight());
    }
});