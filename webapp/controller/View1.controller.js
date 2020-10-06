sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("objectList.zobjectList.controller.View1", {
		onInit: function () {
				var oModel = this.getOwnerComponent().getModel("CustomerSet");
			this.getView().setModel(oModel);
		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onAdd : function(){
				this.getRouter().navTo("View2", {}, true);
		},
		
		onListItemPress : function(oEvent){
			var objCust = oEvent.getSource().getBindingContext().getObject();  
				this.getRouter().navTo("page2", {
				CustomerID: objCust.CustomerID
			});
		},
	Ondelete: function(oEvent) {
		var oList = this.byId("List123");

			var aItems = oList.getItems();
			var oModelItems = oList.getModel();
			var values = oModelItems.getData();

			var oDelete = oEvent.getSource().getBindingContext().getObject();
			if (aItems.length > 0) {
				for (var i = 0; i < values.Customers.length; i++) {
					if (values.Customers[i].CustomerID === oDelete.CustomerID) {
						//	pop this._data.Products[i] 
						values.Customers.splice(i, 1);
						oModelItems.refresh();
						break;
					}
				}

				oModelItems.setData(values);
				oList.setModel(oModelItems);
			}
}
		
	});
});