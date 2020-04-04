/**
 * 输入提示（type-ahead）建议
 *
 * 可观察对象可以简化输入提示建议的实现方式。典型的输入提示要完成一系列独立的任务：
 * - 从输入中监听数据。
 * - 移除输入值前后的空白字符，并确认它达到了最小长度。
 * - 防抖（这样才能防止连续按键时每次按键都发起 API 请求，而应该等到按键出现停顿时才发起）
 * - 如果输入值没有变化，则不要发起请求（比如按某个字符，然后快速按退格）。
 * - 如果已发出的 AJAX 请求的结果会因为后续的修改而变得无效，那就取消它。
 */
import { fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from "rxjs/operators";

const searchBox = document.getElementById("search-box");

const typeahead = fromEvent(searchBox, "input").pipe(
  map((e) => e.target.value),
  filter((text) => text.length > 2),
  debounceTime(0.5 * 1000),
  distinctUntilChanged(),
  switchMap(() => ajax("https://random-word-api.herokuapp.com/word?number=10"))
);

typeahead.subscribe((data) => {
  // Handle the data from the API
});
