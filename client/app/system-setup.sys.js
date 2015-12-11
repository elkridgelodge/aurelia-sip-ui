import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

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
  }

  mainnumber = Session.get("mainnumber")
  didnumber = Session.get("didnumber")

  canActivate(didnumber){
    if (didnumber && didnumber != '' && didnumber != null) {
      return true
    }
    else {
      console.log("couldn't activate system-setup")
      return false
    }
  }

  activate(){
    mainnumber = Session.get("mainnumber")
    if (Session.get("didnumber")) {
      this.didnumber = Session.get("didnumber")
      console.log("this.didnumber being set by session variable " + this.didnumber)
    }
    if (!Session.get("didnumber") && Session.get("mainnumber")) {
      console.log("making the method call")
      return Promise.all([
        this.http.fetch('users').then(response => response.json()).then(users => this.users = users),
        Meteor.promise("didnumber", Session.get("mainnumber")).then(response => this.didnumber = response).then(response => Session.set("didnumber", response))
      ])
    } else {
      console.log("activate() didn't make method call ")
    }
  }
}
