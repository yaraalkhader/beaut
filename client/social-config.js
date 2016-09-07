//ServiceConfiguration.configurations.remove({
//    service: 'facebook'
//});
// 



ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '508369366162761',
    secret: 'f92110b98de3d3718ec7305ecf73b3a6',
    requestPermissions: ['user_friends'] 
});


if(Meteor.isClient) {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '508369366162761',
      status     : true,
      xfbml      : true
    });
  };
}