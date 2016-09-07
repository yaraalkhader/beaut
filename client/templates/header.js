import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './header.html';



Template.header.helpers({
   
    userName : function(event) {
      return Meteor.user().profile.name;
    },
    
  
});


Template.header.events({
    'click #facebook-login': function(event) {
      event.preventDefault();  
     
      Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },
 
    'click #logout': function(event) {
        
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});