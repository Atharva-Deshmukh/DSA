/* Product array puzzle
Given an array, arr[] construct a product array, res[] where each element in res[i] 
is the product of all elements in arr[] except arr[i]. Return this resultant array, res[].
Note: Each element is res[] lies inside the 32-bit integer range.

Input: arr[] = [10, 3, 5, 6, 2]
Output: [180, 600, 360, 300, 900]
Explanation: For i=0, res[i] = 3 * 5 * 6 * 2 is 180.
For i = 1, res[i] = 10 * 5 * 6 * 2 is 600.
For i = 2, res[i] = 10 * 3 * 6 * 2 is 360.
For i = 3, res[i] = 10 * 3 * 5 * 2 is 300.
For i = 4, res[i] = 10 * 3 * 5 * 6 is 900.

Input: arr[] = [12, 0]
Output: [0, 12]
Explanation: For i = 0, res[i] is 0.
For i = 1, res[i] is 12.

Constraints:
    2 <= arr.size() <= 10^5
    -100 <= arr[i] <= 100


BRUTE FORCE:
- For each i, iterate from 0 --- (n - 1) except current i and calculate product
- If there is some 0, make product = 0 and break loop there itself

TC: O(n ^ 2)
SC: O(1)

OPTIMAL APPROACH: Using Prefix and Suffix Array - O(n) Time and O(n) Space
- We need to think of avoiding this recalculation of products again and again, 
  we can precompute this 

  Its like splitting an array into two equal sum subarrays
  
- The idea is to precompute the prefix and suffix products and store them in two arrays. 
  Now we can find the product of array except i-th element, by using these precomputed arrays 
  in O(1)
  product of array except i-th element = prefProduct[i] * suffProduct[i]
    prefProduct[i] stores product of all elements before i-th index in the array.
    suffProduct[i] stores product of all elements after i-th index in the array. */

function productExceptSelf(arr: number[]) {
    const n = arr.length;
    const prefProduct = new Array(n).fill(1);
    const suffProduct = new Array(n).fill(1);
    const res = new Array(n);

    // Construct the prefProduct array
    for (let i = 1; i < n; i++) prefProduct[i] = arr[i - 1] * prefProduct[i - 1];

    // Construct the suffProduct array
    for (let j = (n - 2); j >= 0; j--) suffProduct[j] = arr[j + 1] * suffProduct[j + 1];

    // Construct the result array using prefProduct[] and suffProduct[]
    for (let i = 0; i < n; i++) res[i] = prefProduct[i] * suffProduct[i];

    return res;
}

/* But the above solution is a double pass solution, we can make it single pass by computing
   prefProduct[] at the run time since while 0 -- (n - 1) traversal, we know the left elements of array.


   But there is another efficient solution than this.
   - If there is no zero in the array, we can simply get productExcept[i] = totalproduct / a[i]
   - If there is exactly one zero, we can calculate products before it and after it and rest other
     element's answer = 0 always as zero will be included there
   - If there are more than one 0s, then even if we exclude one 0, product will still have some other 0, 
     so all products will be 0

*/

function productExceptSelfOptimal(a: number[]) {
    const n = a.length;
    const res = new Array(n);

    let zeroCount = 0, totalProduct = 1, firstZeroIndex = -1;

    /* Calculate 0 count and totalProduct and first zero's index side by side */
    for (let i = 0; i < n; i++) {
        if (a[i] === 0) {
            if(firstZeroIndex === -1) firstZeroIndex = i; /* We need first index only */
            zeroCount++;
        }
        totalProduct *= a[i];
    }

    if(zeroCount > 1) res.fill(0);
    else if(zeroCount === 0)  {
        for (let i = 0; i < n; i++) res[i] = Math.floor(totalProduct / a[i]);
    } 
    else if(zeroCount === 1) {
        res.fill(0);
        let leftProd = 1, rightProd = 1;
        for (let i = 0; i < n; i++) {
            if(i < firstZeroIndex) leftProd *= a[i];
            else if(i > firstZeroIndex) rightProd *= a[i];
        }
        res[firstZeroIndex] = leftProd * rightProd;
    }

    return res;
}