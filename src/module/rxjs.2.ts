/**
 * interval timer
 * operators: switchMap()
 */
import { timer, interval, fromEvent } from 'rxjs';
import { switchMap, mapTo } from 'rxjs/operators';

import { Rxjs } from './rxjs';

export class Rxjs2 implements Rxjs {
  main() {
    // this.funInterval();
    // this.funTimer();
    this.funSwitchMap();
  }

  private funInterval = () => {
    // 每1秒发出数字序列中的值
    const source = interval(1000);
    // 输出: 25s, 0 26s, 1 27s, 2 28s, 3 29s, 4 30s, 5 31s, 6 32s, 7 33s, 8 34s...
    console.log(new Date().getSeconds());
    source.subscribe(val => console.log(val, new Date().getSeconds()));
  };

  private funTimer = () => {
    // 1秒后发出0，然后结束，因为没有提供第二个参数
    const source0 = timer(1000);
    // 输出: 25s, 0 26s
    console.log(new Date().getSeconds());
    source0.subscribe(val => console.log(val, new Date().getSeconds()));

    // timer 接收第二个参数，它决定了发出序列值的频率，在本例中我们在1秒发出第一个值，然后每2秒发出序列值
    const source = timer(1000, 2000);
    // 输出: 54s, 0 55s, 1 57s, 2 59s, 3 1s, 4 3s, 5 5s, 6 7s, 7 9s, 8 11s, 9 13s, 10 15s, 11 17s, 12 19s......
    console.log(new Date().getSeconds());
    source.subscribe(val => console.log(val, new Date().getSeconds()));
  };

  private funSwitchMap = () => {
    // 立即发出值， 然后每5秒发出值
    const source = timer(0, 5000);

    // 当 source 发出值时切换到新的内部 observable，发出新的内部 observable 所发出的值
    const example = source.pipe(switchMap(() => timer(0, 500)));
    // 输出: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8,9
    console.log(new Date().getSeconds());
    example.subscribe(res => console.log(res, new Date().getSeconds()));
  };

  public funSwitchMapHtml = () => {
    // 发出每次点击
    const source = fromEvent(document, 'click');
    // 如果3秒内发生了另一次点击，则消息不会被发出
    const example = source.pipe(switchMap(() => interval(1000).pipe(mapTo('Hello, I made it!'))));
    // (点击)...3s...'Hello I made it!'...(点击)...2s(点击)...
    example.subscribe(val => console.log(val));
  };
}
