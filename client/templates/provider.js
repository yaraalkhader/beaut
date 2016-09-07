Template.provider.onCreated(function() {
    
    var template = this;

    template.autorun(function() {
        var skipCount = 0;//(currentPage() - 1) * Meteor.settings.public.recordsPerPage;

        template.subscribe('providers', skipCount);
    });

});


Template.provider.events({

    'click #detailBtn': function (event, template) {       
      
        Session.set('providerId', $(event.target.value).selector);
        Router.go('providerDetails');
        
    }
  
});


