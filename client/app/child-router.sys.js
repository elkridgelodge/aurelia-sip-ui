export class ChildRouter{
  heading = 'Child Router';

  configureRouter(config, router){
    config.map([
      { route: ['','welcome'],  name: 'welcome',       moduleId: 'client/app/welcome',       nav: true, title:'Welcome' },
      { route: 'system-setup',         name: 'system-setup',         moduleId: 'client/app/system-setup',         nav: true, title:'System Setup' },
      { route: 'todo',          name: 'todo',         moduleId: '/client/app/todo',        nav: true, title:'Todo'},
      { route: 'child-router',  name: 'child-router',  moduleId: 'client/app/child-router',  nav: true, title:'Child Router' },
    ]);

    this.router = router;
  }
}
