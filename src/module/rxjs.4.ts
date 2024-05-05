/**
 * interval timer
 * operators: mapTo()
 */
import { of, from } from 'rxjs';
// import { fromPromise } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

import { Rxjs } from './rxjs';

export class Rxjs4 implements Rxjs {
  main() {
    this.funMapTo();
  }

  private funMapTo = () => {
    // 基于输入来决定是 resolve 还是 reject 的示例 promise
    const myPromise = willReject => {
      return new Promise((resolve, reject) => {
        if (willReject) {
          reject('Rejected!');
        }
        resolve('Resolved!');
      });
    };

    // 先发出 true，然后是 false
    const example = of(true, false).pipe(
      mergeMap(val =>
        from(myPromise(val)).pipe(
          // 捕获并优雅地处理 reject 的结果
          catchError(error => of(`Error: ${error}`))
        )
      )
    );

    // 输出: 'Error: Rejected!', 'Resolved!'
    example.subscribe(val => console.log(val));
  };
}
