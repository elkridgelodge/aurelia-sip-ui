export class ChildRouter{
  heading = 'Child Router';

  configureRouter(config, router){
    config.map([
      { route: ['','welcome'],  name: 'welcome',      moduleId: 'client/welcome',      nav: true, title:'Welcome' },
      { route: 'users',         name: 'users',        moduleId: 'client/users',        nav: true, title:'Github Users' },
      { route: 'child-router',  name: 'child-router', moduleId: 'client/child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
