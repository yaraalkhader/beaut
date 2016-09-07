Meteor.methods({
  addEvent( event ) {
    check( event, {
      title: String,
      start: String,
      end: String,
      type: String,
      guests: Number
    });

    try {
      return Events.insert( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});




Meteor.methods({
  editEvent( event ) {
    check( event, {
      _id: String,
      title: Match.Optional( String ),
      start: String,
      end: String,
      type: Match.Optional( String ),
      guests: Match.Optional( Number )
    });

    try {
      return Events.update( event._id, {
        $set: event
      });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});


Meteor.methods({
  removeEvent( event ) {
    check( event, String );

    try {
      return Events.remove( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});

Meteor.methods({
  getMobileLocation( lng,lat ) {
    return Providers.find({'geometry.coordinates':
      {
       $near: {
         $geometry: {
           type: "Point",
           coordinates: [lng,lat]
           }
        },
        $maxDistance: 20000   //meters
     }
   })
}
});
//Meteor.methods({
//    authorize(event) {
//    
//    Meteor.Paypal.authorize({
//      name: 'Buster Bluth',
//      number: '4111111111111111',
//      type: 'visa',
//      cvv2: '123',
//      expire_year: '2015',
//      expire_month: '01'
//    },
//    {
//      total: '100.10',
//      currency: 'USD'
//    },
//    function(error, results){
//      if(error)
//        //Deal with Error
//      else
//        //results contains:
//        //  saved (true or false)
//        //  if false: "error" contains the reasons for failure
//        //  if true: "payment" contains the transaction information
//    });
//    }
//    )};