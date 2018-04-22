var currentDialog;

function showConnectionId(id) {
  // TODO close the popup when Alexa device connects

  let m = $('<div title="Alexa Slide Show">' +
    'This is your slide show code:<br />' +
    '<h1 style="text-align: center">' + id + '</h1><br />' +
    'Use any Alexa device to control this presentation by saying:' +
    '<pre>Alexa, ask Slide Show to start slide ' + id + '</pre>' +
    '</div>');
  currentDialog = m.dialog({
    modal: true,
    buttons: {
      Ok: function() {
        $(this).dialog("close");
      }
    }
  });
}

function dismissDialog() {
  currentDialog.dialog('close');
}

function showDisconnected() {
  let m = $('<div title="Alexa Slide Show">' +
    "Oops, you've been disconnected from Alexa." +
    "Please reload the page and try connecting again." +
    '</div>');
  m.dialog({
    modal: true,
    buttons: {
      Ok: function() {
        $(this).dialog("close");
      }
    }
  });
}
