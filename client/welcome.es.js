import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';

export class Welcome{

  static inject() {return [Router]; }

  constructor(router){
    this.theRouter = router;
    this.owner = [];
    this.current_user = false;
    Meteor.subscribe("tasks");

    Tracker.autorun(() => {
      this.tasks = Tasks.find({}, {sort: {createdAt: -1}}).fetch();

      if (Session.get("hideCompleted")) {
        this.tasks = Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}}).fetch();
      } else {
        this.tasks = Tasks.find({}, {sort: {createdAt: -1}}).fetch();
      }

      this.userId = Meteor.userId();
      this.user = Meteor.user();

      if(this.user){
        this.current_user = true;
      } else {
        this.current_user = false;
      }

    });
  }

  heading = 'Welcome to the VOIP Site!';
  firstName = '';
  lastName = '';
  phoneNumber = '';
  previousValue = this.fullName;

  //Getters can't be observed with Object.observe, so they must be dirty checked.
  //However, if you tell Aurelia the dependencies, it no longer needs to dirty check the property.
  //To optimize by declaring the properties that this getter is computed from, uncomment the line below.
  //@computedFrom('firstName', 'lastName')
  get fullName(){
    return `${this.firstName} ${this.lastName} ${this.phoneNumber}`;
  }

  submit(){
/*
    var phone = document.getElementById('pn').value
    Session.set("insecureusername", phone)
    var email = document.getElementById('em').value
    var userObj = {}
    userObj.emails = [{address: email, verified: false}]
    userObj.phones = [{phone: phone, verified: false}]
    if (email && phone) {
      Meteor.insecureUserLogin(phone)
      Session.set("insecureloggedin", true)
      var userid = Meteor.userId()
      if (Session.equals("insecureloggedin", true) && Meteor.users.findOne({_id: userid})) {
        Meteor.call("newUser", userObj, function (e, r) {
          if (!e) {
            Meteor.insecureUserLogin(phone)
            console.log("insecure login success")
          } else {
            console.log(e)
          }
        })
      }
    } else if (!phone || phone == '') {
      alert("Missing phone number")
    } else {
      alert("Missing email")
    }
*/
    console.log("Form submitted.")

    Session.set("infocollectstage", 2)
    this.theRouter.navigate("users")
//    this.previousValue = this.fullName;
//    alert(Tasks.findOne().owner)
//    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate() {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
