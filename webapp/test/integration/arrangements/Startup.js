sap.ui.define(['sap/ui/test/Opa5'], function(Opa5) {
  'use strict';

  return Opa5.extend('sap.demo.todo.test.integration.arrangements.Startup', {
    iStartMyApp: function() {
      this.iStartMyUIComponent({
        componentConfig: {
          name: 'sap.demo.todo',
          async: true,
          manifest: true,
        },
      });
    },
  });
});
