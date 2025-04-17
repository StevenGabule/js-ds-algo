function printFarmInventory(cows, chickens) {
  let cowString = String(cows);

  while (cowString.length < 3) {
    cowString = '0' + cowString;
  }

  console.log(`${cowString} Cows`);

  let chickenString = String(chickens);
  while (chickenString.length < 3) {
    chickenString = "0" + chickenString;
  }

  console.log(`${chickenString} chickens`);
}


// printFarmInventory(7, 11);

function zeroPad(num, width) {
  let str = String(num);
  while (str.length < width) {
    str = '0' + str;
  }

  return str;
}

function printFarmInventory(cows, chickens, pigs) {
  console.log(`${zeroPad(cows, 4)} Cows`)
  console.log(`${zeroPad(chickens, 4)} Chickens`)
  console.log(`${zeroPad(pigs, 4)} Pigs`)
}

printFarmInventory(7, 11, 10);
