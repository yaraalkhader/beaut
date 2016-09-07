
Router.route('/', 
             {
    layoutTemplate: 'landing',
    name: 'landingPage',
   
});

Router.route('/search:day?', 
             {
    layoutTemplate: 'default',
    name: 'providers',
   
});


Router.route('/filter', 
             {
    layoutTemplate: 'default',
    name: 'advancedSearch',
   
});

Router.route('/providerDetails', 
             {
    layoutTemplate: 'default',
    name: 'providerDetails',
   
});

Router.route('/review', 
             {
    layoutTemplate: 'default',
    name: 'review',
   
});


Router.route('/calendar', 
             {
    layoutTemplate: 'default',
    name: 'calendar',
   
});

Router.route('/appointments', 
             {
    layoutTemplate: 'default',
    name: 'appointments',
   
});


Router.route('/payment', 
             {
    layoutTemplate: 'default',
    name: 'profileEdit',
   
});


Router.route('/events', 
             {
    layoutTemplate: 'default',
    name: 'events',
   
});

