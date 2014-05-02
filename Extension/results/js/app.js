App = Ember.Application.create();

chrome.extension.onMessage.addListener(function (msg, _, sendResponse) {
    //msg.data is selected text from page
    var controller = App.__container__.lookup("controller:index");
    var boundSend = controller.send.bind(controller);
    boundSend('goMain', msg.data);
});

App.Router.map(function () {
    this.route('main');
});


App.IndexController = Ember.ObjectController.extend({
    actions: {
        goMain: function(searchTerm) {
            this.transitionToRoute('main');
            App.set('searchTerm', searchTerm);
        }
    }
});

App.MainRoute = Ember.Route.extend({
    model: function () {
//         var self = this;
// 		var formData = {
// 		    text: App.get('searchTerm'),
// 			confidence: 0.2,
// 			support: 20
// 		};
//
// 		return $.ajax({
//             type: 'POST',
//             url: "http://spotlight.dbpedia.org/rest/annotate",
// 			data: formData,
//             crossDomain: true,
//             cache: true
//         }).then(function(data) {
// 			var entities = getEntitites(data);

		    return $.ajax({
				type: 'GET',
				url: bbcAPI + encodeURIComponent('"' + App.get('searchTerm').replace('\s', ' AND ')),
				cache: true,
				contentType: "application/json",
				dataType: 'json',
				crossDomain: true
			}).then(function(data) {
				var modelArray = extract(data);
				modelArray.searchTerm = App.get('searchTerm');
                // modelArray.forEach(function (article) {
//                     map( article, entities );
//                 });

				return modelArray;
			});
// 		});
	}
});

// App.MainController = Ember.ArrayController.extend({
//     articles: (function () {
// 		return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
// 			sortProperties: ['keywordCount'],
// 			sortAscending: false,
// 			content: this.get('content')
// 		});
// 	} ).property('content')
// });

var bbcAPI = "http://data.bbc.co.uk/bbcrd-juicer/articles.json?apikey=Qc2qPD1jlgl8Yz9hCokogAToVQ5iOeV8&text=";

function extract(articlesJSON){
    var newArticles = [];
    articlesJSON.articles.forEach(function (article, index) {
        var pubDate = new Date(article.published);
        var newArticle = {}
        newArticle.title = article.title;
        newArticle.published = pubDate.toString();
        newArticle.description = article.description;
        newArticle.url = article.url;
        newArticle.source = article.source;


        if (article.image) {
            newArticle.image = article.image.src;
        }

        newArticles.push(newArticle);
    });
   return newArticles;
}


function getEntitites(data) {
	var $xml = $( data );
	var entities=[];

	$xml.find('Resource').each(function() {
	    entities.push($(this).attr('surfaceForm'));
	});

	return entities;
}


function map(article,entities){
				var articleWords = getArticleRanking(article);
				article.keywordCount = getArticleRelevanceScore(articleWords,entities);
			}

			function getArticleRelevanceScore(articleWords,entities){
				var overallRelevance = 0;

				entities.forEach(function (word, wordIndex){
					console.log(word);
					articleWords.forEach(function (match, matchIndex){
						console.log(match);
						if(word.toLowerCase()==match.key.toLowerCase()){
							overallRelevance++;
						}
					});
				});
				return overallRelevance;
			}

			function getArticleRanking(article)
			{
				var data = extractArticleDescriptions(article);
				var wordsArray = splitArticleWords(data);
				var results = sort(wordsArray);
				display(results);

				return results;
			}

			function extractArticleDescriptions(article) {
			    var descriptionList = [];
			    var word = article.description.toLowerCase().replace(/[^a-zA-Z0-9]/g, ' ');
			    descriptionList.push(word)
			    return descriptionList;
			}

			function splitArticleWords(data) {
			    var articleWords = [];

			    var arr = [];
			    arr = data[0].split(" ");

			    arr.forEach(function (word, wIndex) {
			        if (word.length >= 4) {
			            articleWords.push(word);
			        }
			    });
			    return articleWords;
			}

			function splitWords() {
			    var articleWords = [];
			    data.forEach(function (description, dIndex) {
			        var arr = [];
			        arr = description.split(" ");
			        arr.forEach(function (word, wIndex) {
			            if (word.length >= 4) {
			                articleWords.push(word);
			            }
			        });
			    });
			    return articleWords;
			}

			function sort(wordsArray) {
			    var result = mapreduce(wordsArray, function (item, emit) {
			        var splitted = item.split(/\s/g);
			        for (var word in splitted) {
			            emit(splitted[word], 1);
			        }
			    }, function (key, values, emit) {
			        var length;
			        if ( values )  {
			            length = values.length;
			        } else {
			            length = 0;
			        }
			        emit({
			            key: key,
			            count: length
			        });
			    });

			    result.sort(function (a, b) {
			        return b.count - a.count;
			    });
			    return result;
			}

			function display(result) {
			    // all items that were emitted in the reduce step are now put into the 'result' variable
			    // and we can iterate over this collection
			    for (var ix = 0; ix < result.length; ix++) {
			        // we have created objects in the form { key, count }
			        // and we can write this to the screen
			        document.write(result[ix].key + ': ' + result[ix].count + '<br/>');
			    }
			}

			//============================================================================
			// 				MAP Reduce Functions for All Articles
			//============================================================================
			function extractDescriptions(articlesJSON) {
			    var articles = articlesJSON[0].articles;
			    var descriptionList = [];
			    for (var i in articlesJSON[0].articles) {
			        var word = articles[i].description.toLowerCase().replace(/[^a-zA-Z0-9]/g, ' ');
			        descriptionList.push(word);
			    }
			    return descriptionList;
			}

			function splitWordsArticles() {
			    var articleWords = [];
			    data.forEach(function (description, dIndex) {
			        var arr = [];
			        arr = description.split(" ");
			        arr.forEach(function (word, wIndex) {
			            if (word.length >= 4) {
			                articleWords.push(word);
			            }
			        });
			    });
			    return articleWords;
			}
