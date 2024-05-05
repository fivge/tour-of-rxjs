import { Rxjs3 as Rxjs } from './module/rxjs.3';

export class Main {
  private rxjs = new Rxjs();

  run = () => this.rxjs.main();
}

let main = new Main();

main.run();
