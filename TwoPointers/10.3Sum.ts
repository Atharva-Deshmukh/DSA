/* 15. 3Sum

Given an integer array nums, return all the triplets 
[nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.


Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
 

Constraints:
    3 <= nums.length <= 3000
    -10^5 <= nums[i] <= 10^5


                                        BRUTE FORCE
                                        -----------

- Generate all the triplets
- Also maintain a set and store stringified sorted triplets for detection of duplicates in the map

                                for (let i = 0; i < n - 2; i++) {
                                    for (let j = i + 1; j < n - 1; j++) {
                                        for (let k = j + 1; k < n; k++) {
                                        
                                            // If the sum of triplet equals to zero
                                            // then add it's indexes to the result
                                            if (arr[i] + arr[j] + arr[k] === 0) {
                                                res.push([i, j, k]);
                                            }
                                        }
                                    }
                                }

TC: O(n^3)
SC: O(1)

Better Approach:
- We can eliminate one loop to make it O(n^2)

    a[i] + a[j] + a[k] = 0
                  a[i] = -(a[j] + a[k])

    We will store this in map: -(a[j] + a[k])
    if this is there, we can form triplets
          
    But, we need to be careful that -(a[j] + a[k]) results into unique element, different from a[i] and a[j]
    i.e. the element may be duplicate, but should not be at a[i] and a[j]

    Ex: [-1, 0, 1, 2, -1, -4]
                   i       j

          a[k] = - (2 - (-4)) = 2 = a[i] only!
          
          Put only the elements between i and j to avoid this situation
          Don't simply put every element in the map

          Requirement of the problem: i, j and k should be UNIQUE!

        Ex: [-1, 0, 1, 2, -1, -4]
              i            j
          map = [0, 1, 2]

    DRY RUN:
    -------

    i = 0
    j = 1

      0  1  2  3   4   5
    [-1, 0, 1, 2, -1, -4]
      i  j  

    map [   --> map empty initially hence NOT IN MAP
    before j++, add a[j] to map
    map [ 0
     

    i = 0
    j = 2

      0  1  2  3   4   5
    [-1, 0, 1, 2, -1, -4]
      i     j  

    map [ 0
    map.has(-(a[i] + a[j])) = IN MAP!
    ans = [[-1, 0, 1]]

    before j++, add a[j] to map
    map [ 0, 1

    i = 0
    j = 3

      0  1  2  3   4   5
    [-1, 0, 1, 2, -1, -4]
      i        j  

    map [ 0, 1
    map.has(-(a[i] + a[j])) = -1 = NOT IN MAP!

    before j++, add a[j] to map
    map [ 0, 1, 2

    i = 0
    j = 4

      0  1  2  3   4   5
    [-1, 0, 1, 2, -1, -4]
      i            j  

    map [ 0, 1, 2
    map.has(-(a[i] + a[j])) = 2 = IN MAP!

    ans = [[-1, 0, 1], [-1, -1, 2]]

    before j++, add a[j] to map
    map [ 0, 1, 2, -1

    i = 0
    j = 5

      0  1  2  3   4   5
    [-1, 0, 1, 2, -1, -4]
      i                j   

    map [ 0, 1, 2, -4
    map.has(-(a[i] + a[j])) = 5 = NOT IN MAP!

    ans = [[-1, 0, 1], [-1, -1, 2]]

    j over! stop!


    NOTE: avoid ansSet if we want duplicates also
*/

function threeSum(a: number[]): number[][] {
    const n = a.length;
    let ans = [];
    let ansSet = new Set();
    
    for(let i = 0; i < (n-1); i++) {
        let set = new Set(); /* Set that represents elements between i and j should reset for each i */


        for(let j = (i + 1); j < n; j++) {

            const thirdEle = -(a[i] + a[j]);

            if(set.has(thirdEle)) {
                if(!ansSet.has(JSON.stringify([a[i], a[j], thirdEle].sort((a, b) => a - b)))) ans.push([a[i], a[j], thirdEle]);
                ansSet.add(JSON.stringify([a[i], a[j], thirdEle].sort((a, b) => a - b)));
            }

            /* Before incrementing, put j in set */
            set.add(a[j]);
        }   
    }

    return ans;
};

