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

    // Creates a list of articles as an Array
    //var articles = articlesToArray(articlesJSON);
    // Creates a list of articles in JSON format
    //var result = articlesToJSON(articlesJSON);

    var places = extractPlacecs(articlesData);
    var people = extractPeople(articlesData);

    article.people.forEach(function (person, index) {
                peopleList.push(person.name);
    });
    

    //===========================================================================================================================================================

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

    /**
     * Accepts a JSON and returns a JSONArray of Articles
     */
    function getPlaces(articlesJSON){
        var placesList = [];
        // Foreach Article in Response
        console.log(articlesJSON[0].articles);
        for (var article in articlesJSON[0].articles) {
            console.log(article.toString());
            for (var place in article) {

                console.log(place.toString());
                placesList.push(place.name);
            }
        }
        console.log("Places  " + placesList.length);
       return placesList;
    }

    function extractPlacecs(articlesJSON){
        var newArticles = [];
        // For each article in Response
        articlesJSON[0].articles.forEach(function (article, index) {
            //Foreach place in article
            article.places.forEach(function (place, index) {
                newArticles.push(place.name);
            });
        });
    }

    function extractPeople(articlesJSON){
        var peopleList = [];

        articlesJSON[0].articles.forEach(function (article, index) {
            article.people.forEach(function (person, index) {
                peopleList.push(person.name);
            });
        });
    }

    function generateSearchKeywords(keyword, listword){
        var keyword = {};
        keyword.input = "Heroine";
        keyword.list = "Hero";

        console.log("Keyword" + levenshteinenator(keyword));

        // calculate the Levenshtein distance between a and b, fob = form object, passed to the function
        function levenshteinenator (keyword) {
            var cost;

            // get values
            var a = keyword.input;
            var m = a.length;

            var b = keyword.list;
            var n = b.length;

            // make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
            if (m < n) {
                var c = a;
                a = b;
                b = c;
                var o = m;
                m = n;
                n = o;
            }

            var r = new Array();
            r[0] = new Array();
            for (var c = 0; c < n + 1; c++) {
                r[0][c] = c;
            }

            for (var i = 1; i < m + 1; i++) {
                r[i] = new Array();
                r[i][0] = i;
                for (var j = 1; j < n + 1; j++) {
                    cost = (a.charAt(i - 1) == b.charAt(j - 1)) ? 0 : 1;
                    r[i][j] = minimator(r[i - 1][j] + 1, r[i][j - 1] + 1, r[i - 1][j - 1] + cost);
                }
            }

            return r[m][n];
        }

        // return the smallest of the three values passed in
        function minimator (x,y,z) {
            if (x < y && x < z) return x;
            if (y < x && y < z) return y;
                return z;   
        }
    }

});