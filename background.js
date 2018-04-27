var rule = {
  id: 'showPageAction',
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      css: ["div.reveal"]
    })
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()]
};

chrome.runtime.onInstalled.addListener(function() {
  console.log("onInstalled Listener added");
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([rule]);
    console.log("onPageChanged rules added");
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  console.log("onClicked listener triggered");
  chrome.tabs.executeScript({
    // Check if the revealjsInjected variable has been defined
    code: 'typeof revealjsInjected === "undefined"'
  }, function(results) {
    chrome.tabs.executeScript({
      code: 'console.log("Alexa Slide Show needs injection? ' + results[0] + '")'
    });

    if (results[0]) {
      // Define the revealjsInjected variable so that it can be used to
      // ensure that scripts are injected only once
      chrome.tabs.executeScript({
        code: 'var revealjsInjected = true;'
      });

      let jsFiles = [
        'lib/jquery-3.3.1.js',
        'lib/jquery-ui-1.12.1.js',
        'addcss.js',
        'ui.js',
        'revealjsctrl.js',
        'revealjsctrl.js',
        'websocket.js',
        'init.js'
      ];

      // Add all Javascript files to the page
      jsFiles.forEach(function(file) {
        chrome.tabs.executeScript({
          file: file
        });
      });

    } else {
      chrome.tabs.executeScript({
        code: 'pageActionClicked()'
      });
    }
  });
});
