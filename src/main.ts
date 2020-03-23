import { Rxjs1 as Rxjs } from "./module/rxjs.1";

export class Main {
  private rxjs = new Rxjs();

  run = () => this.rxjs.main();
}

let main = new Main();

main.run();
