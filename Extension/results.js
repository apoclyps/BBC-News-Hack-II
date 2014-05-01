chrome.extension.onMessage.addListener(function (msg, _, sendResponse) {
    //msg.data is selected text from page
	alert(msg.data);
});