function name(x) {
  console.log(x.value);
  x.value = 6;
  console.log(x.value);
}

let y = {
  value: 4711,
};
console.log(y.value);
name(y);
console.log(y.value);

function Item(name, price, author, isbn) {
  this.name = name;
  this.price = price;
  this.author = author;
  this.isbn = isbn;
  this.printDescription = function () {
    console.log(`${this.author}: ${this.name}`);
  };
}

const item = new Item(
  "JavaScript: The Comprehensive Guide",
  59.95,
  "Philip Ackermann",
  "978-1-4932-2286-5"
);

console.log(item.name); // "JavaScript: The Comprehensive Guide"
console.log(item.price); // 59.95
console.log(item.author); // "Philip Ackermann"
console.log(item.isbn); // "978-1-4932-2286-5"
item.printDescription();

const item2 = new Item(
  "Node.js: The Comprehensive Guide",
  49.94,
  "Sebastian Springer",
  "978-1-4932-2292-6"
);

console.log(item2.name); // "Node.js: The Comprehensive Guide"
console.log(item2.price); // 49.94
console.log(item2.author); // "Sebastian Springer"
console.log(item2.isbn); // "978-1-4932-2292-6"
item2.printDescription();

console.log(Item.prototype); // Item {}
console.log(item.__proto__); // Item {}
console.log(Object.getPrototypeOf(item)); // Item {}
console.log(item.constructor);

console.log(typeof item); // object
console.log(item instanceof Item); // true

class Item {
  constructor(name, price, author, isbn) {}
}
const item1 = new Item(
  "JavaScript: The Comprehensive Guide",
  59.95,
  "Philip Ackermann",
  "978-1-4932-2286-5"
);
console.log(Item1.prototype); // Item {}
console.log(item.__proto__); // Item {}
console.log(Object.getPrototypeOf(item1)); // Item {}
console.log(item.constructor); // function class Item(...)

console.log(typeof item); // object
console.log(item instanceof Item); // true

const item3 = Object.create(Object.prototype, {
  name: {
    value: "JavaScript: The Comprehensive Guide",
  },
  price: {
    value: 59.95,
  },
  author: {
    value: "Philip Ackermann",
  },
  isbn: {
    value: "978-1-4932-2286-5",
  },
  printDescription: {
    value: function () {
      console.log(`${this.author}: ${this.name}`);
    },
  },
});
console.log(item3.name); // "JavaScript: The Comprehensive Guide"
console.log(item3.price); // 59.95
console.log(item3.author); // "Philip Ackermann"
console.log(item3.isbn); // "978-1-4932-2286-5"
item.printDescription(); // "Philip Ackermann:
// JavaScript: The Comprehensive Guide"

const item4 = Object.create(Object.prototype, {
  name: {
    value: "JavaScript: The Comprehensive Guide",
    writable: false,
    configurable: true,
    enumerable: true,
  },
  price: {
    value: 59.95,
    writable: true,
    configurable: true,
    enumerable: true,
  },
  author: {
    value: "Philip Ackermann",
    writable: false,
    configurable: true,
    enumerable: true,
  },
  isbn: {
    value: "978-1-4932-2286-5",
    writable: false,
    configurable: true,
    enumerable: false, // During iteration, the "isbn" property is
    // not output.
  },
  printDescription: {
    value: function () {
      console.log(`${this.author}: ${this.name}`);
    },
  },
});
for (let property in item4) {
  console.log(property); // Output: "name", "price", "author"
}
item4.name = "Cool new Java book";
console.log(item.name); // "JavaScript:
// The Comprehensive Guide", because the
// "name" property is not "writeable".
item4.price = 54.95;
console.log(item4.price); // "54.95", because for the "price" property,
// the "writable" attribute has a value of "true".

const item5 = {
  name: "JavaScript: The Comprehensive Guide",
  price: 59.95,
  author: "Philip Ackermann",
  isbn: "978-1-4932-2286-5",
  printDescription: function () {
    console.log(`${this.author}: ${this.name}`);
  },
};
const propertyDescriptor = Object.getOwnPropertyDescriptor(item5, "name");
console.log(propertyDescriptor.enumerable); // true
console.log(propertyDescriptor.configurable); // true
console.log(propertyDescriptor.writable); // true
console.log(propertyDescriptor.value); // "JavaScript:
// The Comprehensive Guide"

