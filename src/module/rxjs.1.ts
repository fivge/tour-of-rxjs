/**
 * from of
 * operators: map()
 * javascript: array.map()
 */
import { from, of } from "rxjs";
import { map } from "rxjs/operators";

import { Rxjs } from "./rxjs";

/** map() */
export class Rxjs1 implements Rxjs {
  main() {
    this.funMapFrom();
    this.funMapOf();
  }

  private funMapFrom = () => {
    const source = from([1, 2, 3, 4, 5]);
    const example = source.pipe(map(val => val + 10));
    // 输出: 11,12,13,14,15
    const subscribe = example.subscribe(console.log);
  };

  private funMapOf = () => {
    const source = of([1, 2, 3, 4, 5]);
    const example = source.pipe(map(vals => vals.map(val => val + 10)));
    // 输出: [ 11, 12, 13, 14, 15 ]
    const subscribe = example.subscribe(console.log);
  };
}
