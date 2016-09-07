Meteor.startup(function () {
  smtp = {
    username: 'yara@sa3ed.com',   // eg: server@gentlenode.com
    password: '1234@Yara',   // eg: 3eeP1gtizk5eziohfervU
    server:   'sa3ed-vm.sa3ed.me',  // eg: mail.gandi.net
    port: 25
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});