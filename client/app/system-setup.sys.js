import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
//import * as collections from '../../collections';
import {Users} from '../../collections';

@inject(HttpClient)
export class SystemSetup{
  didnumber: string;

  heading = 'System Setup';
  users = [];

  didnumber: string;

  constructor(http){
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    this.http = http;
    Tracker.autorun(() =>{
      Meteor.subscribe('AllUsers')
      let userguy = Users.find({}).fetch()[0]
      if (userguy) {
        let username = userguy.username
        console.log('from users');
        console.log(userguy);
      }

    })

    if (!Session.get("didnumber") && Session.get("insecureusername")) {
//do something?
    }
  }

  mainnumber = Meteor.users.findOne({_id: Meteor.userId()}).username
//  didnumber = Session.get("didnumber")

//  insecureusername = Session.get("insecureusername")
//  didnumber = Session.get("didnumber")
  didnumber = Session.get("didnumber")

  canActivate(didnumber){
    if (didnumber && didnumber != '' && didnumber != null) {
      console.log("canactivate() didnumber is " + didnumber)
      console.log("didnumber object keys " + Object.keys(didnumber))
      console.log("didnumber session variable is " + Session.get("didnumber"))
      return true
    }
    else {
      console.log("couldn't activate system-setup")
      console.log(Object.keys(username))
      return false
    }
  }

  activate(){
/*
      //console.log("trying")
      Meteor.call("didnumber", Session.get("insecureusername"), function (e, r) {
        if (r) {
          console.log(r)
          Session.set("didnumber", r)
          didnumber = r
        } else {
          console.log(e)
          Session.set("didnumber", e)
          didnumber = "error"
        }
      })
*/
    mainnumber = Meteor.users.findOne({_id: Meteor.userId()}).username
    if (Session.get("didnumber")) { 
      didnumber = Session.get("didnumber")
    }
    console.log("while activating didnumber was " + didnumber)
    return this.http.fetch('users')
      .then(response => response.json())
      .then(users => this.users = users);
  }

  attached() {
    console.log("attached()")
    if (!Session.get("didnumber") && Session.get("mainnumber")) {
      console.log("attached: username is " + Session.get("mainnumber"))
      //console.log("trying")
      Meteor.call("didnumber", Session.get("mainnumber"), function (e, r) {
        if (r) {
          console.log(r)
          Session.set("didnumber", r)
          didnumber = r
          console.log("attached didnumber from response was " + didnumber) 
//          return r
        } else {
          console.log(e)
          Session.set("didnumber", "server error")
          mainnumber = "server error"
//          return "server error"
        }
      })
    } else {
      console.log("attached didnumber from session variable was " + didnumber)
    }
  }
}
