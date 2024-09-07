/* Leetcode 1356. Sort Integers by The Number of 1 Bits

You are given an integer array arr. Sort the integers in the array in ascending order 
by the number of 1's in their binary representation and in case of two or more integers 
have the same number of 1's you have to sort them in ascending order.

Return the array after sorting it.

Example 1:

Input: arr = [0,1,2,3,4,5,6,7,8]
Output: [0,1,2,4,8,3,5,6,7]
Explantion: [0] is the only integer with 0 bits.
[1,2,4,8] all have 1 bit.
[3,5,6] have 2 bits.
[7] has 3 bits.
The sorted array by bits is [0,1,2,4,8,3,5,6,7]

Approach - 1: Brute force
- iterate every element and simultaneously store the count of bits in element in a map
- sort the map based of its values, if values are same, then based on its keys.
- keep a frequency map separately to keep counts of the array elements,
- We optimise bit count calculation using BK Algo. There are built-in functions in C++ and Java to give count in O(1).

TC: O(n log n) - iterating and getting bit count at the same time using BK Algo
SC: O(n) to store no of bits for every element + O(n) to store array element's frequency 

Approach - 2: Without using maps, directly modify sort()

TC: same as above
SC: O(1) */

function bitCount_BK_Algo(n: number): number {
  let count: number = 0;

  while (n) {
    n = n & (n - 1);
    count++;
  }

  return count;
}


// WAY - 1
function sortByBits(arr: number[]): number[] {
  let n = arr.length;
  if (n === 1) return arr;
  let ans: number[] = [];

  let bitCountMap = new Map(); 
  let freqMap = new Map();

  arr.forEach((ele) => {
    bitCountMap.set(ele, bitCount_BK_Algo(ele));
    if(!freqMap.has(ele)) freqMap.set(ele, 1);
    else freqMap.set(ele, freqMap.get(ele) + 1);
  });

  let countArr = Array.from(bitCountMap).sort((a, b) => {
    if (a[1] === b[1]) {
      // If values are equal, compare the keys
      return a[0] - b[0];
    }
    // Otherwise, compare the values
    return a[1] - b[1];
  });
  bitCountMap = new Map(countArr);

  // there can be duplicates in the array, we need to return all the duplicates.
  bitCountMap.forEach((value, key) => {
    let count = freqMap.get(key);
    while(count) {
        ans.push(key);
        count--;
    }
  });

  return ans;
}

// Way - 2:
function sortByBits(arr: number[]): number[] {
    let n = arr.length;
    if (n === 1) return arr;
  
    arr = arr.sort((a, b) => {
      if(bitCount_BK_Algo(a) === bitCount_BK_Algo(b)) return a - b;
      else return bitCount_BK_Algo(a) - bitCount_BK_Algo(b);
    });
    
    return arr;
};


