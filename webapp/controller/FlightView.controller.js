sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], (BaseController, MessageBox) => {
    "use strict";

    return BaseController.extend("app.capgeminipostb27.controller.FlightView", {
        onInit() {
            this._getData();
        },

        onCreatePage() {
            this.getRouter().navTo("RouteCreateView");
        },

        _getData() {
            let entitySet = `/Z9190_SBOOKSet`;
            let oModel = this.getOwnerComponent().getModel();
            oModel.read(entitySet, {
                success: (oData, response) => {
                    var oModelData = new sap.ui.model.json.JSONModel(oData.results);
                    this.getView().getParent().setModel(oModelData, "FlightModel")
                }
            })
        },

        onDelete(oEvent) {
            let oContext = oEvent.getSource().getBindingContext("FlightModel").getObject();
            MessageBox.confirm("Are you sure to delete this entry?", {
                onClose: (choice) => {
                    if(choice==='OK') {
                        //call the private function here
                        this._onDeleteCall(oContext);
                    }
                }
            });
        },

        _onDeleteCall(context) {
            let caridkey = context.Carrid;
            let conidkey = context.Connid;
            let bookidkey = context.Bookid;
            var fldatekey = context.Fldate;
            fldatekey = fldatekey.replace(/-/g, "");
            let oModel = this.getOwnerComponent().getModel();
            let entity = `/Z9190_SBOOKSet(Carrid='${caridkey}',Connid='${conidkey}',Bookid='${bookidkey}',Fldate='${fldatekey}')`;
            oModel.remove(entity, {
                success: (response) => {
                    MessageBox.success("Record Deleted", {
                        onClose: function() {
                            this._getData();
                        }.bind(this)
                    })
                },
                error: (error) => {
                    MessageBox.error(error);
                }
            });
        },

        onItemSelect(oEvent) {
			//When triggered directs to the DetailView
			let oList = oEvent.getParameter("listItem");
			let sPath = oList.getBindingContextPath();
			let aParts = sPath.split("/");
			let id = aParts[aParts.length - 1];
            let oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetailView", {
                path: id
            })
		}

    });
});