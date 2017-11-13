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

// var p1 = Promise.resolve(3);
// var p2 = 1337;
// var p3 = new Promise((resolve, reject) => {
// });

// Promise.all([p1, p2, p3]).then(values => {
//   console.log(values); // [3, 1337, "foo"]
// });

// var table = new Array(10)

// for(var i = 0; i < table.length; i++) {
//   table[i] = new Array(10)
// }
// for(var row = 0; row < table.length; row++) {
//   for(var col = 0; col < table[row].length; col++) {
//     table[row][col] = row * col
//   }
// }
// console.log(table[3][5])


// function foreach(a, f, t) {
//   try{
//     a.forEach(f, t);
//   } catch(e) {
//     if(e === foreach.break) return;
//     else throw e;
//   }
// }

// foreach.break = new Error(2);

// foreach([1,2,3,4],console.log)

// var geval = eval;
// var x = 'global';
// var y = 'global';
// function f(){
//   var x = 'local';
//   eval('x += "changed"');
//   return x;
// }

// function g() {
//   var y = 'local';

//   return y;
// }

// console.log(f(), '....', x)
// console.log(g(), '....', y)

// var pattern = /s$/
// var pattern = new RegExp('s$');
// const JavaScript = 'javascript'
// const j = "JavaScript".search(/script/i)
// console.log(j)
// const J = JavaScript.replace(/javascript/gi, "JavaScript")
// console.log(J)
// var quote = /"([^"]*)"/g;
// var text = '"abcd"';
// console.log(text.replace(quote, "“$1”"))
// console.log(text)

// var url = /(\w+):\/\/([\w.]+)\/(\S*)/;
// var text1 = "Visit my blog at http://www.example.com/~david"
// var result = text1.match(url)
// if(result != null) {
//   var fullurl = result[0]
//   var protocol = result[1]
//   var host = result[2]
//   var path = result[3]
// }
// console.log(result)

// function range(min, max) {
//   return {
//     get min() {return min},
//     get max() {return max},
//     includes: function(x) {return min < x && x <= max},
//     toString: function() {return "[" + min + "," + max + "]"},
//     _iterator_: function() {
//       let val = Math.ceil(min);
//       return {
//         next: function() {
//           if(val > max) throw StopIteration;
//           return val++
//         }
//       }
//     }
//   }
// }
// for (let i in range(1, 10)) console.log(i);

// function range(min, max) {
//   for (let i = Math.ceil(min); i <= max; i++) yield i;
// }

// console.log(range(1,2))
// for (let n in range(3, 8)) console.log(n);
// function eachline(s) {
//   let p;
//   while((p = s.indexOf('\n')) != -1) {
//     yield s.substring(0, p);
//     s = s.substring(p+1)
//   }
//   if(s.length > 0) yield s;
// }

// function map(i, f) {
//   for(let x in i) yield f(x);
// }

// function select(i, f) {
//   for(let x in i) {
//     if(f(x)) yield x;
//   }
// }

// let text = " #comment \n \n hello \nworld\n quit \n unreached \n";

// let lines = eachline(text)

// let trimmed = map(lines, function(line) {return line.trim();});

// let nonblank = select(trimmed, function(line) {
//   return line.length > 0 && line[0] != "#";
// })

// for(let line in nonblank) {
//   if(line === 'quit') break;
//   console.log(line);
// }



// function counter(initial) {
//   let nextValue = initial;
//   while(true) {
//     try{
//       let increment = yield nextValue;
//       if(increment) {
//         nextValue += increment
//       } else {
//         nextValue++
//       }
//     } catch(e) {
//       if(e === 'teset') {
//         nextValue = initial
//       } else {
//         throw e;
//       }
//     }
//   }
// }

// let c = counter(10);
// console.log(c.next())
// console.log(c.send(2))
// console.log(c.throw('reset'))

try {
  throw 1
} catch(e) {
  console.log(e)
}