App = Ember.Application.create();
var searchTerm = "";

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
            /// load
            // Pass model
            this.transitionToRoute('main');
        }
    }
});

App.MainRoute = Ember.Route.extend({
  model: function() {
    var searchTerm = App.get('searchTerm');
    return [
    {
        published: "2014-05-01",
        source: searchTerm,
        title: "Vladimir Putin calls for Ukrainian troops to withdraw from south-east",
        description: "In phone call with Angela Merkel, Russian president says military withdrawal and national dialogue are key issues in Ukraine Vladimir Putin has called for Ukrainian troops to pull out of the south-east of the country, in a conversation with Angela Merkel on Thursday. The Russian president said military withdrawal, an end to violence and a national dialogue were the key issues in Ukraine, according to a Kremlin briefing on the phone conversation.   Continue reading...",
        url: "http://feeds.theguardian.com/c/34708/f/663828/s/39f4eaa1/sc/1/l/0L0Stheguardian0N0Cworld0C20A140Cmay0C0A10Cvladimir0Eputin0Eukraine0Etroops0Ewithdrawal0Eangela0Emerkel/story01.htm",
        image: "http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/5/1/1398947333984/Ukrainian-troops-near-Slo-011.jpg"
    },{
        published: "2014-05-01",
        source: "TheGuardian",
        title: "Vladimir Putin calls for Ukrainian troops to withdraw from south-east",
        description: "In phone call with Angela Merkel, Russian president says military withdrawal and national dialogue are key issues in Ukraine Vladimir Putin has called for Ukrainian troops to pull out of the south-east of the country, in a conversation with Angela Merkel on Thursday. The Russian president said military withdrawal, an end to violence and a national dialogue were the key issues in Ukraine, according to a Kremlin briefing on the phone conversation.   Continue reading...",
        url: "http://feeds.theguardian.com/c/34708/f/663828/s/39f4eaa1/sc/1/l/0L0Stheguardian0N0Cworld0C20A140Cmay0C0A10Cvladimir0Eputin0Eukraine0Etroops0Ewithdrawal0Eangela0Emerkel/story01.htm",
        image: "http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/5/1/1398947333984/Ukrainian-troops-near-Slo-011.jpg"
    },

    {
        published: "2014-05-01",
        source: "TheGuardian",
        title: "Germany blocks Edward Snowden from testifying in person in NSA inquiry",
        description: "Officials say a personal invitation for US whistleblower to attend hearing would put 'grave strain' on US-German relations The German government has blocked Edward Snowden from giving personal evidence in front of a parliamentary inquiry into NSA surveillance, it has emerged hours before Angela Merkel travels to Washington for a meeting with Barack Obama. In a letter to members of a parliamentary committee obtained by Sddeutsche Zeitung, government officials say a personal invitation for the ...",
        url: "http://feeds.theguardian.com/c/34708/f/663828/s/39f3f65c/sc/1/l/0L0Stheguardian0N0Cworld0C20A140Cmay0C0A10Cgermany0Eedward0Esnowden0Ensa0Einquiry/story01.htm",
        image: "http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/5/1/1398939826137/Edward-Snowden-009.jpg"
    }
    ];
  }
});
