/* 219. Contains Duplicate II
Given an integer array nums and an integer k, return true if there are 
two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

Input: nums = [1,2,3,1], k = 3
Output: true

Input: nums = [1,0,1,1], k = 1
Output: true

Input: nums = [1,2,3,1,2,3], k = 2
Output: false

Constraints:
    1 <= nums.length <= 10^5
    -10^9 <= nums[i] <= 10^9
    0 <= k <= 10^5


CORNER CASE:
- if k === n, check first and last element directly


                                                BRUTE FORCE
                                                -----------

- for every i, try each j from (i + 1) --- (n - 1) and withing the allowed difference, check if a[i] === a[j]

                              for (let i = 0; i < n; i++) {

                                  for (let j = (i + 1); j < n; j++) {
                                      if ((Math.abs(i - j) <= k) && (a[i] === a[j])) return true;
                                  }
                              }

                              return false;

TC: O(n ^ 2)
SC: O(1)

Better and Simpler Approach: Hash map
hash = <ele, lastIndex>

i = 0:
   0  1  2  3
  [1, 2, 3, 1]
   i

  hash does not has it, so push in hash
  <1, 0>

i = 1:
   0  1  2  3
  [1, 2, 3, 1]
      i

  hash does not has it, so push in hash
  <1, 0>
  <2, 1>

i = 2:
   0  1  2  3
  [1, 2, 3, 1]
         i

  hash does not has it, so push in hash
  <1, 0>
  <2, 1>
  <3, 2>

i = 3:
   0  1  2  3
  [1, 2, 3, 1]
            i

  hash has it,  
  if(i - hash.get(a[i]) <= k) return true;
  else hash[a[i]] = i
  <1, 0>
  <2, 1>
  <3, 2>

After iteration completes, return false


                      function containsNearbyDuplicate(a: number[], k: number): boolean {
                          const n = a.length;

                          let hash = new Map();

                          for (let i = 0; i < n; i++) {

                              if(!hash.has(a[i])) hash.set(a[i], i);
                              else {
                                  if(Math.abs(i - hash.get(a[i])) <= k) return true;
                                  else hash.set(a[i], i);
                              }
                          }

                          return false;
                      };


TC: O(n)
SC: O(n) - If all the elements are unique

Another approach: Sliding window + hashSet - This is little complex to think

let nums = [1,2,3,1,3,2], k = 2

Idea: Maintain a set of size k always which represent k elements at any point of time


j = 0:
         0  1  2  3  4  5
        [1, 2, 3, 1, 3, 2]     k = 2
         i
         j

         a[j] not in set, push it
         set = [1]

j = 1:
         0  1  2  3  4  5
        [1, 2, 3, 1, 3, 2]     k = 2
         i  j

         a[j] not in set, push it
         set = [1, 2]

j = 2:
         0  1  2  3  4  5
        [1, 2, 3, 1, 3, 2]     k = 2
         i     j

         a[j] not in set, push it
         set = [1, 2, 3]

         Set's size > k, remove a[i]

         0  1  2  3  4  5
        [1, 2, 3, 1, 3, 2]     k = 2
            i  j

        set = [2, 3]

j = 3:
         0  1  2  3  4  5
        [1, 2, 3, 1, 3, 2]     k = 2
            i     j

         a[j] not in set, push it
         set = [2, 3, 1]

         Set's size > k, remove a[i]

         0  1  2  3  4  5
        [1, 2, 3, 1, 3, 2]     k = 2
               i  j

        set = [3, 1]

j = 4:
         0  1  2  3  4  5
        [1, 2, 3, 1, 3, 2]     k = 2
            i        j

         a[j] in set and set.size <= k, so return true;


*/

function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const set = new Set();

  let left = 0;

  for (let right = 0; right < nums.length; right++) {

    // if duplicate inside window
    if (set.has(nums[right])) return true;

    set.add(nums[right]);

    // shrink window if size > k
    if (right - left >= k) {
      set.delete(nums[left]);
      left++;
    }
  }

  return false;
};