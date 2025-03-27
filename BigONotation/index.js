// O(1) - Constant Time: The operation takes the same amount of time regardless of the input size.
function getFirstElement(arr) {
	return arr[0]; // Accessing by index is always O(1)
}

// O(1) - Constant Time
function checkIfEven(num) {
	return num % 2 === 0; // simple calculation is O(1)
}

// O(log n) - Logarithmic Time : Slightly worse than linear time but better than quadratic.
function binarySearch(sortedArray, target) {
	let left = 0;
	let right = sortedArray.length - 1;

	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (sortedArray[mid] === target) {
			return mid;
		} else if (sortedArray[mid] < target) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}

	return -1;
}

console.log(binarySearch([2, 4, 5, 12, 5, 11, 12, 1, 39].sort((a, b) => a - b), 1)); // output: 0

// O(n) - Linear Time
function findMaximum(arr) {
	let max = arr[0];
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] > max) {
			max = arr[i];
		}
	}

	return max;
}

// console.log(findMaximum([2, 4, 25, 12, 5])); // 12

// O(n log n) - Linearithmic Time
// Most efficient sorting algorithms run in O(n log n) time
function mergeSort(array) {
	if (array.length <= 1) {
		return array;
	}

	const middle = Math.floor(array.length / 2);
	const left = array.slice(0, middle);
	const right = array.slice(middle);

	return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
	let result = [];
	let leftIndex = 0;
	let rightIndex = 0;

	while (leftIndex < left.length && rightIndex < right.length) {
		if (left[leftIndex] < right[rightIndex]) {
			result.push(left[leftIndex]);
			leftIndex++;
		} else {
			result.push(right[rightIndex]);
			rightIndex++;
		}
	}

	return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// console.log(mergeSort([33, 100, 1, 2, 4, 25, 12, 5, 2, 2, 3, 10, 80, 11]));
/*
[
	 1,   2,  2,  2,  3,  4,
	 5,  10, 11, 12, 25, 33,
	80, 100
]
*/

// O(n²) - Quadratic Time: The time complexity grows with the square of the input size.
function bubbleSort(array) {
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length - i - 1; j++) {
			if (array[j] > array[j + 1]) {
				[array[j], array[j + 1]] = [array[j + 1], array[j]];
			}
		}
	}
	return array;
}

// console.log(bubbleSort([33, 100, 1, 2, 4, 25, 12, 5, 2, 2, 3, 10, 80, 11]));
/*
[
	 1,   2,  2,  2,  3,  4,
	 5,  10, 11, 12, 25, 33,
	80, 100
]
*/

// Nested loops typically result in O(n²) complexity
function findAllPairs(array) {
	const pairs = [];
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			if (i !== j) {
				pairs.push([array[i], array[j]]);
			}
		}
	}
	return pairs;
}

// console.log(findAllPairs([33, 100, 1]));
/*
[
	[ 33, 100 ],
	[ 33, 1 ],
	[ 100, 33 ],
	[ 100, 1 ],
	[ 1, 33 ],
	[ 1, 100 ]
]
*/

// O(2ⁿ) - Exponential Time
function fibonacci(n) {
	if (n <= 1) {
		return n;
	}
	return fibonacci(n - 1) + fibonacci(n - 2);
}

// console.log(fibonacci(5));