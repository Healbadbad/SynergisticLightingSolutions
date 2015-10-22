Template.createPlaylistModal.events({
    'keyup #newPlaylistName': function(e) {
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
    }
});