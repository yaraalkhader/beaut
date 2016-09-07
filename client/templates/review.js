

var stars = new ReactiveVar([false,false,false,false,false]);


Template.review.helpers({

  starClass: function(id) {
      
        if (stars.get()[id-1]) return "glyphicon glyphicon-star";
        else return "glyphicon glyphicon-star-empty";
        
    
},

});


Template.review.events({

   'click #score1': function(e) {
        e.preventDefault();
     
      stars.set([true,false,false,false,false]);
     
      
    
  },
    

   'click #btnAdd': function(e) {    
	   e.preventDefault();
      
       var form = $('form[name="reviewForm"]');        
       
        var comment = {
            customerId: Meteor.user()._id,
            customerName: Meteor.user().profile.name,
            providerId: Session.get("providerId"),
            text: form.find('[name=commentText]').val(),
            stars: stars.get(),
            date: new moment().format('ddd MMM Do YY')
        };
       
       
       Meteor.call('commentInsert', comment, function(error, result) {    
            if (error) {
                alert(error);
                return false;
            }     

           
    
//            FB.ui({
//            method: "feed",
//            link: 'http://localhost:3000',
//                description: "The description who will be displayed"
//        }, function(response) {
//            console.log(response);
//        });
        


        Router.go('providerDetails');      
        });
      
      
    
    },    
    
    
    
   'click #btnCancel': function(e) {  
    
      
    

      
      
    
  },
    
    'click #score2': function (event, template) {
      
     
      stars.set([true,true,false,false,false]);
      
  },
    
'click #score3': function (event, template) {
      
     
      stars.set([true,true,true,false,false]);
      
      
    
  },
    
'click #score4': function (event, template) {
      
     
      stars.set([true,true,true,true,false]);
   
    
  },
    
'click #score5': function (event, template) {
      
     
      stars.set([true,true,true,true,true]);
      
  },    
});



//Template.review.rendered = function() {
//    try {
//        FB.XFBML.parse();
//    } catch(e) {}   
//};
//
