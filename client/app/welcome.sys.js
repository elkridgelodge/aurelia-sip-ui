import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Users} from '../../collections'

export class Welcome {

  static inject() {return [Router]; }

  heading : string;
  firstName : string;
  lastName : string;
  phoneNumber: string;
  eMail: string;
  previousValue: string;
  username: string;

  constructor(router){
    this.theRouter = router;
    this.heading = 'Welcome to the VOIP Site!';
    this.firstName = 'Liu';
    this.lastName = 'Ping';
    this.phoneNumber = '';
    this.eMail = '';
    this.previousValue = this.fullName;
    this.username = 'test';

    Tracker.autorun(() =>{
      Meteor.subscribe('AllUsers')
      let userthing = Users.find({}).fetch()[0]
      if (userthing) {
        let username = userthing.username
        console.log("ahem the userthing " + userthing)
        console.log("ahem the username" + userthing.username)
      }
    })

  }

  //Getters can't be observed with Object.observe, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below.
  @computedFrom('firstName', 'lastName')
  get fullName() : string{
    return `${this.firstName} ${this.lastName} ${this.phoneNumber}`;
  }

  submit(){
    if (document.getElementById('pn').value) {
      var phone = document.getElementById('pn').value
    } else {
      alert("missing phone number")
    }
    Session.set("insecureusername", phone)

    var email = document.getElementById('em').value
    var userObj = {}
    userObj.emails = [{address: email, verified: false}]
    userObj.phones = [{phone: phone, verified: false}]
    if (email && phone) {
      Meteor.insecureUserLogin(phone)
      Session.set("insecureloggedin", true)
    } else if (!phone) {
        alert("missing phone number")
    } else if (!email) {
        alert("missing email")
    }

    if (Session.get("insecureloggedin")) {
      console.log("insecureloggedin is working")
    }

    if (Session.get("insecureusername")) {
      this.username = Session.get("insecureusername")
      Session.set("mainnumber", this.username)
      console.log("username is " + this.username)
      console.log(Session.get("mainnumber"))
      Session.set("infocollectstage", 2)
      this.theRouter.navigate("system-setup")
      console.log("Form submitted.")
    }

  }


  canDeactivate(username) {
    if (1 == 1) {
      console.log("canDeactivate " + this.username)
      return true
    }
    else {
      return false
    }
  }

  deactivate() {
    console.log('the username is ' + this.username)
  }
}

export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
