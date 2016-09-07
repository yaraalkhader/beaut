//Meteor.startup(function() {  
//  GoogleMaps.load();
//});


Template.providerDetails.onCreated(function() {
    
    GoogleMaps.load();
    var template = this;

    template.autorun(function() {
        var skipCount = 0;//(currentPage() - 1) * Meteor.settings.public.recordsPerPage;

         template.subscribe('comments', skipCount);
         template.subscribe('providers', skipCount);
        count.set(Geolocation.latLng());
    });

});


count = new ReactiveVar();

    Template.providerDetails.helpers({

      provider: function() {
           
            return Providers.find({_id: Session.get("providerId")}).fetch()[0];

      },
        
        comments: function() {

            return Comments.find({providerId: Session.get("providerId")}).fetch();

    },
    
    checkAvg: function(number) {
      //  alert('y');
        var commentsArr = Comments.find({providerId: Session.get("providerId")}).fetch();
        
        var sum = 0;
        for (var i = 0; i < commentsArr.length; i++) {
            var starsArr = commentsArr[i].stars;
            for (var j = 0; j < starsArr.length; j++) {
                if (starsArr[j])
                    sum++;
            }
        }
        return sum/commentsArr.length >= number;
      
    },
    
    
    
    

});





Template.map.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {
//    google.maps.event.addListener(map.instance, 'click', function(event) {
//      
//        Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
//    });

//    Markers.find().observe({  
//    added: function(document) {
    // Create a marker for this document
    
      var prov = Providers.find({_id: Session.get("providerId")}).fetch()[0];
      var marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(prov.geometry.coordinates[0], prov.geometry.coordinates[1]),
      label: prov.name,

          map: map.instance,
      // We store the document _id on the marker in order 
      // to update the document within the 'dragend' event below.
      id: document._id
    });
      
     
      
      
    //  alert(count.get());
      var marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(count.get()),
      label: "*",

          map: map.instance,
      // We store the document _id on the marker in order 
      // to update the document within the 'dragend' event below.
      id: document._id
    }); 
      
      

    // This listener lets us drag markers on the map and update their corresponding document.
//    google.maps.event.addListener(marker, 'dragend', function(event) {
//      Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
//    });

    // Store this marker instance within the markers object.
   // markers[document._id] = marker;
//  },
//  changed: function(newDocument, oldDocument) {
//    markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
//  },
//  removed: function(oldDocument) {
//    // Remove the marker from the map
//    markers[oldDocument._id].setMap(null);
//
//    // Clear the event listener
//    google.maps.event.clearInstanceListeners(
//      markers[oldDocument._id]);
//
//    // Remove the reference to this marker instance
//    delete markers[oldDocument._id];
//  }
//});

  });
});

Template.map.helpers({  
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
        var prov = Providers.find({_id: Session.get("providerId")}).fetch()[0];
      return {
        center: new google.maps.LatLng(prov.geometry.coordinates[0], prov.geometry.coordinates[1]),
        zoom: 13
      };
    }
  }
});
