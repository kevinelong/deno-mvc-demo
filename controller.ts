
interface Callback {
  (): string;
}
interface Routes {
    [name: string]: Callback
}

export class Controller{

  routes:Routes;

  constructor(routes:Routes){
    this.routes = routes;
  }

  get(key:string):Callback{
    return this.routes[key];
  }

}
