(function($, window) {
    function onSignin(authResult) {
      console.log(authResult);
      if (authResult['status']['signed_in']) {
        // Update the app to reflect a signed in user
        // Hide the sign-in button now that the user is authorized
        document.getElementById('signinButton').setAttribute('style', 'display: none');
        getProfile().then(onProfileReceived);
      }
    }

    /**
     * submits the booking form and returns a promise
     */
    function bookRoom() {
      var booking = $('form').serialize();
      console.log(booking);
      var appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzGasb7tXx76ziNTalytCPUSAWgrxvYIn4LSHecMrEAcuqDGahu/exec';
      return $.ajax(appsScriptUrl, {
        type: 'POST',
        data: booking,
        dataType: 'jsonp',
        crossDomain: true
      });
    }

    function getProfile() {
      var deferred = $.Deferred();
      gapi.client.load('plus','v1', function(){
        var request = gapi.client.plus.people.get({
           'userId': 'me'
        });
        request.execute(deferred.resolve);
      });
      return deferred.promise();
    }

    function onProfileReceived(profile) {
      var setValue = function(id, value) {
        $('#' + id).val(value);
      };
      setValue('name', profile.displayName);
      setValue('email', profile.emails[0].value);
    }

    function configure() {
      $('#booking-form').submit(function() {
        bookRoom().then(showSuccess);
        return false;
      });
    } 

    function showSuccess() {
      console.log('success');
      $('form').fadeOut();
      $('#thank-you-message').show();
    }   

    configure();
    window.onSignin = onSignin; // make available to global scope
})(this.jQuery, this);
