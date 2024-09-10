/* 1442. Count Triplets That Can Form Two Arrays of Equal XOR

Given an array of integers arr.
We want to select three indices i, j and k where (0 <= i < j <= k < arr.length).

Let's define a and b as follows:

a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]

Return the number of triplets (i, j and k) Where a == b.

Input: arr = [2,3,1,6,7]            Output: 4
Explanation: The triplets are (0,1,2), (0,2,2), (2,3,4) and (2,4,4)
Example 2:

Input: arr = [1,1,1,1,1]            Output: 10

Brute force: 
- It is simple, initialise 3 indices and verify XOR.
TC: O(n ^ 3)
SC: O(1)

Optimised - 1:
- [i -- j-1] = a
  [j -- k]   = b            And we are verifing a = b, can also be written as (a ^ b) = 0

- So, this can be written as ([i -- j-1] ^ [j -- k]) = 0
  OR
  [i --- k] such that a[i] ^ a[i+1] ^ ... a[k] = 0, j can be kept anywhere in between
  so, ans = no of places where j can be placed.
  Basically, we beed to find the subarray whose XOR = 0 and then get the count from it


  ex: xor [1...5] = 0,
      j can be placed at index 2, 3, 4, 5 = (k - i) places total
      count = k - i
 
  but TC = O(n ^ 3) since we are calculating xor(i -- k) again and again to verify if it is 0 or not.

  This can be optimised.

Optimised - 2:
- use prefixSum[], pref[i] = xor(arr[0]...arr[i])
- Recall the 0 sum subarray problem, whenever we needed to find subarray with 0 sum, we checked for equal prefix sums
           0  1  2  3  4
ex: arr = [1, 3, 2, -2, 1]
   pref = [1, 4, 6, 4,  5]

   pref[1] = pref[3] ==> subArr(2--3) = 0
 
   Same can be applied to XOR

           0  1  2  3  4
    arr = [2, 3, 1, 6, 7]
    xor = [2, 1, 0, 6, 1]

    xor(1) === xor(4), it means xor(2 --- 4) was 0, tabhi 1 ^ 0 = 1 hua n, remaining 0 tha


    Note that, we not only need the same xor, but also xor = 0 directly, hence to make things simple, 
    unshift(0) in xor[] to add 0 at beginning of xor[]
           0  1  2  3  4  5
    xor = [0, 2, 1, 0, 6, 1]

    now, while iterating this xor[], count = k - i - 1, since we added extra element at beginning of xor[]

    We fix i and k, iterate using two loops for possible i and k on xor[] and check where we get xor[i] === xor[k]
    TC: O(n ^ 2) 
    SC: O(1) 

Optimised - 3: 
- use map in format: uniqueEle: [all the indices]
- no need to add 0 at beginning of xor[], since we will directly iterate map and figure out the count.
- in two loops method, if any element say 1 is found at index 0, 2, 4, we use count+=((2 - 0) + (4 - 0) + (4 - 2)), 
  we tried all possible combinations here, hence we need to store all indices in the map

BUT MAP is a BIT COMPLICATED since for every pair of indices, we need to calulate with all previous indices in the map,
it will be better done using two loops */

function xorInRange(a: number[], low: number, high: number): number {
    let xor: number = 0;
    for(let i = low; i <= high; i++) xor = xor ^ a[i];
    return xor;
}

function bruteForce(a: number[]): number {
    let n: number = a.length;
    let count: number = 0;

    for(let i = 0; i < n - 1; i++) {
        for(let j = i + 1; j < n; j++) {
            for (let k = j; k < n; k++) {
                if((xorInRange(a, i , j - 1)) === (xorInRange(a, j, k))) count++;
            }
        }
    }

    return count;
}

/* Using two loops and a xor[], xor[i] = (arr[0]^arr[1] .... ^ arr[i]) */
function countTripletsUsingTwoLoops(a: number[]): number {
    let n: number = a.length;

    if(n === 1) return 0;

    //fill xor[]
    let xor: number[]= [];
    xor.push(a[0]);            // xor[0] === a[0]
    for(let i = 1; i < n; i++) xor.push((xor[i - 1] ^ a[i]));
    xor.unshift(0);             // add 0 at the beginning

    let count: number = 0;

    // i will go till n - 2 only and k will always be ahead of i
    for(let i = 0; i < xor.length - 1; i++) {
        for(let k = i + 1; k < xor.length; k++) {
            if(xor[i] === xor[k]) count = count + (k - i - 1);
        }
    }

    return count;
}

// function solutionUsingMap(a: number[]): number {
//     let count: number = 0;
//     let n: number = a.length;

//     if(n === 1) return 0;

//     //fill xor[]
//     let xor: number[]= [];
//     xor.push(a[0]);            //Since, xor[0] === a[0]
//     for(let i = 1; i < n; i++) xor.push((xor[i - 1] ^ a[i]));

//     // create a map in format: uniqueEle: [all occurrences]
//     let map = new Map<number, number[]>();
//     xor.forEach((ele, currentIndex) => {
//         if(!map.has(ele)) map.set(ele, [currentIndex]);
//         else if(map.has(ele)) {
//             let currentArr: number[] = map.get(ele);
//             currentArr.push(currentIndex);
//             map.set(ele, currentArr);
//         }
//     });

//     /*                0  1  2  3   4  5
//     for 0, say xor = [1, 0, 2, 0 , 3, 0]
//     count += ((1 - 0) + (3 - 0) + (5 - 0) + (3 - 2) + (5 - 4))

//     for rest of numbers, we dont need to count from 0, just consider combinations among those indices only
//     */
//     for(let [key, value] of map) {
//         if(key === 0) {
//             // wrt index 0 for every element
//             value.forEach((ele) => {
//                 count += (ele - 0)
//             });

//             // now for among themselves just try all combinations, works only if there are multiple occurrences
//             if(value.length > 1) {
//                 for(let i = 1; i < value.length; i++) count += (value[i] - value[i - 1]);
//             }
//         }
//         else if((key !== 0) && (value.length > 1)) {
//             for(let i = 1; i < value.length; i++) count += (value[i] - value[i - 1]);
//         }
//     }

//     return count;
// }