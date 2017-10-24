function inherit(p){
  if(p == null) throw TypeError();
  if(Object.create) return Object.create(p);
  var t = typeof p;
  if(t != 'object' && t != 'function') throw TypeError();
  function f() {};
  f.prototype = p;
  return new f();
}
/*var o = {}
o.x = 1
var p = inherit(o)
console.log(p)
p.y = 2
var q = inherit(p)
console.log(q)
q.z = 3
var s = q.toString()
console.log(q.x + q.y)
var u = {r: 1}
var c = inherit(u)
c.x= 1;
c.y = 1
c.r = 1
console.log(u.r)
*/

/*var o = inherit({y: 2})

o.x = 1

console.log(o.propertyIsEnumerable('x'))
console.log(o.propertyIsEnumerable('y'))
console.log(Object.prototype.propertyIsEnumerable('toString'))
*/


function merge(o, p){
  for (prop in p){
    if(o.hasOwnProperty(prop)) continue;
    o[prop] = p[prop]
  }
  return o;
}

function restrict(o, p) {
  for (prop in o) {
    if(!(prop in p)) delete o[prop]
  }
  return o;
}

function subtract(o, p) {
  for(prop in p) {
    delete o[prop]
  }
  return o;
}

function extend(o, p){
  for(prop in p){
    o[prop] = p[prop]
  }
  return o;
}

function union(o, p){
  return extend(extend({}, o), p)
}

function intersection(o, p) {
  return restrict(extend({}, o), p)
}

function keys(o){
  if(typeof o !== 'object') throw TypeError();
  var result = [];
  for(var prop in o) {
    if(o.hasOwnProperty(prop)) {
      result.push(prop)
    }
  }
  return result;
}

var p = {
  x: 1,
  y: 1,
  z: 0,
  get r(){
    return Math.sqrt(this.x*this.x + this.y*this.y);
  },
  set r(newValue){
    this.z = newValue
    var oldValue = Math.sqrt(this.x*this.x + this.y*this.y);
    var ratio = newValue/oldValue
    this.x = ratio
    this.y = ratio
  },
  get theta(){
    return Math.atan2(this.y, this.x)
  }
}
p.r = 10
console.log(p.z)
console.log( p.r)
