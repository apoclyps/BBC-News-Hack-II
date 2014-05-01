function find_proper_nouns() {
	var re = /.[A-Z][a-z]*([\s][A-Z][a-z]*)*/;

	var textNodes = $('p').contents().filter(function() { return this.nodeType === 3 });
	textNodes.each(function() {
	  var content = $(this).text();
	  var term = content.match(re);
	  content = content.replace(re, "<span class='highlight'> " + term + "</span>");
	  $(this).replaceWith(content);
	});
}

function highlight_words(word, element) {
    if(word) {
        var textNodes;
        word = word.replace(/\W/g, '');
        var str = word.split(" ");
        $(str).each(function() {
            var term = this;
            var textNodes = $(element).contents().filter(function() { return this.nodeType === 3 });
            textNodes.each(function() {
              var content = $(this).text();
              var regex = new RegExp(term, "gi");
              content = content.replace(regex, 'Castle Greyskull');
              $(this).replaceWith(content);
            });
        });
    }
}