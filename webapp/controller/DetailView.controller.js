sap.ui.define([
    "./BaseController",
    "sap/m/MessageBox"
], (BaseController, MessageBox) => {
    "use strict";

    return BaseController.extend("app.capgeminipostb27.controller.DetailView", {
        onInit() {
            let oRouter = this.getRouter();
            oRouter.attachRoutePatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched(oEvent) {
            let index = oEvent.getParameter("arguments").path;
            let sPath = "FlightModel>/" + index;
            this.getView().bindElement(sPath);
        },

        onFlightPage() {
            this.getRouter().navTo("RouteFlightView");
        }
    });
});
