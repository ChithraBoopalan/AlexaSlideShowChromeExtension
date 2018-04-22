// This didn't work and Chrome shows the error like chrome://invalid/ net::ERR_FAILED
/*
// Add the jQuery Modal CSS to the page
let jqueryModalCss = chrome.extension.getURL('lib/jquery.modal.css');

$('<link rel="stylesheet" href="' + jqueryModalCss + '" />').appendTo("head");
*/
//$('<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />').appendTo('head');

$('<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />').appendTo('head');

