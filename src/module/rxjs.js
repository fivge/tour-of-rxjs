import { of } from "../../node_modules/rxjs/bundles/rxjs.umd.js";
// import { map } from "../../node_modules/rxjs/bundles/rxjs.umd.js";

function f() {
  let source = of([1, 2, 3]);
  //   let data = source.pipe(map(res => res.push(4)));
  source.subscribe(res => console.log("subscribe success", res));
}

console.log("es6 module");

f();
