/* Intent of Question here: Minimise the number of comparisions

Input: arr[] = [3, 5, 4, 1, 9]
Output: [1, 9]
Explanation: The minimum element is 1, and the maximum element is 9.

Input: arr[] = [22, 14, 8, 17, 35, 3]
Output: [3, 35] 
Explanation: The minimum element is 3, and the maximum element is 35.

Way-1: Brute force
- Sort the array
- return a[0] and a[n - 1]

TC: O(nlogn)
SC: O(n)

Way-2: 
- use min and max and update both of them in single traversals

    function getMinMax(arr) {
        let mini = Number.MAX_SAFE_INTEGER;
        let maxi = Number.MIN_SAFE_INTEGER;
        
        // Find minimum and maximum
        for (let num of arr) { 
            if (num < mini) mini = num;
            if (num > maxi) maxi = num;
        }

        // OBSERVE: per num -> 2 comparisions
        
        return [mini, maxi];
    }

TC: O(n)
SC: O(1)

Way-3: Optmimal - Compare in pairs
- We try to minimise our comparisions
- If n is odd, set min = max = arr[0]. 0 Comparisions, and the rest of the array has an even number of elements now.
- If n is even, compare arr[0] and arr[1]. The smaller becomes min and the larger becomes max. This costs 1 comparison.
  Each pair costs 3 comparisons: one between the two elements, one for min, and one for max.
  
  for n elements --> n / 2 pairs are there

  So,    1 pair --- 3 comparisions
  for n/2 paris --- x

  x = 3n / 2 comparisions = 1.5n < 2 of the way-2

*/

function getMinMax(arr) {
    const n = arr.length;
    let min, max, i;

    if (n % 2 === 1) {
        min = max = arr[0];
        i = 1;                /* i will start from 1 */
    } else {
        if (arr[0] < arr[1]) {
            min = arr[0];
            max = arr[1];
        } else {
            min = arr[1];
            max = arr[0];
        }
        i = 2;               /* i will start from  2*/
    }

    /* Process elements in pairs now */
    while (i < n - 1) {
        if (arr[i] < arr[i + 1]) {
            min = Math.min(min, arr[i]);
            max = Math.max(max, arr[i + 1]);
        } else {
            min = Math.min(min, arr[i + 1]);
            max = Math.max(max, arr[i]);
        }
        i += 2;
    }

    return [min, max];
}