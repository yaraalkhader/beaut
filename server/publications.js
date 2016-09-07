

Meteor.publish('providers', function(skipCount) {
    
    Counts.publish(this, 'providersCount', Providers.find(), { 
        noReady: true
    });
    
  return Providers.find({}, {
    limit: parseInt(Meteor.settings.public.recordsPerPage), // records to show per page
    skip: skipCount
  });
});


Meteor.publish('appointments', function(skipCount) {
    
    Counts.publish(this, 'appointmentsCount', Appointments.find(), { 
        noReady: true
    });
    
  return Appointments.find({}, {
    limit: parseInt(Meteor.settings.public.recordsPerPage), // records to show per page
    skip: skipCount
  });
});



Meteor.publish('customerAppointments', function(skipCount) {
    
    Counts.publish(this, 'customerAppointmentsCount', CustomerAppointments.find(), { 
        noReady: true
    });
    
  return CustomerAppointments.find({}, {
    limit: parseInt(Meteor.settings.public.recordsPerPage), // records to show per page
    skip: skipCount
  });
});


Meteor.publish('comments', function(skipCount) {
    
    Counts.publish(this, 'commentsCount', Comments.find(), { 
        noReady: true
    });
    
  return Comments.find({}, {
    limit: parseInt(Meteor.settings.public.recordsPerPage), // records to show per page
    skip: skipCount
  });
});



SearchSource.defineSource('providers', function( day, options) {
  var options = {sort: {isoScore: -1}, limit: 20};
  
  if(day) {  
    var selector = {location: "France, Nice", date: { $ne: [ day ] } };    
    return Providers.find(selector, options).fetch();
  } else {
    return Providers.find({}, options).fetch();
  }
});


SearchSource.defineSource('markers', function( day, options) {
  var options = {sort: {isoScore: -1}, limit: 20};
  
  if(day) {  
    var selector = { date: { $ne: [ day ] } };    
    return Providers.find(selector, options).fetch();
  } else {
    return Providers.find({}, options).fetch();
  }
});