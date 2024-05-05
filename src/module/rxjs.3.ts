/**
 * operators: mapTo() delay() tap()
 */
import { interval, of, throwError, from } from 'rxjs';
import { mapTo, delay, tap, map, catchError, mergeMap } from 'rxjs/operators';

import { Rxjs } from './rxjs';

export class Rxjs3 implements Rxjs {
  main() {
    // this.funMapTo();
    // this.funDelay();
    // this.funTap();
    // this.funCatch();
    this.funCatchPromise();
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

  private funTap = () => {
    const source = of(1, 2, 3, 4, 5);
    const example = source.pipe(
      tap(v => console.log(v)),
      map(v => v + 5),
      tap(v => console.log(v))
    );
    // 输出：1, 6, 6, 2, 7, 7, 3, 8, 8, 4, 9, 9, 5, 10, 10
    example.subscribe(console.log);
  };

  private funCatch = () => {
    const source = throwError('This is an error!');
    // 优雅地处理错误，并返回带有错误信息的 observable
    // const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
    const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
    // 输出: 'I caught: This is an error'
    const subscribe = example.subscribe(val => console.log(val));
  };

  private funCatchPromise = () => {
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
    // example.subscribe(val => console.log(val));

    from(myPromise(true)).subscribe(
      next => console.log(next),
      error => console.log(error),
      () => console.log('finish')
    );

    // myPromise(true)
    //   .then(next => console.log('then:', next))
    //   .catch(error => console.log('error', error))
    //   .finally(() => console.log('finish'));
  };
}
