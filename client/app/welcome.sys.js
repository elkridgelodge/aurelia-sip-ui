import {computedFrom} from 'aurelia-framework';
import {Router} from 'aurelia-router';

export class Welcome {

  static inject() {return [Router]; }

  heading : string;
  firstName : string;
  lastName : string;
  phoneNumber: string;
  eMail: string;
  previousValue: string;
  
  constructor(router){
    this.theRouter = router;
    this.heading = 'Welcome to the VOIP Site!';
    this.firstName = 'First';
    this.lastName = 'Last';
    this.phoneNumber = '8183334444';
    this.eMail = 'someemail@somedomain.com';
    this.previousValue = this.fullName;
  }

  @computedFrom('firstName', 'lastName', 'phoneNumber')
  get fullName() : string{
    return `${this.firstName} ${this.lastName} ${this.phoneNumber}`;
  }

  submit(){
    var phone = document.getElementById('pn').value
    var email = document.getElementById('em').value
    if (!phone) {
      alert("missing phone number")
    }
    if (!email) {
      alert("missing email")
    }
    if (email && phone) {
      Meteor.insecureUserLogin(phone)
      Session.set("mainnumber", phone)
      this.theRouter.navigate("system-setup")
      console.log("Form submitted.")
    }

  }


  canDeactivate() {
    if (Session.get("mainnumber") != '') {
      return true
    }
    else {
      console.log("couldn't deactivate")
      return false
    }
  }
}

export class UpperValueConverter {
  toView(value){
    return value && value.toUpperCase();
  }
}
