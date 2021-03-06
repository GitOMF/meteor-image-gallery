Meteor.methods({
  // create an admin account when application is first launched
  // currently, only one account is allowed
    createAdminUser: function (user) {
      	if (Meteor.users.find().fetch().length > 0)
      		throw new Meteor.Error(403, 'An admin account already exists.'); 
       	check(user, registrationSchema);
       	Accounts.createUser({
          	email: user.email,
          	password: user.password
      	});

        // set the emailTo setting field
        if (!! Settings) {
          Settings.update({}, { $set: { "emailTo": user.email }});
        }
    },
  // checks if an account already exists
    hasAdmin: function () {
    	return ( Meteor.users.find().fetch().length > 0 );
    }
});

Meteor.users.allow({
      insert: function(userId) {
        return false;
      },
      update: function(userId) {
        return isAdminById(userId);
      },
      remove: function(userId) {
        return false;
      },
      fetch: []
  });