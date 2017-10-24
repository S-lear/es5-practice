var Coin = enumeration({Penny: 1,Nickel: 2, Dime: 10, Quarter: 25});

var c = Coin.Dime
console.log(c)
console.log(c instanceof Coin)
console.log(c.constructor == Coin)
console.log(Coin.Quarter + 3*Coin.Nickel)
console.log(Coin.Dime == 10)
console.log(Coin.Dime > Coin.Nickel)
console.log((Coin.Dime) + ":" + Coin.Dime)
function enumeration(namesTovalues){
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
      f.call(c.this.values[i])
    }
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
  return enumeration;
}
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

function Deck(){
  var cards = this.cards = [];
  Card.Suit.foreach(function(s){
    Card.Rank.foreach(function(r){
      cards.push(new Card(s, r));
    })
  })
}

Deck.prototype.shuffle = function() {
  var deck = this.cards
  var len = deck.length;
  for(var i = len-1; i > 0; i--){
    var r = Math.floor(Math.random()*(i+1)), temp;
    temp = deck[i], deck[i] = deck[r],deck[r]=temp;
  }
  return this;
}

Deck.prototype.deal = function(n) {
  if(this.cards.length < n){
    throw 'Out of cards';
  }
  return this.cards.splice(this.cards.length - n, n)
}

var deck = (new Deck()).shuffle();
var hand = deck.deal(13).sort(Card.orderBySuit);





function Set(){
  this.values = {};
  this.n = 0;
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
  return this;
}

Set.prototype.remove = function(){
  for(var i = 0; i < arguments.length; i++) {
    var str = Set._v2s(arguments[i])
    if(this.values.hasOwnProperty(str)) {
      delete this.values[str]
      this.n--
    }
  }
  return this
}

Set.prototype.contains = function(value){
  return this.values.hasOwn.property(Set._v2s(value));
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

s.add('a','b','c')
console.log('1111111111111',s)





