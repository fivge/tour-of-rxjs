/**
 * from of
 * operators: map()
 * javascript: array.map()
 *
 * <https://rxjs-cn.github.io/learn-rxjs-operators/operators/transformation/switchmap.html>
 */
import { timer, interval, from, of, SchedulerLike } from "rxjs";
import { switchMap, map, mapTo, mergeMap, delay } from "rxjs/operators";

/** map() */
export class Rxjs2 {
  main() {
    // this.funSwitchMap();
    // this.funSwitchMapFrom();
    // this.funMapFrom();
    this.delayDemon();
  }

  private funSwitchMap = () => {
    // 立即发出值， 然后每5秒发出值
    const source = timer(0, 5000);
    // 当 source 发出值时切换到新的内部 observable，发出新的内部 observable 所发出的值
    // const example = source.pipe(switchMap(() => interval(500)));
    const example = source.pipe(() => interval(500));
    // 输出: 0,1,2,3,4,5,6,7,8,9...0,1,2,3,4,5,6,7,8
    const subscribe = example.subscribe(console.log);
  };

  private funSwitchMapFrom = () => {
    const source = from([1, 2, 3, 4, 5]);
    const getHero = id => of(`0x${id}`).pipe(() => interval(2000).pipe(mapTo(`pid: ${id}`)));
    // .switchMap(term => this.searchService.search(term))
    const example = source.pipe(switchMap(params => getHero(params)));
    // 输出: 11,12,13,14,15
    const subscribe = example.subscribe(res => console.log("switchMap:", res));
  };

  private funMapFrom = () => {
    const source = from([1, 2, 3, 4, 5]);
    const getHero = id => `0x${id}`;
    const example = source.pipe(map(params => getHero(params)));
    // 输出: 11,12,13,14,15
    const subscribe = example.subscribe(res => console.log("map:", res));
  };

  private delayDemon = () => {
    const source = from([0, 1, 3, 5]).pipe(mergeMap((val, index) => of(val).pipe(delay(5000 * index))));
    // interval(300).pipe(mapTo('aaa'))
    const example = source.pipe(switchMap(val => interval(3000).pipe(mapTo(`i: ${val * 10}`))));

    // const getHero = id => `0x${id}`;
    // 输出: 11,12,13,14,15
    const subscribe = example.subscribe(res => console.log("map:", res, new Date()));
  };

  private schedulerLike: SchedulerLike;
}

// ngOnInit() {
//   this.hero$ = this.route.paramMap.pipe(
//     switchMap((params: ParamMap) =>
//       this.service.getHero(params.get('id')))
//   );
// }

// this.hero$.subscribe(res => console.log(res)); // {id:'1',name:'superman'}

// this.id$ = this.route.paramMap.pipe(map(params => params.get('id')));
// 你可能想使用 RxJS 的 `map` 操作符。 但 `HeroService` 返回的是一个 `Observable`。 所以你要改用 `switchMap` 操作符来打平这个 `Observable`
