export class App {

  constructor(){
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


  configureRouter(config, router){
    config.title = 'VOIP Site';
    config.map([
      { route: ['','welcome'],  name: 'welcome',      moduleId: 'client/welcome',      nav: true, title:'Welcome' },
      { route: 'systemsetup',         name: 'systemsetup',        moduleId: 'client/systemsetup',        nav: true, title:'System Setup' },
      { route: 'child-router',  name: 'child-router', moduleId: 'client/child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