/*
Finally, the question arises as to which type of object creation you
should use. Here's some advice:
For simple objects that you want to create on the fly and of which
you need only one instance, use the object literal notation.
On the other hand, if you want to create multiple object instances
of one object type, we recommend that you switch to the new
class syntax rather than using constructor functions. The latter are
only used in exceptional cases.
You can use the Object.create() method if the class syntax isn’t
available to you (e.g., if you’re working in a runtime environment
that does not yet support ES2015 features) or if you want to use
property attributes when creating an object.

*/

const person = {
  "first-name": "John",
  "last-name": "Doe",
};
// console.log(person.first-name); // Syntax error
// console.log(person.last-name); // Syntax error
console.log(person["first-name"]); // "John"
console.log(person["last-name"]); // "Doe"
const firstName = "first-name";
const lastName = "last-name";
console.log(person[firstName]); // "John"
console.log(person[lastName]); // "Doe"
const name = "name";
const prefixFirstName = "first-";
const prefixLastName = "last-";
console.log(person[prefixFirstName + name]); // "John"
console.log(person[prefixLastName + name]); // "Doe

const item6 = {
  _name: "JavaScript: The Comprehensive Guide",
  _price: 59.95,
  _author: "Philip Ackermann",
  _isbn: "978-1-4932-2286-5",
  set name(newName) {
    if (typeof newName === "string") {
      console.log("Set new name");
      this._name = newName;
    } else {
      throw new TypeError("Name must be a string.");
    }
  },
  get name() {
    console.log("Return name");
    return this._name;
  },
  /* Same for the other properties. */
};
console.log(item.name); // "Return name"
// "JavaScript: The Comprehensive Guide"
item.name = "JavaScript: The Comprehensive Guide by Philip Ackermann";
// "Set new name"

function Item(name, price, author, isbn) {
  this._name = name;
  this._price = price;
  this._author = author;
  this._isbn = isbn;
}
Item.prototype = {
  set name(newName) {
    if (typeof newName === "string") {
      console.log("Set new name");
      this._name = newName;
    } else {
      throw new TypeError("Name must be a string.");
    }
  },
  get name() {
    console.log("Return name");
    return this._name;
  },
  /* Same for the other properties. */
};
const item = new Item(
  "JavaScript: The Comprehensive Guide",
  59.95,
  "Philip Ackermann",
  "978-1-4932-2286-5"
);
console.log(item.name); // "Return name"
// "JavaScript: The Comprehensive Guide"
item.name = "JavaScript: The Comprehensive Guide";

class Item {
  constructor(name, price, author, isbn) {
    this._name = name;
    this._price = price;
    this._author = author;
    this._isbn = isbn;
  }
  set name(newName) {
    if (typeof newName === "string") {
      console.log("Set new name");
      this._name = newName;
    } else {
      throw new TypeError("Name must be a string.");
    }
  }
  get name() {
    console.log("Return name");
    return this._name;
  }
  /* Same for the other properties. */
}
const item = new Item(
  "JavaScript: The Comprehensive Guide",
  59.95,
  "Philip Ackermann",
  "978-1-4932-2286-5"
);
console.log(item.name); // "Return name"
// "JavaScript: The Comprehensive Guide"
item.name = "JavaScript: The Comprehensive Guide by Philip Ackermann";
// "Set new name"

const item = Object.create(Object.prototype, {
  name: {
    set: function (newName) {
      if (typeof newName === "string") {
        console.log("Set new name");
        this._name = newName;
      } else {
        throw new TypeError("Name must be a string.");
      }
    },
    get: function () {
      console.log("Return name");
      return this._name;
    },
    /* Same for the other properties. */
  },
});
// "Set new name"
item.name = "JavaScript: The Comprehensive Guide by Philip Ackermann";
// "Return name"
console.log(item.name);
// Output:
// "JavaScript: The Comprehensive Guide by Philip Ackermann"

