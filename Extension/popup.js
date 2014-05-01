$(document).ready(function() { 
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  if(message.method == "getWord"){
  alert();
    //depending on how the word is stored you can do this in one of several ways
    // 1. If it is a global variable, we can just return it directly
	document.getElementById('output').innerHTML = "Test";
	
	//sendResponse(word);
    // 2. It needs to be retrieved asynchronously, in that case we do this
    //getWord(sendResponse);
    return true;
    // This passes the ability to reply to the function where we get the info
    // Once we have the info we can just use sendResponse(word); like before
  }
});
});