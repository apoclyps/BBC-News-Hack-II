/**
 * BBC-Juicer.js
 *
 */

 var result = "";
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
                contentType: "application/json",
                dataType: 'json',
                crossDomain : true,
                success: function (data) {
                    result=data;
                },
                error: function (e) {
                    console.log(e.message);
                }
            });
        }



    //Update View
});
