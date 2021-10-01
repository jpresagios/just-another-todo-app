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

    QUnit.test("Should add a todo element to the model", function(assert) {
      // Arrange
      // initial assumption: to-do list is empty
      assert.strictEqual(
        this.oJSONModelStub.getObject("/todos").length,
        0,
        "There must be no todos defined."
      );

      // Act
      this.oJSONModelStub.setProperty("/newTodo", "new todo item");
      this.oAppController.addTodo();

      // Assumption
      assert.strictEqual(
        this.oJSONModelStub.getObject("/todos").length,
        1,
        "There is one new item."
      );
    });

    QUnit.test("Should toggle the completed items in the model", function(
      assert
    ) {
      // Arrange
      var oModelData = {
        todos: [
          {
            title: "Start this app",
            completed: false,
          },
        ],
        itemsLeftCount: 1,
      };
      this.oJSONModelStub.setData(oModelData);

      // initial assumption
      assert.strictEqual(
        this.oJSONModelStub.getObject("/todos").length,
        1,
        "There is one item."
      );
      assert.strictEqual(
        this.oJSONModelStub.getProperty("/itemsLeftCount"),
        1,
        "There is one item left."
      );

      // Act
      this.oJSONModelStub.setProperty("/todos/0/completed", true);
      this.oAppController.updateItemsLeftCount();

      // Assumption
      assert.strictEqual(
        this.oJSONModelStub.getProperty("/itemsLeftCount"),
        0,
        "There is no item left."
      );
    });
  }
);
