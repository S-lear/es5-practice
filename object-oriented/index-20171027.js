// function foo() { 

//   function bar() { 
//     return 3; 
//   } 

//   return bar(); 

//   function bar() { 
//     return 8; 
//   }
// }
// console.log(foo());

// function foo() {
//   var bar = function () {
//     return 3;
//   }

//   return bar()

//   var bar = function () {
//     return 8;
//   };
// }
// console.log(foo())

// console.log(foo());

// function foo() {
//   var bar = function () {
//     return 3;
//   };
//   return bar();
//   var bar = function () {
//     return 8;
//   };
// }

// function foo() {
//   var bar;
//   return bar();

//   var bar = function () {
//     return 3;
//   };

//   var bar = function () {
//     return 8;
//   };
// }
// console.log(foo());

var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
});

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});
