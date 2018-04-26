var currentDialog;

function showConnectionId(id) {
  // Convert id to words
  let digitWords = [ "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine" ];
  let idParts = id.toString().split("");
  let idPhrase = "";
  for (var i in idParts) {
    if (idPhrase != "") {
      idPhrase += " ";
    }
    idPhrase = idPhrase + digitWords[idParts[i]];
  }

  let m = $('<div title="Alexa Slide Show">' +
    'This is your slide show code:<br />' +
    '<h1 style="text-align: center">' + id + '</h1><br />' +
    'Use any Alexa device to control this presentation by saying:' +
    '<pre>Alexa, ask Slide Show to start slide <b>' + idPhrase + '</b></pre>' +
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

function showSecureConnectionNotSupported() {
  let m = $('<div title="Alexa Slide Show">' +
    "Sorry, this extension doesn't support https websites currently. This will be fixed soon. " +
    "In the meantime, please use websites with http." +
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
