//  Part I

// ----------------------------
// write your own forEach() function that takes an array and a function
// ----------------------------

function forEach(array, callback){
  for(var i=0; i<array.length; i++) {
    callback(array[i], i, array);
  }
}

// tests
// ---
var total = 1
forEach([1, 2, 3, 4], function(a){ total *= a; })
console.assert(total === 24)

// ----------------------------
// using forEach() from above, write your own reduce()
// that takes an array and a function
// ----------------------------

function reduce(array, callback){
  var accumulator;
  forEach(array, function(value, i, callbackArray) {
    // If it is our first time through, use the first value
    if(i === 0) {
      accumulator = value;
    }
    // Otherwise, 
    else if (i < array.length) {
      if(typeof value !== 'undefined') {
        var cbresult = callback(accumulator, value);
        if(typeof cbresult !== 'undefined')
        {
          accumulator = cbresult;
        }
      }
    }
  });
  return accumulator;
}

// tests
// ---
console.assert(
    reduce([1, 2, 3, 4], function(a, v){ return a*v }) === 24
);

// ----------------------------
// using forEach() from above, write your own map()
// that takes an array and a function
// ----------------------------

function map(array, callback){
  var result = [];
  forEach(array, function(num, i) {
    result[i] = callback(num);
  });
  return result;
}

// tests
// ---
var squares = map([1, 2, 3, 4], function(v){ return v*v })
console.assert(squares[0] === 1)
console.assert(squares[1] === 4)
console.assert(squares[2] === 9)
console.assert(squares[3] === 16)


// ----------------------------
// using reduce() from above, write your own filter()
// that takes an array and a function
// ----------------------------

function filter(array, callback){
  var results = [];
  reduce(array, function(a, b) {
    var val = callback(b);
    if(val) {
      results.push(b);
    }
  });
  return results;
}

// tests
// ---
var evens = filter([1, 2, 3, 4], function(v){ return v%2 === 0 })
console.assert(evens[0] === 2)
console.assert(evens[1] === 4)



// ----------------------------
// using reduce() from above, write your own sum()
// that adds up all arguments to sum (note: variadic behavior)
// ----------------------------

function sum(){
  var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
  return reduce(args, function(a,b){
    return a+b;
  })
}

// tests
// ---
console.assert(sum(1, 2, 3) === 6)
console.assert(sum(1, 2, 3, 4) === 10)
console.assert(sum(1, 2, 3, 4, 5) === 15)


// ----------------------------
// using Array.sort(), sort the following array
// of people by name
// ----------------------------

var names = [
    {name:"Matthew", alma_mater: "Boston"},
    {name:"Matthew", alma_mater: "Georgia"},
    {name:"Matt", alma_mater:"Univ of Texas - Austin"},
    {name:"Brian", alma_mater:"Texas A&M"},
    {name:"Jesse", alma_mater:"Univ of Texas - Austin"}
]; 

function alphaSort(aName, bName){
          if(aName === bName) { 
            return true;
          }
          var aLength = aName.length;
          // Loop through the characters
          for(var i=0; i < aLength; i++ ) {
            var aCode = aName.charCodeAt(i);
            var bCode = bName.charCodeAt(i);
            var aNaN = isNaN(aCode);
            var bNaN = isNaN(bCode);
            // Neither code is defined
            if(aNaN && bNaN) {
              return true;
            } else if (aNaN) {
              return false;
            } else if (bNaN) {
              return true;
            } else if (aCode > bCode) {
              return true;
            } else if (aCode < bCode) {
              return false;
            }
          }
        }

names.sort(function(a,b) {
  return alphaSort(a.name,b.name);
});

// tests
// ---
console.assert(names[0].name === "Brian")
console.assert(names[1].name === "Jesse")
console.assert(names[2].name === "Matt")
// I added these tests on after the fact
console.assert(names[3].name === "Matthew");
console.assert(names[4].name === "Matthew");



// ----------------------------
// Using Array.map(), Array.filter(), and Array.sort() on the
// array below:
// - filter for customers whose first-names start with 'J',
// - map to their fullnames,
// - and then sort the items alphabetically by fullname
// ----------------------------

