sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], (BaseController) => {
    "use strict";
  
    return BaseController.extend("app.capgeminipostb27.controller.BaseController", {

        onInit() {
        },

        getRouter:function() {
            return this.getOwnerComponent().getRouter();
        }

    });
  });