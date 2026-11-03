/* 152.Maximum Product Subarray

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
In product: a negative is NOT always bad if multiplied by another negative

zero is a hard wall — anything × 0 = 0, so the subarray must restart after a 0.

Example: [-3, -10] → 30 (huge!)

So we cannot just drop negatives

                                        Core Idea (Kadane Adaptation)
                                        -----------------------------

At every index, we must track:
    maxProduct → largest product of a subarray ending at i
    minProduct → smallest (most negative) product of a subarray ending at i, this can suddenly become HUGE in future

*/

function maxProductSubarray(arr) {
    let maxProduct = arr[0];
    let minProduct = arr[0];
    let result = arr[0];

    for (let i = 1; i < arr.length; i++) {

        /* 0 is automatically handled as both max and min products collapse to 0

            Candidate	    Formula	    Value
            start fresh	        x	      0 
            extend best	  x * maxProduct  0
            extend worst  x * minProduct  0

            All three candidates are 0

            What happens when we encounter non-zero after 0?
            
            Say the next element is x = 2 (like in [-2, 6, -3, -10, 0, 2]).

            Now maxProduct = 0 and minProduct = 0 from the previous step:

            Candidate	            Formula	        Value
            start fresh	               x	          2 ✅
            extend best	               2 × 0	      0
            extend worst	           2 × 0	      0

            maxProduct = max(2, 0, 0) = 2 --> Fresh start happens

        */
        let tempMax = Math.max(arr[i], arr[i] * maxProduct, arr[i] * minProduct);
        let tempMin = Math.min(arr[i], arr[i] * maxProduct, arr[i] * minProduct);

        /*  Why tempMax/tempMin?
            the above formulae will use updated values instead of old ones
        */
        maxProduct = tempMax;    // must compute both BEFORE overwriting,
        minProduct = tempMin;    // since tempMin needs the OLD maxProduct

        result = Math.max(result, maxProduct);
    }

    return result;
}

function maxProductSubarray_ActuallSubarray(arr) {
    let currentMaxProduct = arr[0], currentMinProduct = arr[0], maxProduct = arr[0];

    let start = 0, end = 0, tempStart = 0;

    for (let i = 1; i < arr.length; i++) {

        // If negative → swap roles
        if (arr[i] < 0) {
            [currentMaxProduct, currentMinProduct] = [currentMinProduct, currentMaxProduct];
        }

        if (arr[i] > currentMaxProduct * arr[i]) {
            currentMaxProduct = arr[i];
            tempStart = i;
        } else {
            currentMaxProduct = currentMaxProduct * arr[i];
        }

        currentMinProduct = Math.min(arr[i], currentMinProduct * arr[i]);

        if (currentMaxProduct > maxProduct) {
            maxProduct = currentMaxProduct;
            start = tempStart;
            end = i;
        }
    }

    console.log(arr.slice(start, end + 1));
    return maxProduct;
}