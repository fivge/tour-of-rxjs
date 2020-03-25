import * as React from "react";
import * as ReactDOM from "react-dom";
import { Greeter as Greetifier, GreeterProps } from "./brower/greeter";

import { of } from "rxjs";
// import { map } from "rxjs/operators";

function getRandomGreeting() {
  let source = of({ name: "superman" });
  // let opt = source.pipe(map(v => (v.name = "speedman")));
  source.subscribe(console.log);
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      return "Hello";
    case 1:
      return "Howdy";
    case 2:
      return "Greetings to you";
    case 3:
      return "Hail";
  }
}

(() => {
  let props: GreeterProps = {
    whomToGreet: "world!"
  };

  ReactDOM.render(<Greetifier {...props} greeting={getRandomGreeting} />, document.getElementById("output"));
})();
