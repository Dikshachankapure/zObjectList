sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/ui/model/Filter",
	"sap/m/MessageToast"
], function (Controller, MessageBox, History, JSONModel, Fragment, Filter, MessageToast) {
	"use strict";

	return Controller.extend("objectList.zobjectList.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf objectList.zobjectList.view.View2
		 */
		onInit: function () {
			this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this._oRouter.getRoute("page2").attachPatternMatched(this.onEditMatched, this);

		},
		getRouter: function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		Gotopage1: function () {
			this.getRouter().navTo("View1", {}, true);

			var that = this;
			that.OnClear();
		},

		onEditMatched: function (oEvent) {
			var oParameters = oEvent.getParameters();

			var oModelData = this.getOwnerComponent().getModel("CustomerSet");
			this.getView().setModel(oModelData);

			var oModel = this.getView().getModel();

			var customerID = this.getView().byId("custid");
			var companyName = this.getView().byId("cname");
			var contactName = this.getView().byId("CtName");
			var contactTitle = this.getView().byId("cttitle");
			var address = this.getView().byId("addr");
			var city = this.getView().byId("city1");
			var country = this.getView().byId("cntry");
			var phone = this.getView().byId("mb1");

			if (oParameters.arguments.CustomerID !== "" || oParameters.arguments.CustomerID !== null) {
				this.CustomerID = oParameters.arguments.CustomerID;

				if (oModel.getData().Customers.length > 0) {
					for (var i = 0; i < oModel.getData().Customers.length; i++) {
						if (oModel.getData().Customers[i].CustomerID.toString() === this.CustomerID) {

							customerID.setValue(this.CustomerID);
							companyName.setValue(oModel.getData().Customers[i].CompanyName);
							contactName.setValue(oModel.getData().Customers[i].ContactName);
							contactTitle.setValue(oModel.getData().Customers[i].ContactTitle);
							address.setValue(oModel.getData().Customers[i].Address);
							city.setValue(oModel.getData().Customers[i].City);
							country.setValue(oModel.getData().Customers[i].Country);
							phone.setValue(oModel.getData().Customers[i].Phone);
							return false;

						}
					}
				}

			} else {
				MessageBox.error("Data Not available");
			}

		},

		OnSave: function () {
			var that = this;
			var customerID = this.getView().byId("custid");
			if (customerID.getValue() === "0") {
				that._OnSaveData();
			} else {
				that._OnUpdateData();
			}
		},

		_OnSaveData: function () {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			var customerID = this.getView().byId("custid");
			var companyName = this.getView().byId("cname");
			var contactName = this.getView().byId("CtName");
			var contactTitle = this.getView().byId("cttitle");
			var address = this.getView().byId("addr");
			var city = this.getView().byId("city1");
			var country = this.getView().byId("cntry");
			var phone = this.getView().byId("mb1");

			if (customerID.getValue() === "") {
				MessageToast.show("Name is required");
			} else {

				var oModelData = this.getOwnerComponent().getModel("CustomerSet");
				this.getView().setModel(oModelData);

				var oModel = this.getView().getModel();

				var custNumber = oModel.getProperty("/Customers").length;
				var newCustId = custNumber + 1;

				var oNewEntry = {};
				oNewEntry = {
					CustomerID: newCustId,
					CompanyName: companyName.getValue(),
					ContactName: contactName.getValue(),
					ContactTitle: contactTitle.getValue(),
					Address: address.getValue(),
					City: city.getValue(),
					Country: country.getSelectedKey(),
					Phone: phone.getValue(),

				};
				var oModelCustomers = oModel.getProperty("/Customers");
				oModelCustomers.push(oNewEntry);
				oModel.setProperty("/Customers", oModelCustomers);
				MessageBox.confirm("Do you want to add new data?", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (sAction) {
						if (sAction === "YES") {
							oRouter.navTo("View1");
							that.OnClear();
						}
					}
				});
			}

		},

		_OnUpdateData: function () {
			var that = this;
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			var customerID = this.getView().byId("custid");
			var companyName = this.getView().byId("cname");
			var contactName = this.getView().byId("CtName");
			var contactTitle = this.getView().byId("cttitle");
			var address = this.getView().byId("addr");
			var city = this.getView().byId("city1");
			var country = this.getView().byId("cntry");
			var phone = this.getView().byId("mb1");

			if (customerID.getValue() === "") {
				MessageToast.show("Name is required");
			} else {
				var oModelEmp = this.getOwnerComponent().getModel("CustomerSet");
				this.getView().setModel(oModelEmp);

				var oModel = this.getView().getModel();
				var oModelEmpLength = oModel.getProperty("/Customers");
				for (var i = 0; i < oModel.getData().Customers.length; i++) {
					if (oModel.getData().Customers[i].CustomerID.toString() === customerID.getValue()) {
						oModel.getData().Customers[i].CompanyName = companyName.getValue();
						oModel.getData().Customers[i].ContactName = contactName.getValue();
						oModel.getData().Customers[i].ContactTitle = contactTitle.getValue();
						oModel.getData().Customers[i].Address = address.getValue();
						oModel.getData().Customers[i].City = city.getValue();
						oModel.getData().Customers[i].Country = country.getSelectedKey();
						oModel.getData().Customers[i].Phone = phone.getValue();
					} else {
						oModel.getData().Customers[i].CustomerID = oModel.getData().Customers[i].CustomerID;
						oModel.getData().Customers[i].CompanyName = oModel.getData().Customers[i].CompanyName;
						oModel.getData().Customers[i].ContactName = oModel.getData().Customers[i].ContactName;
						oModel.getData().Customers[i].ContactTitle = oModel.getData().Customers[i].ContactTitle;
						oModel.getData().Customers[i].Address = oModel.getData().Customers[i].Address;
						oModel.getData().Customers[i].City = oModel.getData().Customers[i].City;
						oModel.getData().Customers[i].Country = oModel.getData().Customers[i].Country;
						oModel.getData().Customers[i].Phone = oModel.getData().Customers[i].Phone;

					}
				}
				oModel.setProperty("/Customers", oModelEmpLength);
				MessageBox.confirm("Do you want to Update ", {
					icon: sap.m.MessageBox.Icon.INFORMATION,
					title: "Confirm",
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function (sAction) {
						if (sAction === "YES") {
							oRouter.navTo("View1");
							that.OnClear();
						}
					}
				});
			}
		},

		OnClear: function () {
			var customerID = this.getView().byId("custid");
			var companyName = this.getView().byId("cname");
			var contactName = this.getView().byId("CtName");
			var contactTitle = this.getView().byId("cttitle");
			var address = this.getView().byId("addr");
			var city = this.getView().byId("city1");
			var country = this.getView().byId("cntry");
			var phone = this.getView().byId("mb1");

			customerID.setValue("0");
			companyName.setValue("");
			contactName.setValue("");
			contactTitle.setValue("");
			address.setValue("");
			city.setValue("");
			country.setValue("");
			phone.setValue("");
		},
		
			_handleValueHelpEmpName: function (oEvent) {

 			var oModelEmpName = this.getOwnerComponent().getModel("CompanyNameSet");
 			this.getView().setModel(oModelEmpName);

 			var sInputValueEmpName = oEvent.getSource().getValue();

 			this.inputEmpNameId = oEvent.getSource().getId();
 			// create value help dialog
 			if (!this._valueHelpDialogEmpName) {
 				this._valueHelpDialogEmpName = sap.ui.xmlfragment(
 					"objectList.zobjectList.fragments.cust",      //id.fragments.file.name ---take id from manifest.json
 					this
 				);
 				this.getView().addDependent(this._valueHelpDialogEmpName);
 			}

 			// create a filter for the binding

 			this._valueHelpDialogEmpName.getBinding("items").filter([new sap.ui.model.Filter(
 				"CompanyName",
 				sap.ui.model.FilterOperator.Contains, sInputValueEmpName
 			)]);

 			// open value help dialog filtered by the input value
 			this._valueHelpDialogEmpName.open(sInputValueEmpName);
 		},
 		_handleValueHelpSearchEmpName: function (evt) {
			var sValueEmpName = evt.getParameter("value");
			var oFilter = new sap.ui.model.Filter(
				"CompanyName",
				sap.ui.model.FilterOperator.Contains, sValueEmpName
			);
			evt.getSource().getBinding("items").filter([oFilter]);
		},

		_handleValueHelpCloseEmpName: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");

			if (oSelectedItem) {
				var EmpNameInput = this.getView().byId(this.inputEmpNameId);
				EmpNameInput.setValue(oSelectedItem.getTitle());
			}
			evt.getSource().getBinding("items").filter([]);
		}


		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf objectList.zobjectList.view.View2
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf objectList.zobjectList.view.View2
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf objectList.zobjectList.view.View2
		 */
		//	onExit: function() {
		//
		//	}

	});

});