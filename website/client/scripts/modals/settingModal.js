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
        e.preventDefault();
        createAlert("You have successfully updated the firmware.");
        $('#update-firmware-button').prop('disabled', true);
        updateFirmware();
    },
    'click #update-number-leds-button': function (e) {
        e.preventDefault();
        e.stopPropagation();
        numberOfLEDs = $('#led-input').val();
        updateLEDNumber(numberOfLEDs);
        createAlert("you have successfully updated the number of LEDs to " + numberOfLEDs);
    },
    'click .cancel': function (e) {
        e.preventDefault();
        $('body').trigger({
            type: 'keyup',
            which: 27 // Escape key
        });
        e.stopPropagation();
    }
    ,
    'click .close': function (e) {
        $(e.target).parent().remove();
    }
});

function createAlert(message) {
    var div = $('<div></div>');
    var alert = $('<div></div>').addClass("alert-box success radius").text(message);
    alert.val(message);
    alert.append($('<a></a>').addClass('close').html('&times'));
    $('#alert-box').append(alert);
}

function updateFirmware() {
    // TODO
    console.log("update the firmware");
}

function updateLEDNumber(newNumber) {
    // TODO
    console.log("update the number of leds to " + newNumber);
}