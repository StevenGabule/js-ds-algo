// Write a loop that makes seven calls to console.log to output the following triangle:
// for(let i = 0; i <= 6; i++) {
//   let s = '';
//   for(let j = 0; j <= i; j++) {
//     s += '#'
//   }
//   console.log(s);
// }

// Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions.
// For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and
// not 3), print "Buzz" instead.
// for(let i = 1; i <= 100; i++) {
//   if(i % 3 === 0 && i % 5 === 0) {
//     console.log('FizzBuzz');
//   } else if(i % 3 === 0) {
//     console.log('Fizz');
//   } else if(i % 5 === 0) {
//     console.log('Buzz');
//   } else {
//     console.log(i)
//   }
// }

// Write a program that creates a string that represents an 8×8 grid, using new-line characters to
// separate lines. At each position of the grid there is either a space or a # character. The characters
// should form a chessboard.
for(let i = 1; i <= 8; i++) {
  let s = '';
  if(i % 2 === 0) {
    s += '#'
    for(let x = 1; x <= 3; x++) {
        s += ' #'
    }
  } else {
    s += ' '
    for(let x = 1; x <= 4; x++) {
      s += '# '
    }
  }
  console.log(s);
}
