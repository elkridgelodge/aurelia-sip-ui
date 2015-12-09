import {inject} from 'aurelia-framework'
import {HttpClient} from 'aurelia-fetch-client'
import {Router} from 'aurelia-router'

@inject(HttpClient)
export class SystemSetup{

  static inject() {return [Router]; }

  heading = 'Secondary Checkout'
  users = []

  constructor(http, router){
    this.theRouter = router;
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://api.github.com/')
    })

    this.http = http

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

  canActivate(){
    if (Meteor.userId() &&  Meteor.users.findOne({_id: Meteor.userId()}) &&  Meteor.users.findOne({_id: Meteor.userId()}).username) {
      if (Session.equals("collectinfostage", 2)) {
        return true
      }
    }
  }

  activate(){
    return this.http.fetch('users')
      .then(response => response.json())
      .then(users => this.users = users)
  }
}
