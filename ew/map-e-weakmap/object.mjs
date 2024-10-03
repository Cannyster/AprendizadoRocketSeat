// let john = { name: "John" };
// let ben = { name: "Ben" };

// let visitsCountObj = {}; // try to use an object

// visitsCountObj[ben] = 234; // try to use ben object as the key
// visitsCountObj[john] = 123; // try to use john object as the key, ben object will get replaced

// // That's what got written!
// console.log(visitsCountObj); // 123


// let set = new Set(["oranges", "apples", "bananas"]);

// // for (let value of set) console.log(value);

// // the same with forEach:
// set.forEach((value, valueAgain, set) => {
//     console.log(value);
// });


let map = new Map();

map.set("name", "John");

let keys = Array.from(map.keys());

// Error: keys.push is not a function
keys.push("more");

console.log(keys)