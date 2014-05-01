/**
 * BBC-Juicer.js
 *
 */
$(document).ready(function () {
    
    $.support.cors = true;

    //===========================================================================================================================================================
    //                                                              On Document Ready
    //===========================================================================================================================================================
    var bbcAPI = "http://data.bbc.co.uk/bbcrd-juicer/articles.json?text=Russia&apikey=Qc2qPD1jlgl8Yz9hCokogAToVQ5iOeV8";
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from json where url ="' + bbcAPI + '"') + '&format=json&callback=.';
    
    // Collections JSON either from a file or BBC's Juicer API
    var articlesJSON = getArticleJSON();

    // Creates a list of articles as an Array
    var articles = articlesToArray(articlesJSON);
    // Creates a list of articles in JSON format
    var result = articlesToJSON(articlesJSON);

    //===========================================================================================================================================================
    //                                                                MODEL
    //===========================================================================================================================================================
    
    /**
     * Getting JSON-P from local file
     */
    function getArticleJSON() {
        var articlesJSON = articlesData;
        // Code here to remove unneeded JSON

        // callJuicerAPI();
        return articlesJSON;
    }

    /**
     * Accepts a JSON and returns an array of objects.
     */
    function articlesToArray(articlesJSON){
        var articles = articlesJSON[0].articles;
        var newArticles = [];
        for (var i in articlesJSON[0].articles) {
            var newArticle = {}
            newArticle.title = articles[i].title;
            newArticle.published = articles[i].published;
            newArticle.description = articles[i].description;
            newArticle.url = articles[i].url;
            newArticle.image = articles[i].image;
            newArticle.source = articles[i].source;
            newArticles.push(newArticle);
        }
        console.log("Articles Size " + newArticles.length);
        return newArticles;
    }

    /**
     * Accepts a JSON and returns a JSONArray of Articles
     */
    function articlesToJSON(articlesJSON){
        var articles = articlesJSON[0].articles;
        var newArticles = [];
        for (var i in articlesJSON[0].articles) {
            var newArticle = {}
            newArticle.title = articles[i].title;
            newArticle.published = articles[i].published;
            newArticle.description = articles[i].description;
            newArticle.url = articles[i].url;
            newArticle.image = articles[i].image;
            newArticle.source = articles[i].source;
            newArticles.push(JSON.stringify(newArticle));
            console.log(JSON.stringify(newArticle) +"\n");
        }
        console.log("Articles Size " + newArticles.length);
       return JSON.stringify(articles);
    }

    //===========================================================================================================================================================
    //                                                                AJAX
    //===========================================================================================================================================================

    //AJAX Call to Juicer
    function callJuicerAPI() {
        $.ajax({
            type: 'GET',
            url: yql,
            cache: false,
            async: false,
            contentType: "application/json",
            dataType: 'json',
            callback: '.',
            crossDomain: true,
            success: function (data) {
                console.log("Success "+data);
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    }
    //=========================================================================================================================================================
    //                                                                EOF
    //===========================================================================================================================================================
});