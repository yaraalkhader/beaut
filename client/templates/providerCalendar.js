
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './providerCalendar.html';




Template.calendar.rendered = function () {
    Session.set('week',0);
    
};

Template.calendar.onCreated(function() {
    
    var template = this;

    template.autorun(function() {
        var skipCount = 0;//(currentPage() - 1) * Meteor.settings.public.recordsPerPage;

        template.subscribe('appointments', skipCount);
        template.subscribe('providers', skipCount);
    });

});


var day = function() {
  
  return moment().add('days', weekNumber()*7);
};


var booking = function() {
  
    var collection = Appointments.find({name: Session.get("providerId")});   
    return collection;
};

var bookingByDate = function(day) {
  
    
    return Appointments.find({date: day, name: Session.get("providerId")});
};


var bookingByDateAndTime = function(day, time) {
    
    return Appointments.find({date: day, name: Session.get("providerId"), "time.time": { $in: [ time ] } });
};


Template.calendar.helpers({
        agendaHours: [

            {time: '080'},{time: '085'},{time: '090'},{time: '095'},{time: '100'},{time: '105'},{time: '110'},
       {time: '115'},{time: '120'},{time: '125'},{time: '130'},{time: '135'},{time: '140'},{time: '145'},{time: '150'},
       {time: '155'},{time: '160'},{time: '165'},{time: '170'},{time: '175'},{time: '180'},{time: '185'},{time: '190'},
       {time: '195'},{time: '200'},{time: '205'},{time: '210'}

        ],
      
       booking: function() {return booking()},
    
       days: function(p1, p2) { 
            return [
                {day: day().format('ddd MMM Do YY')}, 
                {day: day().add('days',1).format('ddd MMM Do YY')},
                {day: day().add('days',2).format('ddd MMM Do YY')},
                {day: day().add('days',3).format('ddd MMM Do YY')},
                {day: day().add('days',4).format('ddd MMM Do YY')},
                {day: day().add('days',5).format('ddd MMM Do YY')},
                {day: day().add('days',6).format('ddd MMM Do YY')},
            ];
    
        },
         
                

        
       
});

Template.content.helpers({
                isReserved: function(day, hour) {
                var bookingArr = booking().fetch();
                    for (i = 0; i < bookingArr.length; i++) {   
                        
                        if (bookingArr[i].date == day ) {
                            for (j = 0; j < bookingArr[i].time.length; j++) {                
                                if ( hour == bookingArr[i].time[j].time) {
                                    if (bookingArr[i].time[j].type == 'customer') {
                                        return 'glyphicon glyphicon-ok-sign';
                                    } else {
                                        return 'grey';
                                    }
                                } 
                            }
                        }
                    } 
                    return 'green';

                },
});
                
Template.calendar.events({
  'click .book': function (event, template) {
      var day = this.day;
      var time = this.hour;
      
       var record = bookingByDateAndTime(day, time).fetch();  
    
       if (record.length > 0 ) {
           alert('Cant be reserve');
           return;
       } else {
        Session.set( 'eventModal', { type: 'add', date: this.day + ' ' + this.hour + '0', day: day, time: time } );
        $( '#add-edit-event-modal' ).modal( 'show' );
       
       }
      
 },
    
    'click #nextWeek': function (p1, p2) {
      var week = weekNumber() + 1;
            Session.set('week', week);             
            Router.go('/calendar',{});
        },
    
    'click #prevWeek': function (p1, p2) {
      var week = weekNumber() - 1;
            Session.set('week', week);             
            Router.go('/calendar',{});
        },
            
});


var weekNumber = function() {  
  return Session.get('week');
};



var makeAppointment = function(record, time ) {
    var timeArr = record.time;
                
                var customerAppointment = {
                    customer: Meteor.user()._id ,
                    time: time,
                    type: 'customer',
                    provider: Session.get("providerId"),
                    status: 'booked'
                };
                
                timeArr.push(customerAppointment);
                
                
                   
                Appointments.update(record._id, {

                    $set: { time: timeArr},

                });
                
                
                
                Meteor.call('customerAppointmentsInsert', customerAppointment, function(error, result) {    
                if (error) {
                    alert(error);
                    return false;
                }    
                });
};
        