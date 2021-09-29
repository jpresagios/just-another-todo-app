sap.ui.define(["sap/ui/core/UIComponent"], function(UIComponent) {
  "use strict";
  return UIComponent.extend("sap.demo.todo.Component", {
    metadata: {
      rootView: "sap.demo.todo.view.App",
      routing: {
        config: {
          routerClass: "sap.m.routing.Router",
          viewType: "XML",
          viewPath: "sap.demo.todo.view",
          controlId: "app",
          controlAggregation: "pages",
          transition: "slide",
        },
        routes: [
          {
            pattern: "",
            name: "master",
            target: "master",
          },
        ],

        targets: {
          master: {
            viewName: "Master",
            viewLevel: 1,
          },
        },
      },
    },
    init: function() {
      // call the base component's init function
      UIComponent.prototype.init.apply(this, arguments);

      // create the views based on the url/hash
      this.getRouter().initialize();
    },
    createContent: function() {
      var oRootView = UIComponent.prototype.createContent.apply(
        this,
        arguments
      );

      return oRootView;
    },
  });
});
