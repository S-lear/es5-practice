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

function extend(o, p) {
  for(prop in p) {
    o[prop] = p[prop]
  }
  return o;
}

function abstractmethod() {throw new Error('abstract method')};

function AbstractSet() {throw new Error("Can't instantiate abstract classes")};

AbstractSet.prototype.contains = abstractmethod;

var NotSet = AbstractSet.extend(function NotSet(set) {
  this.set = set;
},{
  contains: function(x) {return !this.set.contains(x)},
  toString: function(x) {return '-' + this.set.toString()},
  equals: function(that) {return that instanceof NotSet && this.set.equals(that.set)}
})

var AbstractEnumerableSet = AbstractSet.extend(function(){throw Error("Can't instantiate abstract classes")},{
  size: abstractmethod,
  foreach: abstractmethod,
  isEmpty: function() {return this.size() == 0},
  toString: function() {
    var s = '{';
    var i = 0;
    this.foreach(function(v) {
      if(i++ > 0) {
       s += ',';
       s += v;
      }
    });
    return s + '}'
  },
  toLocaleString: function() {
    var s = "{";
    var i = 0;
    this.foreach(function(v) {
      if(i++) {
        s += ',';
      }
      if(v == null) {
        s += v
      } else {
        s += v.toLocalestring();
      }
    })
    return s += '}';
  },
  toArray: function() {
    var a = [];
    this.foreach(function(v) {a.push(v)});
    return a;
  },
  equals: function(that) {
    if(!(that instanceof AbstractEnumerableSet)) return false;
    if(this.size() != that.size()) return false;
    try {
      this.foreach(function(v) {
        if(!that.contains(v)) throw false;
        return true;
      })
    } catch(x) {
      if(x === false) return false;
      throw x;
    }
  }
})

var SingletonSet = AbstractEnumerableSet.extend(function SingletonSet(member){this.member == member}, {
  contains: function(x) {return x === this.member},
  size: function() {return 1},
  foreach: function(f, ctx) {f.call(ctx, this.member)}
})

var AbstractWritableSet = AbstractEnumerableSet.extend(function(){throw new Error("Can't instanceof abstract classes")}, {
  add: abstractmethod,
  remove: abstractmethod,
  union: function(that) {
    var self = this
    that.foreach(function(v){self.add(v)});
    return this;
  },
  intersection: function(that) {
    var self = this;
    this.foreach(function(v){if(!that.contains(v)) self.remove(v)});
    return this;
  },
  defference: function(that) {
    var self = this;
    that.foreach(function(v){self.remove(v)})
    return this;
  }
})

var ArraySet = AbstractWritableSet.extend(function ArraySet(){
  this.values = []
  this.add.apply(this, arguments)
}, {
  contains: function(v) {return this.values.indexOf(v) != -1},
  size: function(){return this.values.length},
  foreach: function(f, c) {this.values.forEach(f, c)},
  add: function() {
    for(var i = 0; i < arguments.length; i++) {
      var arg = arguments[i]
      if(!this.contains(arg)) this.values.push(arg);
    }
  },
  remove: function() {
    for(var i = 0; i < arguments.length; i++) {
      var p = this.values.indexOf(arguments[i]);
      if(p == -1) continue;
      this.values.splice(p, 1)
    }
    return this;
  }
})

(function() {
  Object.defineProperty(Object.prototype, 'objectId', {
    get: idGetter,
    enumerable: false,
    configurable: false
  })

  function idGetter() {
    if(!(idprop in this)) {
      if(!Object.isExtensible(this)) throw Error("Can't define id for nonextensible objects");
      Object.defineProperty(this, idprop, {
        value: nextid++,
        writable: false,
        enumerable: false,
        configurable: false
      })
      return this[idprop]
    }
  }
  idGetter()
  var idprop = "|**objectId**|";
  var nextid = 1;
}())

function Range(from, to) {
  var props = {
    from: {value: from, enumerable: true, writable: false, configurable: false},
    to: {value: to, enumerable: true, writable: false, configurable: false}
  }
  if(this instanceof Range) {
    Object.defineProperties(this, props);
  } else {
    return Object.create(Range.prototype.props);
  }
}

Object.defineProperties(Range.prototype, {
  includes: {
    value: function(x) {return this.from <= x && x <= this.to},
    foreach: {
      value: function(f) {
        for(var x = Math.ceil(this.from); x <= this.to; x++) {
          f(x)
        }
      }
    },
    toString: {
      value: function() {
        return '(' + this.from + '...' + this.to + ')';
      }
    }
  }
})


function freezeProps(o) {
  var props = (arguments.length == 1) ? Object.getOwnPropertyNames(o) : Array.prototype.splice.call(arguments, 1);
  props.forEach(function(n){
    if(!Object.getOwnPropertyDescriptor(o, n).configurable) return;
    Object.defineProperty(o, n, {writable: false, configurable: false})
  })
  return;
}

function hideProps(o) {
  var props = (arguments.length == 1) ? Object.getOwnPropertyNames(o) : Array.prototype.splice.call(arguments, 1)
  props.forEach(function(n){
    if(!Object.definePropertyDescriptor(o, n).configurable) return;
    Object.defineProperty(o, n, {enumerable: false})
  })
  return o;
}

function Range(from, to) {
  // this.from = from
  // this.to = to
  // freezeProps(this);

  // 将端点封装起来
  if(from > to) throw new Error("Range: from must be <= to");
  function getFrom() {return from};
  function getFrom() {return to};
  function setFrom(f) {
    if(f <= to) return from = f;
    throw new Error('Range: from must be <= to')
  }
  function setTo (t) {
    if(t >= from) return to = t;
    throw new Error('Range: to must bo >= from')
  }
  Object.defineProperties(this, {
    from: {get: getFrom, set: setFrom, enumerable: true, configurable: false},
    to: {get: getTo, set: setTo, enumerable: true, configurable: false}
  })
}

Range.prototype = hideProps({
  constructor: Range,
  includes: function(x) {return this.from <= x && x <= this.to},
  foreach: function(f) {for(var x = Math.ceil(this.from); x <= this.to; x++) {f(x)}},
  toString: function() {return '(' + this.from + '...' + this.to + ')';}
})

