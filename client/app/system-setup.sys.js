import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import * as collections from '../../collections';

@inject(HttpClient)
export class SystemSetup{
  heading = 'System Setup';
  users = [];

  constructor(http){
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/');
    });

    this.http = http;
    Tracker.autorun(() =>{
      Meteor.subscribe('AllUsers')
      let userguy = collections.Users.find({}).fetch()[0]
      if (userguy) {
        let username = userguy.username
        console.log('from users');
        console.log(userguy);
      }
    })

    if (!Session.get("didnumber") && Session.get("insecureusername")) {
      //console.log("trying")
      Meteor.call("didnumber", Session.get("insecureusername"), function (e, r) {
        if (r) {
          console.log(r)
          Session.set("didnumber", r)
          return r
        } else {
          console.log(e)
          Session.set("didnumber", "server error")
          return "server error"
        }
      })
    }

  }

  mainnumber = Meteor.users.findOne({_id: Meteor.userId()}).username
  didnumber = Session.get("didnumber")

  insecureusername = Session.get("insecureusername")

  canActivate(username, didnumber){
    if (username) {
      if (Session.equals("collectinfostage", 2) && Session.get("didnumber")) {
        return true
      }
      else {
        return false
      }
    }
  }

  activate(){
    return this.http.fetch('users')
      .then(response => response.json())
      .then(users => this.users = users);
  }
}
