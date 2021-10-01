sap.ui.define(
  ['sap/ui/test/opaQunit', 'sap/demo/todo/test/integration/pages/App'],
  function(opaTest) {
    'use strict';

    QUnit.module('Todo List');

    opaTest('should add an item', function(Given, When, Then) {
      // Arrangements
      Given.iStartMyApp();

      //Actions
      When.onTheAppPage.iEnterTextForNewItemAndPressEnter('my test');

      // Assertions
      Then.onTheAppPage.iShouldSeeTheItemBeingAdded(3, 'my test');

      // Cleanup
      Then.iTeardownMyApp();
    });
  }
);
