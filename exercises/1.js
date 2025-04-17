// Write a function min that takes two arguments and returns their minimum.
// function min(...num) {
//   if(num.length === 0) return null;
//
//   let minimum = num[0];
//   for (let i = 1; i < num.length; i++) {
//     if (num[i] < minimum) {
//       minimum = num[i];
//     }
//   }
//   return minimum;
// }
//
// console.log(min(112, 244, 32, 12, 44)) // 12
// console.log(min()) // null
// console.log(min(112, 244, 32, 12, 44)); // Output: 12
// console.log(min(5));                   // Output: 5
// console.log(min(-10, -5, 0, -20));     // Output: -2

// Define a recursive function isEven corresponding to this description.
// The function should accept a single parameter (a positive, whole number) and return a Boolean
function isEven(num) {
  if (num === 0) {
    return true;
  } else if (num === 1) {
    return false;
  } else if (num < 0) {
    return isEven(-num);
  } else {
    return isEven(num - 2);
  }
}

// console.log(isEven(0));   // Output: true
// console.log(isEven(1));   // Output: false
// console.log(isEven(2));   // Output: true
// console.log(isEven(3));   // Output: false
// console.log(isEven(4));   // Output: true
// console.log(isEven(10));  // Output: true
// console.log(isEven(15));  // Output: false
// console.log(isEven(-2));  // Output: true (handling negative case)
// console.log(isEven(-3));  // Output: false (handling negative case)

// Write a function countBs that takes a string as its only argument and returns a number that
// indicates how many uppercase “B” characters there are in the string.
function countBs(p) {
  let countB = 0;
  for(let i = 0; i < p.length; i++) {
    if(p[i].toLocaleLowerCase() === 'b') {
      countB++;
    }
  }
  console.log(countB);
}
countBs('abbasBb')


// Next, write a function called countChar that behaves like countBs, except it takes a second argument
// that indicates the character that is to be counted (rather than counting only uppercase “B”
// characters). Rewrite countBs to make use of this new function.
function countChar(p, t) {
  let cChar = 0;
  for(let i = 0; i < p.length; i++) {
    if(p[i].toLocaleLowerCase() === t) {
      cChar++;
    }
  }
  return cChar
}

console.log(countChar('abbasBbA', 'a'));
