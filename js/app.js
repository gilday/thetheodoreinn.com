(function($, window) {
    function onSignin(authResult) {
      console.log(authResult);
      if (authResult['status']['signed_in']) {
        // Update the app to reflect a signed in user
        // Hide the sign-in button now that the user is authorized
        document.getElementById('signinButton').setAttribute('style', 'display: none');
        getProfile(onProfileReceived);
      }
    }

    function getProfile(callback) {
      gapi.client.load('plus','v1', function(){
        var request = gapi.client.plus.people.get({
           'userId': 'me'
        });
        request.execute(callback);
      });
    }

    function onProfileReceived(profile) {
      var setValue = function(id, value) {
        $('#' + id).hide().text(value).fadeIn();
      };
      setValue('name', profile.displayName);
      setValue('email', profile.emails[0].value);
    }

    window.onSignin = onSignin; // make available to global scope
})(this.jQuery, this);
