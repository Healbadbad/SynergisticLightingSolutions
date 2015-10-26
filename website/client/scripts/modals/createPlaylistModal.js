Template.createPlaylistModal.events({
    'keyup #new-playlist-name': function(e) {
        // TODO don't know why this is not being called
        console.log("called");
        console.log(e.target.value);
        //if(exists(e.target.value)) {
        //    $('#newPasswordCheck').show();
        //    $('#newPasswordError').hide();
        //    if(isSamePassword()) {
        //        deleteErrors();
        //    } else {
        //        displayPasswordError();
        //        $('#rePasswordCheck').hide();
        //    }
        //} else {
        //    $('#newPasswordCheck').hide();
        //    $('#newPasswordError').show();
        //}
    },
    'click #create-playlist-button': function(e){
        e.preventDefault();
        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });
        e.stopPropagation();
        console.log("cancer");
    },
    'click #workPls': function(e) {
        e.preventDefault();
        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });
        e.stopPropagation();
    },
});

Template.createPlaylistModal.rendered = function(){
    console.log("rendered");
};