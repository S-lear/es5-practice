function Set(){
  this.values = {};
  this.n = 0;
  console.log(arguments)
  this.add.apply(this,arguments)
}

Set.prototype.add = function(){
  for(var i = 0; i < arguments.length; i++){
    var val = arguments[i];
    var str = Set._v2s(val);
    if(!this.values.hasOwnProperty(str)){
      this.values[str] = val
      this.n++;
    }
  }
  return this.values;
}
Set.prototype.remove = function(){
  for(var i = 0; i < arguments.length; i++) {
    var str = Set._v2s(arguments[i])
    if(this.values.hasOwnProperty(str)) {
      delete this.values[str]
      this.n--
    }
  }
  return this.values
}

Set.prototype.contains = function(value){
  return this.values.hasOwnProperty(Set._v2s(value));
}

Set.prototype.size = function(){
  return this.n
}

Set.prototype.foreach = function(f, context){
  for(var s in this.values){
    if(this.values.hasOwnProperty(s)){
      f.call(context, this.values[s])
    }
  }
}

Set._v2s = function(val){
  switch(val){
    case undefined: return 'u';
    case null: return 'n';
    case true: return 't';
    case false: return 'f';
    default: switch(typeof val) {
      case 'number': return '#' + val;
      case 'string': return '"' + val;
      default: return '@' + objectId(val);
    }
  }
  function objectId(o){
    var prop = '[**object**]';
    if(!o.hasOwnProperty(prop)) {
      o[prop] = Set._v2s.next++;
    }
    return o[prop]
  }
}

Set._v2s.next = 100
var s = new Set()
console.log(s)
console.log(s.add('a', 'b'))
// console.log(s.remove('a'))
// console.log(s.contains('b'))
// console.log(s.size())
// s.foreach((i)=>{console.log(i)}, null)


function enumeration(namesToValues){
  var enumeration = function(){
    throw "Can't Instantiate Enumerations"
  }
  var proto = enumeration.prototype = {
    constructor: enumeration,
    toString: function() {return this.name},
    valueOf: function(){return this.value},
    toJSON: function(){return this.name}
  }

  enumeration.values = []

  for(name in namesToValues) {
    var e = inherit(proto);
    e.name = name;
    e.value = namesToValues[name];
    enumeration[name] = e
    enumeration.values.push(e)
  }

  enumeration.foreach = function(f, c) {
    for(var i = 0; i < this.values.length; i++){
      f.call(c, this.values[i])
    }
  }
  return enumeration;
}
function inherit(p){
  if(p == null) throw TypeError();
  if(Object.create){
    return Object.create(p);
  }
  var t = typeof p;
  if(t !== 'object' && t !== 'function') throw TypeError();
  function f() {};
  f.prototype = p;
  return new f();
}
// var Coin = enumeration({Penny: 1,Nickel: 2, Dime: 10, Quarter: 25});

// var c = Coin.Dime
// console.log(Coin)
// console.log(c.name)
// console.log(c.value)
// console.log(Coin.Dime == 10)
// console.log(Coin.values)

function Card(suit, rank){
  this.suit = suit
  this.rank = rank
}


Card.Suit = enumeration({Clubs: 1, Diamonds: 2, Hearts: 3, Spades: 4});

Card.Rank = enumeration({Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10, Jack: 11, Queen: 12, King: 13, Ace: 14})

Card.prototype.toString = function(){
  return this.rank.toString() + 'of' + this.suit.toString();
}

Card.prototype.compareTo = function(that){
  if(this.rank < that.rank) return -1;
  if(this.rank > that.rank) return 1;
  return 0;
}

Card.orderByRank = function(a, b){
  return a.compareTo(b);
}

Card.orderBySuit = function(a, b){
  if(a.suit < b.suit) return -1;
  if(a.suit > b.suit) return 1;
  if(a.rank < b.rank) return -1;
  if(a.rank > b.rank) return 1;
  return 0;
}

var S = new Card(1, 5)
console.log('S..........', S.compareTo({rank: 3}))

function extend(o, p) {
  for(prop in p) {
    o[prop] = p[prop]
  }
  return o;
}
var e = {
  toString: function(){
    var s = '{'
    var i = 0
    this.foreach(function(v){
      s += ((i++) ? ',' : '') + v
    })
    return s + '}'
  },
  toLocaleString: function() {
    var s = '{'
    var i = 0
    this.foreach(function(v){
      if(i++) s += ',';
      if(v == null) s += v;
      else s += v.toLocaleString()
    })
    return s + '}';
  },
  toArray: function() {
    var a = [];
    this.foreach(function(v){
      a.push(v)
    })
    return a;
  }
}
extend(Set.prototype, e)
Set.prototype.toJSON = Set.prototype.toArray
console.log('string', s.toString())
console.log('Array', s.toArray())
console.log('JSON', s.toJSON())

