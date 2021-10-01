sap.ui.require(
  [
    'sap/ui/test/Opa5',
    'sap/ui/test/matchers/AggregationLengthEquals',
    'sap/ui/test/matchers/PropertyStrictEquals',
    'sap/ui/test/actions/EnterText',
  ],
  function(Opa5, AggregationLengthEquals, PropertyStrictEquals, EnterText) {
    'use strict';

    var sViewName = 'sap.demo.todo.view.Master';
    var sAddToItemInputId = 'addTodoItemInput';
    var sItemListId = 'todoList';

    Opa5.createPageObjects({
      onTheAppPage: {
        actions: {
          iEnterTextForNewItemAndPressEnter: function(text) {
            return this.waitFor({
              id: sAddToItemInputId,
              viewName: sViewName,
              actions: [new EnterText({ text: text })],
              errorMessage: 'The text cannot be entered',
            });
          },
        },
        assertions: {
          iShouldSeeTheItemBeingAdded: function(iItemCount, sLastAddedText) {
            return this.waitFor({
              id: sItemListId,
              viewName: sViewName,
              matchers: [
                new AggregationLengthEquals({
                  name: 'items',
                  length: iItemCount,
                }),
                function(oControl) {
                  var iLength = oControl.getItems().length;
                  var oInput = oControl
                    .getItems()
                    [iLength - 1].getContent()[0]
                    .getItems()[1]
                    .getItems()[0];
                  return new PropertyStrictEquals({
                    name: 'text',
                    value: sLastAddedText,
                  }).isMatching(oInput);
                },
              ],
              success: function() {
                Opa5.assert.ok(
                  true,
                  'The table has ' +
                    iItemCount +
                    ' item(s), with \'' +
                    sLastAddedText +
                    '\' as last item'
                );
              },
              errorMessage:
                'List does not have expected entry \'' + sLastAddedText + '\'.',
            });
          },
        },
      },
    });
  }
);