var customers = [
    { first: 'Joe', last: 'Blogs'},
    { first: 'John', last: 'Smith'},
    { first: 'Dave', last: 'Jones'},
    { first: 'Jack', last: 'White'}
]

var results = customers
    .filter(function(customer){
        return customer.first.toLowerCase().indexOf('j') === 0;
    })
    .map(function(customer){
        return { fullname: customer.first + ' ' + customer.last };
    })
    .sort(function(a, b){
        return alphaSort(a.fullname, b.fullname);
    })

// tests
// ---
console.assert(results[0].fullname === "Jack White")
console.assert(results[2].fullname === "John Smith")



//  Part II


// using our own forEach(), map(), reduce(), and filter()
// functions written in js-functions-functional-practice-1


// -----------
// Write a function pluck() that extracts a list of
// values associated with property names.
// -----------
function pluck(list, propertyName) {
    // YOUR CODE HERE
    return map(list, function(item){
      return item[propertyName];
    })
}

// tests
// ---
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}]
console.assert(pluck(stooges, 'name')[0] === 'moe')
console.assert(pluck(stooges, 'age')[2] === 60)

// -----------
// Write a function reject() that does the opposite of filter,
// if the callback function returns a "truthy" value then that
// item is **not** inserted into the new collection,
// otherwise it is.
// -----------
function reject(list, predicate) {
  // YOUR CODE HERE
  var results = [];
  reduce(list, function(a, b) {
    var val = predicate(b);
    if(!val) {
      results.push(b);
    }
  });
  return results;
}

// tests
// ---
var lt10 = [0,1,2,3,4,5,6,7,8,9,10]
var odds = reject(lt10, function(n){ return n%2 === 0 })
console.assert(odds[0] === 1)
console.assert(odds[1] === 3)
console.assert(odds[4] === 9)

// -----------
// Write a function find() that returns the very first item
// in a collection when the callback function returns true;
// otherwise returns undefined.
// -----------
function find(list, predicate) {
  for(var i=0; i<list.length; i++) {
    var item = list[i];
    var result = predicate(item);
    if(result) {
      return item;
    }
  }
}

// tests
// ---
var people = [
    {name: "Matt", teaches: "JS"},
    {name: "Jwo", teaches: "Ruby"},
    {name: "Dorton", teaches: "life"}
]
var JS = find(people, function(n){ return n.teaches === "JS" })
console.assert(JS.name === "Matt")

// -----------
// Write a function where() that filters for all the values
// in the properties object.
// -----------
function where(list, properties) {

    var results = [];

    for (var i=0; i<list.length; i++) {
      var result = true;
      for (var prop in properties) {
        if(list[i][prop] !== properties[prop]) {
          result = false;
        }
      }
      if(result) {
        results.push(list[i]);
      }
    }
    return results;
}

// tests
// ---
var plays = [
    {title: "Cymbeline", author: "Shakespeare", year: 1623},
    {title: "The Tempest", author: "Shakespeare", year: 1623},
    {title: "Hamlet", author: "Shakespeare", year: 1603},
    {title: "A Midsummer Night's Dream", author: "Shakespeare", year: 1600},
    {title: "Macbeth", author: "Shakespeare", year: 1620},
    {title: "Death of a Salesman", author: "Arthur Miller", year: 1949},
    {title: "Two Blind Mice", author: "Samuel and Bella Spewack", year: 1949}
]

var sh8spr = where(plays, {author: "Shakespeare"})
console.assert(sh8spr instanceof Array)
console.assert(sh8spr.length === 5)
console.assert(sh8spr[0].title === "Cymbeline")

sh8spr = where(plays, {author: "Shakespeare", year: 1611})
console.assert(sh8spr.length === 0)

sh8spr = where(plays, {author: "Shakespeare", year: 1623})
console.assert(sh8spr.length === 2)

var midcentury = where(plays, {year: 1949})
console.assert(midcentury.length === 2)