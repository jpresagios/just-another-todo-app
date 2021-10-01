sap.ui.define(
  [
    'sap/ui/test/Opa5',
    'sap/demo/todo/test/integration/arrangements/Startup',
    'sap/demo/todo/test/integration/TodoListJourney',
  ],
  function(Opa5, Startup) {
    'use strict';

    Opa5.extendConfig({
      arrangements: new Startup(),
      pollingInterval: 1,
    });
  }
);
