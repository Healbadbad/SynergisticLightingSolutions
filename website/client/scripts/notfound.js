/**
 * Created by wrightjt on 10/13/2015.
 */

Template.notfound.events({
    'click #route-back': function(e) {
        console.log("He's going back");
        history.back();
    }
});