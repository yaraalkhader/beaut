


Providers = new Mongo.Collection('providers');
Meteor.methods({
  providersInsert: function(attributes) {

    var insertVal = Providers.insert(attributes);
          console.error(insertVal);
        return insertVal;
    }
});


Appointments = new Mongo.Collection('appointments');
Meteor.methods({
  appointmentsInsert: function(attributes) {

    var insertVal = Appointments.insert(attributes);
          console.error(insertVal);
        return insertVal;
    }
});


CustomerAppointments = new Mongo.Collection('customerAppointments');
Meteor.methods({
  customerAppointmentsInsert: function(attributes) {

    var insertVal = CustomerAppointments.insert(attributes);
          console.error(insertVal);
        return insertVal;
    }
});


Comments = new Mongo.Collection('comments');
Meteor.methods({
  commentInsert: function(attributes) {

    var insertVal = Comments.insert(attributes);
          console.error(insertVal);
        return insertVal;
    }
});


Events = new Mongo.Collection( 'events' );

Events.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Events.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});



Markers = new Mongo.Collection('markers');  
