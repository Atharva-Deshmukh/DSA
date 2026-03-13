/* 18. 4Sum

Given an array nums of n integers, return an array of all the unique quadruplets 
[nums[a], nums[b], nums[c], nums[d]] such that:
    0 <= a, b, c, d < n
    a, b, c, and d are distinct.
    nums[a] + nums[b] + nums[c] + nums[d] == target

You may return the answer in any order.


Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]
 

Constraints:
    1 <= nums.length <= 200
    -10^9 <= nums[i] <= 10^9
    -10^9 <= target <= 10^9


                                            BRUTE FORCE
                                            -----------

- Simply use 4 loops


    let ans = [];
    const n = a.length;
    let set = new Set();

                    for(let i = 0; i < (n - 3); i++) {
                        for(let j = (i + 1); j < (n - 2); j++) {
                            for(let k = (j + 1); k < (n - 1); k++) {
                                for(let l = (k + 1); l < n; l++) {
                                    const sum = (a[i] + a[j] + a[k] + a[l]);
                                    if((sum === target) && (!set.has(JSON.stringify([a[i], a[j], a[k], a[l]].sort())))) {
                                        ans.push([a[i], a[j], a[k], a[l]]);
                                        set.add(JSON.stringify([a[i], a[j], a[k], a[l]].sort()));
                                    }
                                }
                            }
                        }
                    }

                    return ans;

TC: O(n^5) -> four loops and sorting the value before storing into the map
SC: O(n) for ans

*/

function fourSum(a: number[], target: number): number[][] {
    let ans = [];
    const n = a.length;
    let set = new Set();

    for(let i = 0; i < (n - 3); i++) {
        for(let j = (i + 1); j < (n - 2); j++) {
            for(let k = (j + 1); k < (n - 1); k++) {
                for(let l = (k + 1); l < n; l++) {
                    const sum = (a[i] + a[j] + a[k] + a[l]);
                    if((sum === target) && (!set.has(JSON.stringify([a[i], a[j], a[k], a[l]].sort())))) {
                        ans.push([a[i], a[j], a[k], a[l]]);
                        set.add(JSON.stringify([a[i], a[j], a[k], a[l]].sort()));
                    }
                }
            }
        }
    }

    return ans;
};

/* Way-2: Use hash - But this also fails in some cases as we need to make sure to keep indices in sorted order
                     Its hard to fix, hence better to use sorting + 2 pointers just like 3 sum problem

                    for (let i = 0; i < (n - 2); i++) {

                        let set = new Set();

                        for (let j = (i + 1); j < (n - 1); j++) {
                            for (let k = (j + 1); k < n; k++) {

                                const fourthEle = target - (a[i] + a[j] + a[k]);

                                if (set.has(fourthEle)) {
                                    if (!ansSet.has(JSON.stringify([a[i], a[j], a[k], fourthEle].sort((a, b) => a - b)))) ans.push([a[i], a[j], a[k], fourthEle]);
                                    ansSet.add(JSON.stringify([a[i], a[j], a[k], fourthEle].sort((a, b) => a - b)));
                                }

                                // Before incrementing, put k in set 
                                set.add(a[k]);
                            }

                        }
                    }

                    return ans;

TC: O(n^3)
SC: O(n)

Best Approach: sorting + 2 pointer approach just like 3 sum problem */

function fourSum(a: number[], target: number): number[][] {
    const n = a.length;
    let ans = [];

    a = a.sort((a, b) => a - b);

    for (let i = 0; i < (n - 1); i++) {

        /* Don't try this i if its not the first element and its equivalent to previous element - we avoid using while() */
        if ((i > 0) && (a[i] === a[i - 1])) continue;

        for (let j = (i + 1); j < n; j++) {
           if (j > i + 1 && a[j] === a[j - 1]) continue; // This ensures we only skip duplicates after the first valid j for a given i.

            
            let k = (j + 1), l = (n - 1);

            while (k < l) {
                const sum = a[i] + a[j] + a[k] + a[l];

                if (sum < target) k++;
                else if (sum > target) l--;
                else { /* sum === 0 is answer */
                    ans.push([a[i], a[j], a[k], a[l]]);
                    k++;
                    l--;

                    while ((k < l) && (a[k] === a[k - 1])) k++;
                    while ((k < l) && (a[l] === a[l + 1])) l--;
                }
            }
        }
    }

    return ans;
};