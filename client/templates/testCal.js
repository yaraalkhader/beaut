//Template.events.onCreated( () => {
//  let template = Template.instance();
//  template.subscribe( 'events' );
//});
//
//Template.events.onRendered( () => {
//  $( '#events-calendar' ).fullCalendar({
//    events( start, end, timezone, callback ) {
//      let data = Events.find().fetch().map( ( event ) => {
//        event.editable = !isPast( event.start );
//        return event;
//      });
//
//      if ( data ) {
//        callback( data );
//      }
//    },
//    dayClick( date ) {
//      Session.set( 'eventModal', { type: 'add', date: date.format() } );
//      $( '#add-edit-event-modal' ).modal( 'show' );
//    },
//    eventClick( event ) {
//      Session.set( 'eventModal', { type: 'edit', event: event._id } );
//      $( '#add-edit-event-modal' ).modal( 'show' );
//    }
//  });
//});


Template.addEditEventModal.onCreated(function() {
    
    var template = this;

    template.autorun(function() {
        var skipCount = 0;//(currentPage() - 1) * Meteor.settings.public.recordsPerPage;

        template.subscribe('appointments', skipCount);
        template.subscribe('providers', skipCount);
      
    });

});


Template.addEditEventModal.helpers({
  modalType( type ) {
    let eventModal = Session.get( 'eventModal' );
    if ( eventModal ) {
      return eventModal.type === type;
    }
  },
  modalLabel() {
    let eventModal = Session.get( 'eventModal' );

    if ( eventModal ) {
      return {
        button: eventModal.type === 'edit' ? 'Edit' : 'Add',
        label: eventModal.type === 'edit' ? 'Edit' : 'Add an'
      };
    }
  },
  selected( v1, v2 ) {
    return v1 === v2;
  },
  event() {
    let eventModal = Session.get( 'eventModal' );

    if ( eventModal ) {
        
      return eventModal.type === 'edit' ? Events.findOne( eventModal.event ) : {
        start: eventModal.date,
        end: new moment(eventModal.date,'ddd MMM Do YY hhmm').add(30, 'minute').format('ddd MMM Do YY hhmm')
      };
    }
  }
});


Template.addEditEventModal.events({
  'submit form' ( event, template ) {
    event.preventDefault();

      
//    let eventModal = Session.get( 'eventModal' ),
//        submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
//        eventItem  = {
//          title: template.find( '[name="title"]' ).value,
//          start: template.find( '[name="start"]' ).value,
//          end: template.find( '[name="end"]' ).value,
//          type: template.find( '[name="type"] option:selected' ).value,
//          guests: parseInt( template.find( '[name="guests"]' ).value, 10 )
//        };
//
//    if ( submitType === 'editEvent' ) {
//      eventItem._id   = eventModal.event;
//    }
      
      
      let eventModal = Session.get( 'eventModal' );


    book(eventModal.day, eventModal.time);
      closeModal();
      

  },
    
    'click .delete-event' ( event, template ) {
    let eventModal = Session.get( 'eventModal' );
    if ( confirm( 'Are you sure? This is permanent.' ) ) {
      Meteor.call( 'removeEvent', eventModal.event, ( error ) => {
        if ( error ) {
          Bert.alert( error.reason, 'danger' );
        } else {
          Bert.alert( 'Event deleted!', 'success' );
          closeModal();
        }
      });
    }
  }
});




var book = function(date, time) {
   
    
    var record = bookingByDate(date).fetch()[0];  
    var customerAppointment = {
                    customer: Meteor.user()._id ,
                    time: time,
                    date: date,
                    type: 'customer',
                    provider: Session.get("providerId"),
                    status: 'booked'
    };
    
    Meteor.call('customerAppointmentsInsert', customerAppointment, function(error, result) {    
                if (error) {
                    alert(error);
                    return false;
                }    
                });        
    
    
    if (record != null) {
        
        var timeArr = record.time;
        timeArr.push(customerAppointment);
        
            Appointments.update(record._id, {

              $set: { time: timeArr},

            });
        
    
    } else {
        
        
        
        var appointment = {
            name: Session.get("providerId"),
            date: date,
            time: [customerAppointment],             
        };
        
        Meteor.call('appointmentsInsert', appointment, function(error, result) {    
            if (error) {
                alert(error);
                return false;
            }    
        });
                
        
    }
    
    
    
    if (record.time.length == 27) {
          alert('27');
          var providerToBeUpdate =  Providers.find({_id:Session.get("providerId")}).fetch()[0];
          alert(providerToBeUpdate.date);
          var datesArr = providerToBeUpdate.date;
          datesArr.push(date);
          
          Providers.update(Session.get("providerId"), {

                    $set: { date: datesArr},

          });
      }
    
    //      //for (i = 0; i < booking().count(); i++) {   
//            var record = bookingByDate(day).fetch()[0];  
//            if (record != null) {
//            if (record.date == day ) {
//                for (j = 0; j < record.time.length; j++) {                
//                    if ( time == record.time[j].time) {                        
//                        alert('Cant be reserve');
//                        return;
//                    } 
//                } 
//                
//                
//                
//                
//                 
//                
//            } 
//            } else {
////        } 
////         booking().push({ name:'Saloon beauty', date:day, time: [time]});
//         
//       
//        var customerAppointment = {
//                    customer: Meteor.user()._id ,
//                    time: time,
//                    type: 'customer',
//                    provider: Session.get("providerId"),
//                    status: 'booked'
//        };
//        alert(Session.get("providerId"));        
//        var appointment = {
//            name: Session.get("providerId"),
//            date: day,
//            time: [customerAppointment],             
//        };
//        
//        Meteor.call('appointmentsInsert', appointment, function(error, result) {    
//            if (error) {
//                alert(error);
//                return false;
//            }    
//        });
//                
//        Meteor.call('customerAppointmentsInsert', customerAppointment, function(error, result) {    
//                if (error) {
//                    alert(error);
//                    return false;
//                }    
//                });        
//            }
//      
//      var record = bookingByDate(day).fetch()[0];
//      if (record.time.length == 27) {
//        alert('27');
//          var providerToBeUpdate =  Providers.find({_id:Session.get("providerId")}).fetch()[0];
//          alert(providerToBeUpdate.date);
//          var datesArr = providerToBeUpdate.date;
//          datesArr.push(day);
//          
//          Providers.update(Session.get("providerId"), {
//
//                    $set: { date: datesArr},
//
//          });
//      }
//         
//      // if it is booked alert customer
////      booking().
//      // else add to calender
//      
//     
//      
//      
////        var teampDay = dayReference.add('days',p1);
////        for (i = 0; i < booking.length; i++) {
////        if (teampDay == moment('07072016') ) {
////            if ( p2 in booking[i].time) {
////            alert('test');
////            }
////        }
//      
////  }
    
};
    
    

var bookingByDate = function(day) {
  
    
    return Appointments.find({date: day, name: Session.get("providerId")});
};


let closeModal = () => {
  $( '#add-edit-event-modal' ).modal( 'hide' );
  $( '.modal-backdrop' ).fadeOut();
};