const item = {
  isbn: "",
  _name: "",
  /* Here are the other properties. */
  set name(newName) {
    if (typeof newName === "string") {
      console.log("Set new name");
      this._name = newName;
    } else {
      throw new TypeError("Name must be a string.");
    }
  },
  get name() {
    console.log("Return name");
    return this._name;
  },
  /* Same for the other properties. */
};
// Data property
item.isbn = "978-1-4932-2286-5";
console.log(item.isbn);
// Possible, but not desired, because access
// is to take place using set and get.
item._name = "JavaScript: The Comprehensive Guide";
console.log(item._name);
// Access property
item.name = "JavaScript: The Comprehensive Guide by Philip Ackermann";
console.log(item.name);

const item = {};
Object.defineProperty(item, "name", {
  value: "JavaScript: The Comprehensive Guide",
});
Object.defineProperty(item, "price", {
  value: 59.95,
});
Object.defineProperty(item, "author", {
  value: "Philip Ackermann",
});
Object.defineProperty(item, "isbn", {
  value: "978-1-4932-2286-5",
});
Object.defineProperty(item, "printDescription", {
  value: function () {
    console.log(`${this.author}: ${this.name}`);
  },
});
console.log(item.name); // "JavaScript: The Comprehensive Guide"
console.log(item.price); // 59.95
console.log(item.author); // "Philip Ackermann"
console.log(item.isbn); // "978-1-4932-2286-5"

const item = {};
Object.defineProperties(item, {
  name: {
    value: "JavaScript: The Comprehensive Guide",
  },
  price: {
    value: 59.95,
  },
  author: {
    value: "Philip Ackermann",
  },
  isbn: {
    value: "978-1-4932-2286-5",
  },
  printDescription: {
    value: function () {
      console.log(`${this.author}: ${this.name}`);
    },
  },
});
console.log(item.name); // "JavaScript: The Comprehensive Guide"
console.log(item.price); // 44.9
console.log(item.author); // "Philip Ackermann"
console.log(item.isbn); // "978-1-4932-2286-5"

const item = {
  name: "JavaScript: The Comprehensive Guide",
  price: 59.95,
  author: "Philip Ackermann",
  isbn: "978-1-4932-2286-5",
  printDescription: function () {
    console.log(`${this.author}: ${this.name}`);
  },
};
console.log("price" in item); // Output: true
console.log(item.price); // Output: 44.9
item.price = null; //
console.log("price" in item); // Output: true
console.log(item.price); // Output: null
item.price = undefined; //
console.log("price" in item); // Output: true
console.log(item.price); // Output: undefined

const item = {
  name: "JavaScript: The Comprehensive Guide",
  price: 59.95,
  author: "Philip Ackermann",
  isbn: "978-1-4932-2286-5",
  printDescription: function () {
    console.log(`${this.author}: ${this.name}`);
  },
};
for (let property in item) {
  console.log(`Name: ${property}`);
  console.log(`Value: ${item[property]}`);
}

const properties = Object.keys(item);
for (let i = 0; i < properties.length; i++) {
  const property = properties[i];
  console.log(`Name: ${property}`);
  console.log(`Value: ${item[property]}`);
}
printArray(properties);
function printArray(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}

const keys = Object.keys(item);
console.log(keys);
// [
// 'name',
// 'price',
// 'author',
// 'isbn',
// 'printDescription'
// ]
const values = Object.values(item);
console.log(values);
// [
// 'JavaScript: The Comprehensive Guide',
// 44.9,
// 'Philip Ackermann',
// '978-1-4932-2286-5',
// [Function: printDescription]
// ]
const entries = Object.entries(item);
console.log(entries);
// [
// [ 'name', 'JavaScript: The Comprehensive Guide' ],
// [ 'price', 44.9 ],
// [ 'author', 'Philip Ackermann' ],
// [ 'isbn', '978-1-4932-2286-5' ],
// [ 'printDescription', [Function: printDescription] ]
// ]

/*
If you need the property names and method names of an object or
their values as an array, use the Object.keys(), Object.values(),
or Object.entries() method. However, if you need to iterate over
the names only once, use the for-in loop.
*/

