//click event handler for context menu onclick
function genericOnClick(info, tab) {
	var selectedText = "";
	chrome.tabs.executeScript({ code: "window.getSelection().toString();" },
								function(selection) { selectedText = selection[0] });
	/*var tabId = chrome.tabs.create({ url: "results.html" }, 
									function(tab) {
												chrome.tabs.sendMessage(tab.id, {"action": "test"})
												});*/
												
	chrome.tabs.create({
        url: "results.html"
    }, function (tab) {
        //just to make sure the tab is activated..
        chrome.tabs.onUpdated.addListener(function (tabId) {
            if (tabId == tab.id) {
                //Send Mesage
                chrome.tabs.sendMessage(tabId, {
                    "data": selectedText
                });
            }
        });
    });
}
$(document).ready(function() {
//create context menu entry
var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++) {
	var context = contexts[i];
	var title = "Do Something";
	var id = chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": genericOnClick});
}
});
//listener for shortcut key
chrome.commands.onCommand.addListener(function(command) {
	if(command === "doSelection") {
		chrome.tabs.executeScript({ code: "window.getSelection().toString();" },
									function(selection) { alert(selection[0]); });
		
		
		//GET DATA
		//SHOW DATA
  //newDiv.setAttribute("id", "dialog");
		
		//$('#dialog').show();
		
		/*chrome.runtime.sendMessage({method:"getWord"},function(response){
		  //here response will be the word you want
		  console.log(response);
		});*/
	}
});