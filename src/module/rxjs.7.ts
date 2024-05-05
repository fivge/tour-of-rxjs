/**
 *
 */
import { of, timer, concat, forkJoin } from 'rxjs';
import { mapTo, mergeMap } from 'rxjs/operators';

import { Rxjs } from './rxjs';

export class Rxjs7 implements Rxjs {
  main() {
    // this.funConcat();
    // this.funForkJoin();
    this.funMergeMap();
  }

  private funConcat = () => {
    // 模拟 HTTP 请求
    const getPostOne$ = timer(3000).pipe(mapTo({ id: 1 }));
    const getPostTwo$ = timer(1000).pipe(mapTo({ id: 2 }));

    // 输出：49, { id: 1 } 52, { id: 2 } 53
    console.log(new Date().getSeconds());
    concat(getPostOne$, getPostTwo$).subscribe(res => console.log(res, new Date().getSeconds()));
  };

  private funForkJoin = () => {
    // 模拟 HTTP 请求
    const getPostOne$ = timer(3000).pipe(mapTo({ id: 1 }));
    const getPostTwo$ = timer(2000).pipe(mapTo({ id: 2 }));

    // 输出：
    // 46,
    // [ { id: 1 }, { id: 2 } ] 49
    console.log(new Date().getSeconds());
    forkJoin(getPostOne$, getPostTwo$).subscribe(res => console.log(res, new Date().getSeconds()));
  };

  private funMergeMap = () => {
    const post$ = timer(3000).pipe(mapTo({ id: 1 }));
    // const post$ = of({ id: 1 });
    const getPostInfo$ = timer(3000).pipe(mapTo({ title: 'Post title' }));

    // 输出：49, { title: 'Post title' } 55
    console.log(new Date().getSeconds());
    const posts$ = post$
      .pipe(mergeMap(post => getPostInfo$))
      .subscribe(res => console.log(res, new Date().getSeconds()));
  };
}
