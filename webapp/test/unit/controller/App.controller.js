sap.ui.define(
  [
    "sap/ui/base/ManagedObject",
    "sap/ui/core/mvc/Controller",
    "sap/demo/todo/controller/App.controller",
    "sap/ui/model/json/JSONModel",
  ],
  function(ManagedObject, Controller, AppController, JSONModel) {
    "use strict";

    QUnit.module("Test model modification", {
      beforeEach: function() {
        this.oAppController = new AppController();
        this.oViewStub = new ManagedObject({});
        sinon.stub(Controller.prototype, "getView").returns(this.oViewStub);

        this.oJSONModelStub = new JSONModel({
          todos: [],
        });
        this.oViewStub.setModel(this.oJSONModelStub);
      },

      afterEach: function() {
        Controller.prototype.getView.restore();

        this.oViewStub.destroy();
      },
    });
  }
);
