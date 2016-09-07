
Template.appointments.onCreated(function() {
    
    var template = this;

    template.autorun(function() {
        var skipCount = 0;//(currentPage() - 1) * Meteor.settings.public.recordsPerPage;

        template.subscribe('customerAppointments', skipCount);
        template.subscribe('providers', skipCount);
        template.subscribe('appointments', skipCount);
    });

});



Template.appointments.helpers({

  appointments: function() {
     
        return CustomerAppointments.find({customer: Meteor.user()._id});
    
},
    
    
    getProvider: function(id) {
     
        return Providers.find({_id: id}).fetch()[0];
    
},
    
    
    

});



Template.appointments.events({

    'click #deleteBtn': function (e,t) {
        
        var customerAppointment = CustomerAppointments.find({_id:$(e.target.value).selector});
        CustomerAppointments.remove($(e.target.value).selector);
        var record = bookingByDateAndTime(customerAppointment.date, customerAppointment.provider, customerAppointment.time);
        var arr = []
        for (var i = 0; i < record.time.lenth; i++) {
            if (record.time[i].time != customerAppointment.time)
              arr.push(record.time[i]); 
        }
        Appointments.update(record._id, {

              $set: { time: arr},

        });
        
        
    }
  
});


var bookingByDateAndTime = function(day, time, provider) {
    
    return Appointments.find({date: day, name: provider, "time.time": { $in: [ time ] } });
};