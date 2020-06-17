/**
 * operators: mapTo() delay()
 */
import { interval, of } from 'rxjs';
import { mapTo, delay } from 'rxjs/operators';

import { Rxjs } from './rxjs';

export class Rxjs3 implements Rxjs {
  main() {
    this.funMapTo();
    this.funDelay();
  }

  private funMapTo = () => {
    const source = interval(2000);
    const example = source.pipe(mapTo(`cowsay`));
    // 输出: 'cowsay', 'cowsay', 'cowsay', 'cowsay', 'cowsay'...
    example.subscribe(console.log);
  };

  private funDelay = () => {
    const source = of('cat');
    const example = source.pipe(delay(2000));
    // 输出: 17, 'cat' 19
    console.log(new Date().getSeconds());
    example.subscribe(v => console.log(v, new Date().getSeconds()));

    // 输出: 'wtf' 2020-06-17T09:12:00.002Z
    // 超过指定时间之后: 'wtf' 2020-06-17T09:13:28.984Z
    of('wtf')
      .pipe(delay(new Date(2020, 5, 17, 17, 12)))
      .subscribe(v => console.log(v, new Date()));
  };
}
