/**
 * BBC-Juicer.js
 *
 */
$(document).ready(function () {

    var bbcAPI = "http://data.bbc.co.uk/bbcrd-juicer/articles.json?"+
    "ext=Russia&apikey=Qc2qPD1jlgl8Yz9hCokogAToVQ5iOeV8";

    sendAjax();

    //AJAX Call to Juicer
    function sendAjax() {
            $.ajax({
                type: 'GET',
                url: bbcAPI,
                async: false,
                callback: '.',
                jsonp: '.',
                contentType: "application/json",
                dataType: 'jsonp',
                crossDomain : true,
                success: function (data) {
                    alert(data);
                },
                error: function (e) {
                    console.log(e.message);
                }
            });
        }


  
    //Update View
});