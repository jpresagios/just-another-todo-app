sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/json/JSONModel",
  ],
  function(UIComponent, ResourceModel, JSONModel) {
    "use strict";
    return UIComponent.extend("sap.demo.todo.Component", {
      metadata: {
        rootView: "sap.demo.todo.view.App",
        config: {
          serviceUrl: "/service/todoitems.json",
          i18nBundle: "sap.demo.todo.i18n.i18n",
        },
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
        var mConfig = this.getMetadata().getConfig();

        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments);
        // set the internationalization model
        this.setModel(
          new ResourceModel({
            bundleName: mConfig.i18nBundle,
          }),
          "i18n"
        );

        // create the views based on the url/hash
        this.getRouter().initialize();
      },
      createContent: function() {
        var oRootView = UIComponent.prototype.createContent.apply(
          this,
          arguments
        );

        var oModel = new JSONModel(this.getMetadata().getConfig().serviceUrl);

        this.setModel(oModel);

        return oRootView;
      },
    });
  }
);
