Template.settingsModal.events({
    'keyup #setting1': function(e) {
        if (e.target.value) {
            $('#setting1-error').hide();
            $('#save-settings-button').prop('disabled', false);
        } else{
            $('#setting1-error').show();
            $('#save-settings-button').prop('disabled', true);
        }
    },
    'click #save-settings-button': function(e){
        e.preventDefault();
        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });
        e.stopPropagation();
        console.log("save settings");
    },
    'click .cancel': function(e) {
        e.preventDefault();
        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });
        e.stopPropagation();
    }
});