Set.prototype.equals = function(that){
  if(this === that) return true;
  if(!(that instanceof this)) return false;
  if(this.size() != that.size()) return false;
  try{
    this.foreach(function(v){
      if(!that.contains(v)) throw false;
      return true;
    })
  } catch(x){
    if(x === false) return false;
    throw x;
  }
}

var generic = {
  toString: function() {
    var s = '[';
    if(this.constructor && this.constructor.name) {
      s += this.constructor.name + ':';
    }
    var n = 0;
    for(var name in this) {
      if(!this.hasOwnProperty(name)) continue;
      var value = this[name];
      if(typeof value === 'function') continue;
      if(n++) s += ', ';
      s += name + '=' + value;
    }
    return s + ']';
  },
  equals: function(that) {
    if(that==null) return false;
    if(this.constructor !== that.constructor) return false;
    for(var name in this){
      if(name === '|**object**|') continue;
      if(!this.hasOwnProperty(name)) continue;
      if(this[name] !== that[name]) return false;
    }
    return true;
  }
}

function defineSubclass(superclass, constructor, methods, static) {
  constructor.prototype = inherit(superclass.prototype)
  constructor.prototype.constructor = constructor
  if(methods) extend(constructor.prototype, methods);
  if(static) extend(constructor, static);
  return constructor;
}

Function.prototype.extend = function (constructor, methods, static) {
  return defineSubclass(this, constructor, methods, static)
}

function SingletonSet (member) {
  this.member = member
}

SingletonSet.prototype = inherit(Set.prototype);
extend(SingletonSet.prototype, {
  constructor: SingletonSet,
  add: function(){throw 'read-only set'},
  remove: function() {throw 'read-only set'},
  size: function() {return 1;},
  foreach: function(f, context) {f.call(context, this.member)},
  contains: function(x) {return x === this.member}
})

SingletonSet.prototype.equals = function (that) {
  return that instanceof Set && that.size() == 1 && that.contains(this.member)
}

function NonNullSet() {
  Set.apply(this, arguments)
}

NonNullSet.prototype = inherit(Set.prototype)
NonNullSet.prototype.constructor = NonNullSet
NonNullSet.prototype.add = function() {
  for(var i = 0; i < arguments.length; i++) {
    if(arguments[i] == null) {
      throw new Error("Can't add null or undefined to number");
    }
    return Set.prototype.add.apply(this, arguments);
  }
}

var StringSet = filteredSetSubclass(Set, function(x){
  return typeof x === 'string'
})

var MySet = filteredSetSubclass(NonNullSet, function(x){
  return typeof x !== 'function'
})

function filteredSetSubclass(superclass, filter) {
  var constructor = function() {
    superclass.apply(this, arguments)
  }
  var proto = constructor.prototype = inherit(superclass.prototype)
  proto.constructor = constructor
  proto.add = function() {
    for(var i = 0; i < arguments.length; i++) {
      var v = arguments[i];
      if(!filter(v)) throw ('value' + v + 'rejected by filter');
    }
    superclass.prototype.add.apply(this, arguments);
  }
  return constructor;
}

var NonNullSet = (function(){
  var superclass = Set;
  return superclass.extend(function() {
    superclass.apply(this, arguments)
  }, {
    add: function() {
      for(var i = 0; i < arguments.length; i++) {
        if(arguments[i] == null) {
          throw new Error("can't add null or undefined")
        }
      }
      return superclass.prototype.add.apply(this, arguments)
    }
  })
}());

var FilteredSet = Set.extend(function FilteredSer(set, filter){
  this.set = set;
  this.filter = filter;
},
{
  add: function() {
    if(this.filter) {
      for(var i = 0; i < arguments.length; i++) {
        var v = arguments[i];
        if(!this.filter(v)) throw new Error("FilterSet: value " + v + "rejected by filter");
      }
      this.set.add.apply(this.set, arguments);
    }
  },
  remove: function() {
    this.set.remove.apply(this.set, arguments);
    return this;
  },
  contains: function(v) {
    return this.set.contains(v)
  },
  size: function() {
    return this.set.size()
  },
  foreach: function(f, c) {
    this.set.foreach(f, c)
  }
})

var s = new FilteredSet(new Set(), function(x) { return x !== null })
var t = new FilteredSet(function(x) {return !(x instanceof Set)})