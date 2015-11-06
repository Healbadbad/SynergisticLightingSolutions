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
        createAlert("You have successfully updated the firmware.");
        $('#update-firmware-button').prop('disabled', true);
        updateFirmware();
    },
    'click #update-number-leds-button': function (e) {
        // TODO
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
    console.log("create alert");
    var div = $('<div></div>');
    console.log(1);
    var alert = $('<div></div>').addClass("alert-box success radius").text(message);
    console.log(2);
    alert.val(message);
    console.log(3);
    alert.append($('<a></a>').addClass('close').html('&times'));
    console.log(4);
    $('#alert-box').append(alert);
    //TODO test and check
}

function updateFirmware() {
    console.log("update the firmware");
}

function updateLEDNumber(newNumber) {
    console.log("update the number of leds to " + newNumber);
}