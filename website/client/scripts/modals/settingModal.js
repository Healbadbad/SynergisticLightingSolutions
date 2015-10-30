Template.settingsModal.events({
    'keyup #led-input': function (e) {
        if (e.target.value >= 0) {
            $('#led-error').hide();
            $('#update-number-leds-button').prop('disabled', false);
        } else {
            $('#led-error').show();
            $('#update-number-leds-button').prop('disabled', true);
        }
    },
    'click #update-firmware-button': function (e) {
        // TODO
        e.preventDefault();
        console.log("update the firmware");
    },
    'click #update-number-leds-button': function (e) {
        // TODO
        e.preventDefault();
        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });
        e.stopPropagation();
        numberOfLEDs = $('#led-input').val();
        console.log("save settings");
    },
    'click .cancel': function (e) {
        e.preventDefault();
        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });
        e.stopPropagation();
    }
});


