/* This is slightly different question but asked commonly

Given a positive integer n, find the smallest integer which has exactly the 
same digits existing in the integer n and is greater in value than n. 
If no such positive integer exists, return -1.

Note that the returned integer should fit in 32-bit integer, 
if there is a valid answer but it does not fit in 32-bit integer, return -1.

Input: n = 12       Output: 21

Input: n = 21       Output: -1

Input: N = “218765”
Output: “251678”
Explanation: The next number greater than 218765 with same set of digits is 251678.


Input: n = “1234”
Output: “1243”
Explanation: The next number greater than 1234 with same set of digits is 1243.


Input: n = “4321”
Output: “Not Possible”
Explanation: 4321 is the greatest number possible with same set of digits.\

Constraints:
1 <= n <= 2^31 - 1


BASICALLY, it is the next permutation of N

Approach: Must know, difficult to think during interview

         0  1  2  3  4  5
let a = [2, 4, 1, 7, 5, 0]


Iterate array from last and get the first element (pivot) for which a[i - 1] < a[i]
         0  1  2  3  4  5
        [2, 4, 1, 7, 5, 0]
               |
             pivot

Find the NGE(pivot) and swap them, NGE(pivot) = 5
         0  1  2  3  4  5
        [2, 4, 5, 7, 1, 0]

Reverse from a[(pivot + 1) -- (n - 1)]
         0  1  2  3  4  5
        [2, 4, 5, 0, 1, 7]

Rather than using a stack for NGE(pivot), utilise the fact that elements after pivot are in decreasing order
we already know that a[(pivot + 1) -- (n - 1)] are sorted in descending order, 
so iterate again from (n - 1)---pivot and get the smallest element greater than pivot swap it

TC: O(n)
SC: O(1)   */


/* We can convert input number to a string and vice versa
console.log(n.toString());
console.log(Number(n.toString())); */
function nextPermutation(num: number) {
    if(num <= 1) return -1;

    let numStringArray: string[] = num.toString().split(''); // to facilitate swap in future
    let n: number = numStringArray.length; 

    let i: number = (n - 1);
    while((i > 0) && (Number(numStringArray[i - 1]) >= Number(numStringArray[i]))) i--;

    if(i <= 0) return -1;  // means nowhere we encountered a decreasing trend

    // our (i - 1) is pivot now since we compare (i - 1) for i
    let pivot: number = (i - 1);

    // iterate from (n - 1) -- (pivot+1) to get smallest number greater than pivot and swap them
    for(let j = (n - 1); j > pivot; j--) {
        if(numStringArray[j] > numStringArray[pivot]) { 
        [numStringArray[j], numStringArray[pivot]] = [numStringArray[pivot], numStringArray[j]];
        break;  // break here since we need smalles num > pivot
        }
    }

    // reverse string right of pivot, using two pointers to reverse in O(1) space
    let left: number = (pivot + 1);
    let right: number = (n - 1);

    while(left < right) {
        [numStringArray[left], numStringArray[right]] = [numStringArray[right], numStringArray[left]];
        left++;
        right--;
    }

    /* if we code this:
    
    let reversedNum: number = Number(numStringArray.join(''));
    return (reversedNum > Number.MAX_SAFE_INTEGER)? -1: reversedNum;
    
    Issue: Number.MAX_SAFE_INTEGER is 2^53 - 1 (9007199254740991), 
    which is much larger than 2^31 - 1 (2147483647).

    USE:
    Fix: Instead of Number.MAX_SAFE_INTEGER, use 2147483647 explicitly

    */

    let reversedNum: number = Number(numStringArray.join(''));

    return (reversedNum > 2147483647)? -1: reversedNum;
}

