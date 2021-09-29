sap.ui.define(
  [
    "sap/ui/Device",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
  ],
  function(Device, Controller, Filter, FilterOperator, JSONModel) {
    "use strict";

    return Controller.extend("sap.ui.demo.todo.controller.App", {
      onInit: function() {
        this.aSearchFilters = [];
        this.aTabFilters = [];

        this.getView().setModel(
          new JSONModel({
            filterText: undefined,
          }),
          "view"
        );
      },

      addTodo: function() {
        var oModel = this.getView().getModel();
        var aTodos = oModel.getProperty("/todos").map(function(oTodo) {
          return Object.assign({}, oTodo);
        });

        // Why not ...
        // oModel.getProperty("/todos").push(...)

        aTodos.push({
          title: oModel.getProperty("/newTodo"),
          completed: false,
        });

        oModel.setProperty("/todos", aTodos);
        oModel.setProperty("/newTodo", "");
      },

      clearCompleted: function() {
        var oModel = this.getView().getModel();
        var aTodos = oModel.getProperty("/todos").map(function(oTodo) {
          return Object.assign({}, oTodo);
        });

        var i = aTodos.length;
        while (i--) {
          var oTodo = aTodos[i];
          if (oTodo.completed) {
            aTodos.splice(i, 1);
          }
        }

        oModel.setProperty("/todos", aTodos);
      },

      /**
		 * Updates the number of items not yet completed
		 */
      updateItemsLeftCount: function() {
        var oModel = this.getView().getModel();
        var aTodos = oModel.getProperty("/todos") || [];

        var iItemsLeft = aTodos.filter(function(oTodo) {
          return oTodo.completed !== true;
        }).length;

        oModel.setProperty("/itemsLeftCount", iItemsLeft);
      },
    });
  }
);
