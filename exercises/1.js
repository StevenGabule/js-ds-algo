// Write a function min that takes two arguments and returns their minimum.
function min(...num) {
  let minimum = num[0];
  for (let i = 1; i < num.length; i++) {
    if (num[i] < minimum) {
      minimum = num[i];
    }
  }
  return minimum;
}

console.log(min(112, 244, 32, 12, 44))
