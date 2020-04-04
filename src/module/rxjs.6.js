/**
 * 指数化退避
 *
 * 指数化退避是一种失败后重试 API 的技巧，它会在每次连续的失败之后让重试时间逐渐变长，
 * 超过最大重试次数之后就会彻底放弃
 */
import { pipe, range, timer, zip } from "rxjs";
import { ajax } from "rxjs/ajax";
import { retryWhen, map, mergeMap } from "rxjs/operators";

function backoff(maxTries, ms) {
  return pipe(
    retryWhen((attempts) =>
      zip(range(1, maxTries), attempts).pipe(
        map(([i]) => i * i),
        mergeMap((i) => timer(i * ms))
      )
    )
  );
}

ajax("/api/endpoint")
  .pipe(backoff(3, 250))
  .subscribe((data) => handleData(data));

function handleData(data) {
  // ...
}
