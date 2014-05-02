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
        var self = this;
		var formData = {
		    text: App.get('searchTerm'),
			confidence: 0.2,
			support: 20
		};

		return $.ajax({
            type: 'POST',
            url: "http://spotlight.dbpedia.org/rest/annotate",
			data: formData,
            crossDomain: true
        }).then(function(data) {
			var resource = formatResource(data);

		    return $.ajax({
				type: 'GET',
				url: bbcAPI + encodeURIComponent('"' + App.get('searchTerm').replace('\s', ' AND ')),
				cache: false,
				contentType: "application/json",
				dataType: 'json',
				crossDomain: true
			}).then(function(data) {
				var modelArray = extract(data);
				modelArray.searchTerm = App.get('searchTerm');

				return modelArray;
			});
		});
		}
	});

App.MainController = Ember.ArrayController.extend({
    articles: (function () {
		return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
			sortProperties: ['keywordCount'],
			sortAscending: false,
			content: this.get('content')
		});
	} ).property('content')
});

var bbcAPI = "http://data.bbc.co.uk/bbcrd-juicer/articles.json?apikey=Qc2qPD1jlgl8Yz9hCokogAToVQ5iOeV8&text=";

function extract(articlesJSON){
    var newArticles = [];
    articlesJSON.articles.forEach(function (article, index) {
        var newArticle = {}
        newArticle.title = article.title;
        newArticle.published = article.published;
        newArticle.description = article.description;
        newArticle.url = article.url;
        newArticle.source = article.source;

        newArticle.keywordCount = index % 10;

        if (article.image) {
            newArticle.image = article.image.src;
        } else {
            newArticle.image = 'http://static.bbci.co.uk/frameworks/barlesque/2.60.9/orb/4/img/bbc-blocks-dark.png';
        }

        newArticles.push(newArticle);
    });
   return newArticles;
}

function formatResource(data) {
	console.log(data.toString());
}

