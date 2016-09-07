Template.filters.rendered = function(){
         $('.datetimepicker').datetimepicker({
            date: moment(Session.get('day'),'ddd MMM Do YY').toDate(),
           // pickTime: false,
            format: "ddd MMM Do YY" 
         });
       
};
      

Template.filters.events({
  
    'click #btnSearch': function(e) {
        e.preventDefault();  
       
        var form = $('form[name="filterForm"]');        
        
        Session.set('day', form.find('[name=idInput]').val())   ;
      
        //document.location.reload(true);
      
    },
    
    
    
});


Template.filtersMain.rendered = function(){
         $('.datetimepicker').datetimepicker({
            date: moment(Session.get('day'),'ddd MMM Do YY').toDate(),
           // pickTime: false,
            format: "ddd MMM Do YY" 
         });
       
};
      

Template.filtersMain.events({
  
    'click #btnSearch': function(e) {
        e.preventDefault();  
       
        var form = $('form[name="filterForm"]');        
        
        Session.set('day', form.find('[name=idInput]').val())   ;
      
        Router.go('providers');
      
    },
    
    
    
});