Template.users.helpers({
  'getUsers' : function(){
    return Meteor.users.find();
  }
});
