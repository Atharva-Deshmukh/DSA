/* Maximum Product Subarray

Given an array arr[] that contains positive and negative integers (may contain 0 as well). 
Find the maximum product that we can get in a subarray of arr[].

Note: It is guaranteed that the answer fits in a 32-bit integer.

Input: arr[] = [-2, 6, -3, -10, 0, 2]
Output: 180
Explanation: The subarray with maximum product is [6, -3, -10] with product = 6 * (-3) * (-10) = 180.

Input: arr[] = [-1, -3, -10, 0, 6]
Output: 30
Explanation: The subarray with maximum product is [-3, -10] with product = (-3) * (-10) = 30.

Input: arr[] = [2, 3, 4] 
Output: 24 
Explanation: For an array with all positive elements, the result is product of all elements. 

Constraints:
    1 ≤ arr.size() ≤ 10^6
    -100 ≤ arr[i] ≤ 100

                                        Why Normal Kadane Fails Here?
                                        -----------------------------

In sum: Negative is always bad → drop it
In product: Negative can become very good (if multiplied by another negative)

Example: [-3, -10] → 30 (huge!)

So we cannot just drop negatives

                                        Core Idea (Kadane Adaptation)
                                        -----------------------------

At every index, we must track:
    maxProduct → maximum product ending here
    minProduct → minimum product ending here (important!)

Why min? -> A small negative × negative = large positive

*/

function maxProductSubarray(arr) {
    let maxProduct = arr[0];
    let minProduct = arr[0];
    let result = arr[0];

    for (let i = 1; i < arr.length; i++) {

        let currEle = arr[i];

        /* At each step:
            Either start fresh from currEle
            Or extend previous max product
            Or extend previous min product (because it may flip)

        Zero breaks subarray -> It resets both max and min
        
        */

        let tempMax = Math.max(currEle, currEle * maxProduct, currEle * minProduct);
        let tempMin = Math.min(currEle, currEle * maxProduct, currEle * minProduct);

        maxProduct = tempMax;
        minProduct = tempMin;

        result = Math.max(result, maxProduct);
    }

    return result;
}

function maxProductSubarrayWithElements(arr) {
    let maxProduct = arr[0], minProduct = arr[0], result = arr[0];

    let start = 0, end = 0, tempStart = 0;

    for (let i = 1; i < arr.length; i++) {

        let x = arr[i];

        // If negative → swap roles
        if (x < 0) {
            [maxProduct, minProduct] = [minProduct, maxProduct];
        }

        if (x > maxProduct * x) {
            maxProduct = x;
            tempStart = i;
        } else {
            maxProduct = maxProduct * x;
        }

        minProduct = Math.min(x, minProduct * x);

        if (maxProduct > result) {
            result = maxProduct;
            start = tempStart;
            end = i;
        }
    }

    console.log(arr.slice(start, end + 1));
    return result;
}