export class App {
  configureRouter(config, router){
    config.title = 'VOIP Site';
    config.map([
      { route: ['','welcome'],  name: 'welcome',      moduleId: 'client/welcome',      nav: true, title:'Welcome' },
      { route: 'system-setup',         name: 'system-setup',        moduleId: 'client/system-setup',        nav: true, title:'System Setup' },
      { route: 'child-router',  name: 'child-router', moduleId: 'client/child-router', nav: true, title:'Child Router' }
    ]);

    this.router = router;
  }
}
