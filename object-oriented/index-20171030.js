var arr1 = new Array(10)
arr1[11] = 11
console.log(arr1.length)

var a1 = [, , ,]
var a2 = [,]
var a3 = new Array(10)
var a4 = []
var a5 = [undefined]
var a6 = {a: 1}
var a7 = function(x, y,z){}

var a8 = [1,2,3,4,5,6,7]
// Object.defineProperty(a8, 'length', {writable: false})

Object.seal(a8)
a8.length = 3
a8[0] = 0
var a9 = [1,2,3,4]
delete a9[0]
var a10 = [,, , 10,11]
console.log(0 in a1)
console.log(0 in a2)
console.log(0 in a3)
console.log(0 in a4)
console.log(0 in a5)
console.log(a6.length)
console.log(a7.length)
console.log(a8)
console.log(a9)
console.log(a9.pop())
console.log(a9.shift())
console.log(a9)
console.log(a9.splice(0,2,9))
console.log(a9)

for(a in a10) {
  console.log(a10.hasOwnProperty(a))
  console.log('...', a10[a])
}

var a11 = [1,2,3,4,56,[1,2]]
// console.log(a11.slice(0, 3))
console.log(a11.toLocaleString('|'))