/*
TC: O(n^2), sorting for 3 elements will be always O(k)
SC: O(n) + O(no of unique triplets) + O(no of unique triplets) for answer


Still optimisation is needed because we are sorting each triplet and storing it in set  to get unique triplets

We can just sort the whole array initially and then try to formulate an algorithm to get unique triplets


      0   1   2   3   4   5  6  7  8  9  10 11 12
a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
      i   j                                    k
      
      Keep i constant, j = i+1 and k at last
      
      Now, sum = -2 < 0 -> move j so that we can get near to 0
      
      0   1   2   3   4   5  6  7  8  9  10 11 12
a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
      i       j                                k

      Now, sum = -2 < 0 -> move j so that we can get near to 0
      0   1   2   3   4   5  6  7  8  9  10 11 12
a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
      i       j                                k

      Now, sum = -2 < 0 -> move j so that we can get near to 0

      0   1   2   3   4   5  6  7  8  9  10 11 12
a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
      i           j                            k

      Now, sum = -1 < 0 -> move j so that we can get near to 0

      0   1   2   3   4   5  6  7  8  9  10 11 12
a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
      i               j                        k

      Now, sum = -1 < 0 -> move j so that we can get near to 0

      0   1   2   3   4   5  6  7  8  9  10 11 12
a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
      i                   j                    k

      Now, sum = -1 < 0 -> move j so that we can get near to 0

      0   1   2   3   4   5  6  7  8  9  10 11 12
a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
      i                      j                 k

      Now, sum = 0
      ans = [-2, 0, 2] -> already sorted

      Now, catch here,
      i is constant
      no point in j++ as its same element
      no point in k-- as its also the same element

      Hence, j++ until we get different element
      Hence, k-- until we get different element

      Since array is sorted, we can do this using while()

      0   1   2   3   4   5  6  7  8  9  10 11 12
a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
      i                            k  j

      j > k now, sorted triplet order is broken, so stop, 
      Now, i++ until we get different element and repeat the above process for this i now


      0   1   2   3   4   5  6  7  8  9  10 11 12
a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
                  i   j                        k


    sum = 0
    ans = [[-2, 0, 2], [-1, -1, 2]] -> already sorted

      0   1   2   3   4   5  6  7  8  9  10 11 12
a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
                  i      j                     k

    sum != 0
    j++ until we get different element

      0   1   2   3   4   5  6  7  8  9  10 11 12
a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
                  i           j                k

    sum != 0 hence k--
    but k-- is same, so k-- until we get different element

          0   1   2   3   4   5  6  7  8  9  10 11 12
    a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
                      i           j    k

    sum != 0
    j++ but its same, so j++ until we get differnt element

          0   1   2   3   4   5  6  7  8  9  10 11 12
    a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
                      i                k  j

    j > k, stop and try for new i now


          0   1   2   3   4   5  6  7  8  9  10 11 12
    a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
                                 i  j              k

    sum = 2 > 0
    k-- until we get different element

          0   1   2   3   4   5  6  7  8  9  10 11 12
    a = [-2, -2, -2, -1, -1, -1, 0, 0, 0, 2, 2, 2, 2]
                                 i  j  k

    sum = 0
    ans = [[-2, 0, 2], [-1, -1, 2], [0, 0, 0]] -> already sorted */

function threeSumOptimal(a: number[]): number[][] {
    const n = a.length;
    let ans = [];

    a = a.sort((a, b) => a - b);

    for(let i = 0; i < n; i++) {

        /* Don't try this i if its not the first element and its equivalent to previous element - we avoid using while() */
        if((i > 0) && (a[i] === a[i - 1])) continue;

        /* For this i, create j and k */
        let j = (i + 1), k = (n - 1);

        while(j < k) {
            const sum = a[i] + a[j] + a[k];

            if(sum < 0) j++;
            else if(sum > 0) k--;
            else { /* sum === 0 is answer */ 
                ans.push([a[i], a[j], a[k]]);
                j++;
                k--;

                /* After we get the triplet, we avoid duplicate j and k */
                while((j < k) && (a[j] === a[j - 1])) j++;
                while((j < k) && (a[k] === a[k + 1])) k--;
            }
        }
    }

    return ans;
};

/*
TC: O(nlogn) + almost O(n ^ 2) 
SC: O(1) if we ignore array to store the answer
*/