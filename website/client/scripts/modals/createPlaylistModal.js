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
    'click .cancel': function(e) {
        console.log("create cancel");
        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });
    }
});