const john = {
  firstName: "John",
};
const johnDoe = Object.create(john, {
  lastName: {
    value: "Doe",
    enumerable: true,
  },
});
console.log(john.firstName); // John
console.log(john.lastName); // undefined
console.log(johnDoe.firstName); // John
console.log(johnDoe.lastName); // Doe
// Output: lastName, firstName
for (let i in johnDoe) {
  console.log(i);
}
const properties1 = Object.keys(johnDoe);
// Output: ["lastName"]
console.log(properties1);

const john1 = {
  firstName: "John",
  lastName: "Doe",
};

console.log(Object.isExtensible(john1)); // true
john.age = 44; // define new property
console.log(john1.age); // 44
Object.preventExtensions(john1); // prevent extensions
console.log(Object.isExtensible(john1)); // false
john.firstName = "James"; // permitted: change existing
// property
console.log(john1.firstName); // "James"
console.log(Object.getOwnPropertyDescriptor(john1, "firstName").enumerable); // true
Object.defineProperty(john1, "firstName", {
  // permitted: change property
  // attributes
  enumerable: false,
});
console.log(Object.getOwnPropertyDescriptor(john1, "firstName").enumerable); // false
john1.weight = 88; // TypeError: Can't add property weight,
// object is not extensible

const john = {
  firstName: "John",
  lastName: "Doe",
};
console.log(Object.isExtensible(john)); // true
console.log(Object.isSealed(john)); // false
john.age = 44; // define new property
console.log(john.age); // 44
Object.seal(john); // seal object
console.log(Object.isExtensible(john)); // false
console.log(Object.isSealed(john)); // true
john.firstName = "James"; // permitted: change existing
// property
console.log(john.firstName); // "James"
console.log(Object.getOwnPropertyDescriptor(john, "firstName").enumerable); // true
Object.defineProperty(john, "firstName", {
  // Uncaught TypeError: Cannot
  // redefine
  // property: firstName
  enumerable: false,
});

const john = {
  firstName: "John",
  lastName: "Doe",
};
console.log(Object.isExtensible(john)); // true
console.log(Object.isSealed(john)); // false
console.log(Object.isFrozen(john)); // false
john.age = 44; // new property
console.log(john.age); // 44
Object.freeze(john); // freeze object
console.log(Object.isExtensible(john)); // false
console.log(Object.isSealed(john)); // true
console.log(Object.isFrozen(john)); // true
john.firstName = "James"; // TypeError: Cannot assign to
// read only
// property 'firstName' of #<Object>

/*
The relationship between the Object.preventExtensions(),
Object.seal(), and Object.freeze() methods is shown in
Figure 4.13: Object.preventExtensions() ensures that no new
properties can be added to the respective object, Object.seal()
further ensures that existing properties cannot be configured, and
Object.freeze() additionally ensures that values of existing
properties cannot be changed.

*/

// Arrays methods
// concat() => Appends elements or arrays to an existing array
// filter() => Filters elements from the array based on a filter criterion passed in the form of a function
// forEach() => Applies a passed function to each element in the array
// join() => Converts an array into a string
// map() Maps the elements of an array to new elements based on a passed conversion function
// pop() Removes the last element of an array
// push() Inserts a new element at the end of the array
// reduce() Combines the elements of an array into one value based on a passed function
// reverse() Reverses the order of the elements in the array
// shift() Removes the first element of an array
// slice() Cuts individual elements from an array
// splice() Adds new elements at any position in the array
// sort() Sorts the array, optionally based on a passed comparison function

const todoList = ["Clean bathroom", "Go shopping", "Tidy up", "Mow lawn"];
todoList.splice(
  2, // Index from which to insert elements
  0, // Number of elements to be deleted
  "Paint garage" // Element to be added
);
console.log(todoList);
// [
// "Clean bathroom",
// "Go shopping",
// "Paint garage",
// "Tidy up",
// "Mow lawn"
// ]
todoList.splice(
  2, // Index from which to insert elements
  0, // Number of elements to be deleted
  "Lay sod", // Elements to be ...
  "Lay out vegetable garden" // ... added
);
console.log(todoList);
// [
// "Clean bathroom",
// "Go shopping",
// "Lay sod",
// "Lay out vegetable garden",
// "Paint garage",
// "Tidy up",
// "Mow lawn"
// ]

