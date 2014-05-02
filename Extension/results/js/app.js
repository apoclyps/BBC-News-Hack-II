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
    searchTerm: App.get('searchTerm'),
    model: function () {
        var self = this;


        return $.ajax({
            type: 'GET',
            url: bbcAPI + encodeURIComponent('"' + App.get('searchTerm').replace('\s', ' AND ')),
            cache: false,
            contentType: "application/json",
            dataType: 'json',
            crossDomain: true
        }).then(function(data) {
             return extract(data);
        });
    }
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

        if (article.image) {
            newArticle.image = article.image.src;
        } else {
            newArticle.image = 'http://static.bbci.co.uk/frameworks/barlesque/2.60.9/orb/4/img/bbc-blocks-dark.png';
        }

        newArticles.push(newArticle);
    });
   return newArticles;
}

