Messages = new Meteor.Collection('messages')
if (Meteor.isClient) {
  Session.setDefault("infocollectstage", 1)
}
