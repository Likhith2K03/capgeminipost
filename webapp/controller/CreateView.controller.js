sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], (Controller, MessageBox) => {
    "use strict";

    return Controller.extend("app.capgeminipostb27.controller.FlightView", {
        onInit() {
            
        },

        onFlightDetailsPage() {
            this.getRouter().navTo("RouteFlightView");
        },

        onCreate() {
            // Prerequisites: PAYLOAD
            let oCarrId = this.getView().byId("idCarrId");
            let oConnId = this.getView().byId("idConnId");
            let oBookId = this.getView().byId("idBookId");
            let oFldate = this.getView().byId("idFldate");
            let oOrderDate = this.getView().byId("idOrderDate");

            let sCarrId = oCarrId.getValue();
            let sConnId = oConnId.getValue();
            let sBookId = oBookId.getValue();
            let sFldate = oFldate.getValue();
            let sOrderDate = oOrderDate.getValue();

            // PAYLOAD Object
            let payload = {
                "Carrid" : sCarrId,
                "Connid" : sConnId,
                "Bookid" : sBookId,
                "Fldate" : sFldate,
                "OrderDate" : sOrderDate
            }

            // Step1: Get the Model
            let oModel = this.getOwnerComponent().getModel();
            
            // Step2: Get the path and assign it to entity
            let entitySet = "/Z9190_SBOOKSet";

            // Step3: Call the method(entity, payload, callback func(success, error))
            oModel.create(entitySet, payload, {
                success: (response) => {
                    MessageBox.success("Record Inserted.", {
                        onClose : () => {
                            this.getOwnerComponent().getRouter().navTo("RouteFlightView");
                        }
                    });
                },
                error: (error) => {
                    MessageBox.error("Failed to insert the record");
                }
            });

        }
    });
});