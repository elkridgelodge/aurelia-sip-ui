import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';

export class Welcome{

  static inject() {return [Router]; }

  constructor(router){
    this.theRouter = router;
  }

  heading = 'Welcome to the VOIP Site!';
  firstName = '';
  lastName = '';
  phoneNumber = '';
  eMail = '';

  //Getters can't be observed with Object.observe, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below.
  //@computedFrom('firstName', 'lastName')
  get fullName(){
    return `${this.firstName} ${this.lastName} ${this.phoneNumber}`;
  }

  submit(){
    var phone = document.getElementById('pn').value
    Session.set("insecureusername", phone)

    var email = document.getElementById('em').value
    var userObj = {}
    userObj.emails = [{address: email, verified: false}]
    userObj.phones = [{phone: phone, verified: false}]
    if (email && phone) {
      Meteor.insecureUserLogin(phone)
      Session.set("insecureloggedin", true)
    }

    console.log("Form submitted.")

    if (Session.get("insecureusername") && Meteor.userId() && Meteor.users.findOne({_id: Meteor.userId()}) && Meteor.users.findOne({_id: Meteor.userId()}).username) {
      Session.set("mainnumber", Meteor.users.findOne({_id: Meteor.userId()}).username)
console.log(Session.get("mainnumber"))
      this.theRouter.navigate("system-setup")
    }
  }

  canDeactivate() {
    if (Session.get("mainnumber") && Meteor.users.findOne({_id: Meteor.userId()})) {
      console.log(Meteor.userId())
      console.log(Meteor.users.findOne({_id: Meteor.userId()}))
      if (Meteor.users.findOne({_id: Meteor.userId()}).username) {
        console.log(Meteor.users.findOne({_id: Meteor.userId()}).username)
        Session.set("collectinfostage", 2)
        return true
      }
      else {
        return false
      }
    }
  }
}

export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
