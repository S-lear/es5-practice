var p = Object.defineProperties({}, {
  x: {
    value: 1, writable: true, enumerable: true, configurable: true
  }
})



/*var o = {}
Object.defineProperty(o, 'x', {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: true
})

o.x = 2
console.log(Object.keys(o))
console.log(o.x)
Object.defineProperty(o, 'x', {
  value: 2,
  writable: false,
  enumerable: true,
  configurable: true
})
console.log(o.x)

Object.defineProperty(o, 'x', {
  get(){return 0}
})

console.log(o.x)
*/
/*var o = {}
Object.defineProperty(o, 'x', {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true
})
for(i in o){
  console.log(i)
}
console.log(Object.keys(o))
*/
