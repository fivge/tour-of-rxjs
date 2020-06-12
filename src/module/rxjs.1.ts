/**
 * of from
 * operators: map()
 * javascript: array.map()
 */
import { from, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Rxjs } from './rxjs';

/** map() */
export class Rxjs1 implements Rxjs {
  main() {
    // this.funOf();
    // this.funFrom();
    this.funMapFrom();
    this.funMapOf();
  }

  private funOf = () => {
    const source = of(1, 2, 3, 4, 5, { name: 'Brian' }, [1, 2, 3], function hello() {
      return 'Hello';
    });
    // 输出：1, 2, 3, 4, 5, { name: 'Brian' }, [1, 2, 3], function hello() {return 'Hello';}
    source.subscribe(console.log);
  };

  private funFrom = () => {
    const source = from([1, 2, 3, 4, 5, { name: 'Brian' }, 'foooooo']);
    // 输出：1, 2, 3, 4, 5, { name: 'Brian' }, 'foooooo'
    source.subscribe(console.log);

    // 字符串
    // 输出：f, o, o, o, o, o
    from('fooooo').subscribe(console.log);

    // 迭代器
    function* generateDoubles(seed) {
      var i = seed;
      while (true) {
        yield i;
        i = 2 * i; // double it
      }
    }
    // 输出：3, 6, 12, 24, 48, 96, 192, 384, 768, 1536
    from(generateDoubles(3)).pipe(take(10)).subscribe(console.log);
  };

  private funMapFrom = () => {
    const source = from([1, 2, 3, 4, 5]);
    const example = source.pipe(map(val => val + 10));
    // 输出: 1, 2, 3, 4, 5
    // 不会改变已经存在的 Observable 实例
    source.subscribe(res => console.log('from', res));
    // 输出: 11,12,13,14,15
    example.subscribe(res => console.log('from map', res));
  };

  private funMapOf = () => {
    const source = of([1, 2, 3, 4, 5], [6, 7, 8, 9]);
    const example = source.pipe(map(vals => vals.map(val => val + 10)));
    // 输出: [ 11, 12, 13, 14, 15 ], [ 16, 17, 18, 19 ]
    example.subscribe(console.log);
  };
}
