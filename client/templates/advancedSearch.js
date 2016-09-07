Template.advancedSearch.rendered = function(){
         $('.datetimepicker').datetimepicker({
            date: moment(Session.get('day'),'ddd MMM Do YY').toDate(),
            format: "ddd MMM Do YY" 
         });
       
};
      

Template.advancedSearch.events({
  
    'click #btnSearch': function(e) {
        e.preventDefault();  
       
        var form = $('form[name="advancedSearchForm"]');        
        var sort = $('input[name=optionsRadios]:checked', form).val();     
        Session.set('sort', sort);
       
       
        
        
        var female = $('input[name=female]:checked', form).val();     
        if (female) {
            Session.set('female',true);
        } else {
            Session.set('female',null);
        }
        var male = $('input[name=male]:checked', form).val();     
        if (male) {
             Session.set('male',true);
        } else {
            Session.set('male',null);
        }
        
        
        var english = $('input[name=english]:checked', form).val();     
        if (english) {
             Session.set('english',true);
        } else {
            Session.set('english',null);
        }
        
        
        var mobile = $('input[name=mobile]:checked', form).val();     
        if (mobile) {
             Session.set('mobile',true);
        } else {
            Session.set('mobile',null);
        }
        
        Router.go('providers');    
      
    },
    
    
    'click #btnCancle': function(e) {
        e.preventDefault();  
       
        Session.set('female',null);
        Session.set('male',null);
        Session.set('english',null);
        Session.set('mobile',null);
        Session.set('sort', null);
        Session.set('day','');
        
        
      
      
    },
    'change #mobile': function (event, template) {
        
        var checked = event.target.checked;
        if (checked) {
            
            var location = new ReactiveVar();
            location.set(Geolocation.latLng())
            
            Session.set('userLocation', location.get());
                        
            
        }
       // console.log("subject : " + subject);
    },  
    
     
   
    
});



Template.advancedSearch.helpers({
  
    'userLocation': function(e) {
        count.set(Geolocation.latLng());
        return count.get();
      
    },
    
 
    
    
});


