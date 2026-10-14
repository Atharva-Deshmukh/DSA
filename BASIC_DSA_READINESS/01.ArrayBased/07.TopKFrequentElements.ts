/* 347. Top K Frequent Elements

Given an integer array nums and an integer k, return the k most frequent elements. 
You may return the answer in any order.

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

Input: nums = [1], k = 1
Output: [1]

Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2
Output: [1,2]

Constraints:

    1 <= nums.length <= 10^5
    -10^4 <= nums[i] <= 10^4
    k is in the range [1, the number of unique elements in the array].
    It is guaranteed that the answer is unique.
 
Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

                                                    BRUTE FORCE:
                                                    -----------

- Count frequencies using a map, sort the map and return the top k entires

TC: O(n) + O(k * logk)
SC: O(k)

                                                 HASH + MIN HEAP:
                                                 ----------------

- Calculate frequencies using a map and then store this map's key-values into a minheap,
- Highest frequencies are on top this way

TC: O(n) + O(k * logk)
SC: O(k) k -> distince elements

                                                QUICK SELECT LOGIC:
                                                -------------------
                                    
- Its difficult to think of it at first but it will be intuitive once practised
- Quick Select is used to find the K-th largest/smallest element without fully sorting the array.

    It is based on Quick Sort’s partition idea, but:
    - Quick Sort → sorts everything
    - Quick Select → only finds what we need

 Lets understand it through an example:

          0  1  2  3  4  5  6  7
 let a = [8, 3, 5, 7, 6, 1, 4, 2], we have to find 4th smallest element, so k = 3

 if a[] were already sorted
     a = [1, 2, 3, 4, 5, 6, 7, 8]
          0  1  2  3  4  5  6  7

          so 4th smallest element = 4 = index 3 --> We target for pivot = 3

Now, let pivot = last element = 2 at index 7:
after partitioning, array becomes

          0  1  2  3  4  5  6  7
     a = [1, 2, 8, 3, 5, 7, 6, 4]
             |
            pivot

    Now, k = 3

    3 > index pivot-index (1), so recurse ONLY for right half, not left also, unlike quick sort algo

          0  1  2  3  4  5
     a = [8, 3, 5, 7, 6, 4]

     let pivot = 4 at index 5

     after partitioning, a[] becomes

          0  1  2  3  4  5  6  7
     a = [1, 2, 3, 4, 8, 5, 7, 6]
             |     |
             |   pivot
             |

      pivot = k = 3 --> stop!
      if the array were sorted, this would be 4th smallest element, 

      Thought process:

      - Partition based on frequency
      - Ensure:
        -> low freq elements → left
        -> high freq elements → right
      - Stop when the last k elements are correct

        Example:
        arr = [3, 1, 4, 4, 5, 2, 6, 1]
        k = 2

        Step 1: Build frequency map
        Frequency:
            3 → 1
            1 → 2
            4 → 2
            5 → 1
            2 → 1
            6 → 1

        Step 2: Create distinct array
        distinct = [3, 1, 4, 5, 2, 6]
        We will rearrange THIS array.

        We want Top k frequent → at the END
        If the array were sorted in increasing order, top k frequent elements would have been at the end

        So target index = n - k = 6 - 2 = 4
        
        After Quick Select: indices [4, 5] = top 2 frequent elements
*/

function topKFrequent(arr, k) {

    // Step 1: Build frequency map
    const freqMap = new Map();
    for (let num of arr) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    // Step 2: Get distinct elements
    const distinct = Array.from(freqMap.keys());
    const n = distinct.length;

    // Step 3: Partition function
    function partition(left, right, pivotIndex) {
        const pivotVal = distinct[pivotIndex];
        const pivotFreq = freqMap.get(pivotVal);

        // Move pivot to end
        [distinct[pivotIndex], distinct[right]] = [distinct[right], distinct[pivotIndex]];

        let storeIndex = left;

        for (let i = left; i < right; i++) {
            const currFreq = freqMap.get(distinct[i]);

            // Condition:
            // smaller freq OR same freq but smaller value → LEFT
            if (
                currFreq < pivotFreq ||
                (currFreq === pivotFreq && distinct[i] < pivotVal)
            ) {
                [distinct[i], distinct[storeIndex]] = [distinct[storeIndex], distinct[i]];
                storeIndex++;
            }
        }

        // Move pivot to its correct place
        [distinct[storeIndex], distinct[right]] = [distinct[right], distinct[storeIndex]];

        return storeIndex;
    }

    // Step 4: Quick Select
    function quickSelect(left, right, targetIndex) {
        if (left >= right) return;

        // Random pivot
        let pivotIndex = left + Math.floor(Math.random() * (right - left + 1));

        pivotIndex = partition(left, right, pivotIndex);

        if (pivotIndex === targetIndex) return;
        else if (pivotIndex > targetIndex) {
            quickSelect(left, pivotIndex - 1, targetIndex);
        } else {
            quickSelect(pivotIndex + 1, right, targetIndex);
        }
    }

    // Step 5: Find position where top k starts
    const targetIndex = n - k;

    quickSelect(0, n - 1, targetIndex);

    // Step 6: Take last k elements
    const result = distinct.slice(targetIndex);

    // Step 7: Sort final answer
    result.sort((a, b) => {
        if (freqMap.get(a) !== freqMap.get(b)) {
            return freqMap.get(b) - freqMap.get(a); // higher freq first
        }
        return b - a; // larger number first
    });

    return result;
}


// 🔹 Example
const arr = [3, 1, 4, 4, 5, 2, 6, 1];
const k = 2;

console.log(topKFrequent(arr, k)); // [4, 1]

/* Time Complexity

Let:
    n = size of array
    d = distinct elements

Steps:
    Frequency map → O(n)
    Quick Select →
        Average: O(d)
        Worst: O(d²)
Final:
Average: O(n)
Worst: O(n²)

Space Complexity: O(n)
(for map + distinct array)

*/