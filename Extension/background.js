//create context menu entry
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
	var context = contexts[i];
	var title = "Grab stories using StoryGrab";
	var id = chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": genericOnClick});
}

//click event handler for context menu onclick
function genericOnClick(info, tab) {
	var selectedText = "";
	chrome.tabs.executeScript({ code: "window.getSelection().toString();" },
								function(selection) { selectedText = selection[0] });
								
	chrome.tabs.create({
        url: "results/results.html"
    }, function (tab) {
        chrome.tabs.onUpdated.addListener(function (tabId, changeinfo) {
            if (tabId == tab.id && changeinfo.status == 'complete') {
                chrome.tabs.sendMessage(tabId, {
                    "data": selectedText
                });
            }
        });
    });
}

//listener for shortcut key
chrome.commands.onCommand.addListener(function(command) {
	var selectedText = "";
	chrome.tabs.executeScript({ code: "window.getSelection().toString();" },
								function(selection) { selectedText = selection[0] });
								
	chrome.tabs.create({
        url: "results/results.html"
    }, function (tab) {
        chrome.tabs.onUpdated.addListener(function (tabId, changeinfo) {
            if (tabId == tab.id && changeinfo.status == 'complete') {
                chrome.tabs.sendMessage(tabId, {
                    "data": selectedText
                });
            }
        });
    });
});