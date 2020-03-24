import { interval } from "rxjs";
import { mapTo } from "rxjs/operators";

import { Rxjs } from "./rxjs";

export class Rxjs3 implements Rxjs {
  main() {
    this.intervalValue();
  }

  private intervalValue = () => {
    // 每1秒发出数字序列中的值
    const source = interval(1000).pipe(mapTo(`this is string`));
    const subscribe = source.subscribe(console.log);
  };
}
