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


Iterate array from last and get the first element (pivot) which is smaller than its next digit (a[i-1] < a[i])
         0  1  2  3  4  5
        [2, 4, 1, 7, 5, 0]
               |
             pivot

Find the smallest digit in the right greater than pivot and swap them, NGE(pivot) = 5
         0  1  2  3  4  5
        [2, 4, 5, 7, 1, 0]

Reverse the array from from a[(pivot + 1) -- (n - 1)]
         0  1  2  3  4  5
        [2, 4, 5, 0, 1, 7]

Rather than using a stack for smallest integer > pivot on right, 
utilise the fact that elements after pivot are already in decreasing order
we already know that a[(pivot + 1) -- (n - 1)] are sorted in descending order, 
so iterate again from (n - 1)---pivot and get the smallest element greater than pivot swap it

TC: O(n)
SC: O(1)   */


/* We can convert input number to a string and vice versa
console.log(n.toString());
console.log(Number(n.toString())); 

Just translate the above logic to code */

function nextGreaterElement(n: number): number {
    if(n === 1) return -1;
    
    /* Convert the number to string to perform Operation  */
    let numStrArr: string[] = n.toString().split("");
    const len: number = numStrArr.length;
    let i: number = (len - 1)
    
    /* Move reverse until we have decreasing order */
    while((i >= 0) && ((i-1) >= 0) && (Number(numStrArr[i - 1]) >= Number(numStrArr[i]))) i--;
    
    /* Case: we have n = 4321, so no next greater permutation exist */
    if(i === 0) return -1;
    
    /* In case i !== 0, we got pivot element  pivot element at a[i-1] 
       get next greater element index from (pivot + 1) -- (n-1) and swap them
    */
    
    const pivotIndex: number = (i - 1);
    
    i = (len - 1);
    
    /* We want first greater number after pivot, hence >= is used to get only the striclty greatest */
    while((i >= 0) && (Number(numStrArr[pivotIndex]) >= Number(numStrArr[i]))) i--;
    
    /* a[i] is the first smallest element larger than pivotIndex
       We don't need a stack here, since after pivot+1, we had elements sorted in descending order
    */
    [numStrArr[i], numStrArr[pivotIndex]] = [numStrArr[pivotIndex], numStrArr[i]];
    
    /* Reverse (pivot + 1) -- (n - 1) */
    let low: number = (pivotIndex + 1);
    let high: number = (len - 1);
    
    while(low < high) {
        [numStrArr[low], numStrArr[high]] = [numStrArr[high], numStrArr[low]];
        
        low++;
        high--;
    }

    
    /* if we code this:
    
    let reversedNum: number = Number(numStringArray.join(''));
    return (reversedNum > Number.MAX_SAFE_INTEGER)? -1: reversedNum;
    
    Issue: Number.MAX_SAFE_INTEGER is 2^53 - 1 (9007199254740991), 
    which is much larger than 2^31 - 1 (2147483647).

    USE:
    Fix: Instead of Number.MAX_SAFE_INTEGER, use 2147483647 explicitly

    */
    
    return (Number(numStrArr.join("")) > 2147483647)? -1: Number(numStrArr.join(""));
}