const todoList1 = ["Clean bathroom", "Go shopping", "Tidy up", "Mow lawn"];
const deletedTodos = todoList1.splice(1, 2);
console.log(deletedTodos); // ["Go shopping", "Tidy up"]
console.log(todoList1);

const todoList2 = ["Clean bathroom", "Go shopping", "Tidy up", "Mow lawn"];
const sliced1 = todoList2.slice(1); // starting from second element
console.log(sliced1); // ["Go shopping", "Tidy up", "Mow lawn"]
const sliced2 = todoList2.slice(2); // starting from third element
console.log(sliced2); // ["Tidy up", "Mow lawn"]
const sliced3 = todoList2.slice(0, 2); // first and second element
console.log(sliced3); // ["Clean bathroom", "Go shopping"]
const sliced4 = todoList.slice(2, 4); // third and fourth element
console.log(sliced4); // ["Tidy up", "Mow lawn"]
// Original array remains unchanged:
console.log(todoList2); // ["Clean bathroom", "Go shopping",
// "Tidy up", "Mow lawn"]

const sliced5 = todoList.slice(-2); // the last two elements
const sliced6 = todoList.slice(
  1, // the second element from the
  // beginning to ...
  -1
); // ... the second element from the end
const sliced7 = todoList.slice(
  1, // the second element from
  // the beginning to ...
  -2
); // ... the third element from the end
const sliced8 = todoList.slice(
  1, // the second element from the
  // beginning to ...
  -3
); // ... the fourth element from the end
console.log(sliced5); // ["Tidy up", "Mow lawn"]
console.log(sliced6); // ["Go shopping", "Tidy up"]
console.log(sliced7); // ["Go shopping"]
console.log(sliced8); // []

const contacts = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@javascripthandbuch.de",
  },
  {
    firstName: "James",
    lastName: "Dean",
    email: "superjames@javascripthandbuch.de",
  },
  {
    firstName: "Peter",
    lastName: "Dickens",
    email: "dickens@javascripthandbuch.de",
  },
];
function compareByFirstName(contact1, contact2) {
  return contact1.firstName.localeCompare(contact2.firstName);
}
function compareByLastName(contact1, contact2) {
  return contact1.lastName.localeCompare(contact2.lastName);
}
function compareByEmail(contact1, contact2) {
  return contact1.email.localeCompare(contact2.email);
}
contacts.sort(compareByFirstName); // sort by first name
console.log(contacts[0].firstName); // James
console.log(contacts[1].firstName); // John
console.log(contacts[2].firstName); // Peter
contacts.sort(compareByLastName); // sort by last name
console.log(contacts[0].firstName); // James
console.log(contacts[1].firstName); // Peter
console.log(contacts[2].firstName); // John
contacts.sort(compareByEmail); // sort by email address
console.log(contacts[0].firstName); // Peter
console.log(contacts[1].firstName); // John
console.log(contacts[2].firstName); // James

const result = [2, 3, 4, 5, 6, 7, 2, 3, 4, 5].find(
  (element) => element % 2 !== 0
);
console.log(result); // 3
const result2 = [2, 3, 4, 5, 6, 7, 2, 3, 4, 5];
findIndex((element) => element % 2 !== 0);
console.log(result2); // 1

const todoList3 = ["Clean bathroom", "Go shopping", "Tidy up", "Mow lawn"];
todoList.copyWithin(
  0, // target start position to which the elements will be copied
  2, // source start position from which the elements are copied
  4 // source end position up to which the elements are copied
);
console.log(todoList3);

const names = ["John", "James", "Peter"];
const namesString = names.toString();
console.log(namesString); // Output: John,James,Peter
const namesLocaleString = names.toLocaleString();
console.log(namesLocaleString); // Output: John,James,Peter
const namesValue = names.valueOf();
console.log(namesValue); // Output: ["John", "James", "Peter"]
const namesJoined = names.join("-");
console.log(namesJoined); // Output: John-James-Peter
