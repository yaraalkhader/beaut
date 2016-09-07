
Template.providers.onCreated(function() {
    
    var template = this;

    template.autorun(function() {
        var skipCount = 0;//(currentPage() - 1) * Meteor.settings.public.recordsPerPage;        
        template.subscribe('providers', skipCount);
    });

});

Template.providers.helpers({

    
    providers: function(day, location) { 
            
       
        if (Session.get('day')){
             
            return Providers.find({location: { $nearSphere: { $geometry: { type: "Point", coordinates: [ -73.856077, 40.848447 ] }, $maxDistance: 2000 } }  }, {sort: {name:1}});
        } else {
        
           
            return Providers.find({});
        }
       
   
        },
  

});
  
      
      
  

