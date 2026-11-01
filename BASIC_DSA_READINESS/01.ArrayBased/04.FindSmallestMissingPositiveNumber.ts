/* 41. First Missing Positive || Smallest Missing Positive Number

Given an unsorted integer array nums. 
Return the smallest positive integer that is not present in nums.
You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.

Input: nums = [1,2,0]
Output: 3
Explanation: The numbers in the range [1,2] are all in the array.

Input: nums = [3,4,-1,1]
Output: 2
Explanation: 1 is in the array but 2 is missing.

Input: nums = [7,8,9,11,12]
Output: 1
Explanation: The smallest positive integer 1 is missing.

Constraints:

1 <= nums.length <= 10^5
-2^31 <= nums[i] <= 2^31 - 1

                                            BRUTE FORCE - Sorting
                                            ---------------------

The idea is to sort the array and assume the missing number as 1. 
Now, iterate over the array and for each element arr[i],

If arr[i] == missing number, then increment missing number by 1.
If arr[i] < missing number, then continue to search for the missing number.
If arr[i] > missing number, then break and return the missing number 

*/

function missingNumber(arr) {
    arr.sort((a, b) => a - b);

    // ans will hold the current smallest missing number, initially set to 1
    let res = 1;
    for (let i = 0; i < arr.length; i++) {

        // If we have found 'res' in the array, 'res' is no longer missing, so increment it
        if (arr[i] == res) res++;

        // If the current element is larger than 'res', 'res' cannot be found in the array, 
        // so it is our final answer
        else if (arr[i] > res) break;
    }

    return res;
}

/*                                  Using Cycle Sort - O(n) Time and O(1) Space
                                    -------------------------------------------

OBSERVATION:
- If the array has all elements in range [1, n] and its is sorted, then
 
         0  1  2  3  4
    a = [1, 2, 3, 4, 5]

        1 is at 0
        2 is at 1
        3 is at 2
        .
        .
        a[i] is always at (a[i] - 1)th index - Idea of cycle sort algo
       

Idea: Move each element in the array to its correct position based on its value.
      For each number, say x, such that 1 ≤ x ≤ n, verify if its placed at the (x - 1)th index.
      If not at correct place --> Move to its correct place by swap(a[x], a[a[x] - 1])

Dry run:

n = 5, so range = [1, n] = [1, 5]


i = 0:

     0   1  2  3  4  5
    [2, -3, 4, 1, 1, 7]
     i

     a[i] = 2, it should be at 2 - 1 = 1st index, swap(a[i], a[a[i] - 1])

     0   1  2  3  4  5
    [-3  2, 4, 1, 1, 7]
      i

      a[i] = -3, its out of range [1, n], so i++

i = 1:

      0  1  2  3  4  5
    [-3, 2, 4, 1, 1, 7]
         i

      a[i] = 2, it should be at 2 - 1 = 1th index -> correct position, hence i++

i = 2:

      0  1  2  3  4  5
    [-3, 2, 4, 1, 1, 7]
            i

      a[i] = 4, it should be at 4 - 1 = 3rd index swap(a[i], a[a[i] - 1])

      0  1  2  3  4  5
    [-3, 2, 1, 4, 1, 7]
            i
       
      a[i] = 1, it should be at 1 - 1 = 0th index, swap(a[i], a[a[i] - 1])
      
      0  1  2  3  4  5
    [ 1, 2,-3, 4, 1, 7]
            i
       
      a[i] = -3, out of range, so i++
    

i = 3:

      0  1   2  3  4  5
    [ 1, 2, -3, 4, 1, 7]
                i

    a[i] = 4, at correct position, i++

i = 4:

      0  1   2  3  4  5
    [ 1, 2, -3, 4, 1, 7]
                   i

    a[i] = 1, it should be at 1 - 1 = 0, but at 0th index, we already have 1, so i++

i = 5:

      0  1   2  3  4  5
    [ 1, 2, -3, 4, 1, 7]
                      i

    a[i] = 7 -> out of range, i++

Now, scan the array again, and return the first index at which element !== index + 1
If no such index is there, then return n + 1

*/

function missingNumber_CycleSort(a: number[]) {
    let n = a.length;

    for (let i = 0; i < n; i++) {

        /* if a[i] is within [1, n]   a[i] is not placed at (a[i]-1)th index in a */
        while ((a[i] >= 1 && a[i] <= n) && (a[i] !== a[a[i] - 1])) {
            
            /* Note:
               Don't do this: [a[i], a[a[i] - 1]] = [a[a[i] - 1], a[i]];
               while swapping, a[i] changes, hence original value gets lost
               Workaround is to store the original value
            */
            const idx = a[i] - 1;
            [a[i], a[idx]] = [a[idx], a[i]];
        }
    }

    /* Scan array again and If any number is not at its corresponding index it is then missing */
    for (let i = 0; i < n; i++) {
        if (a[i] !== (i + 1)) return (i + 1);
    }

    /* If all number from 1 to n are present then n+1 is smallest missing number */
    return n + 1;
}