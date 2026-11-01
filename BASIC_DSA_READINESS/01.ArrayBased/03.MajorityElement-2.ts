/* 229. Majority Element II

Given an integer array of size n, find all elements that appear 
more than ⌊ n/3 ⌋ times.

Input: nums = [3,2,3]
Output: [3]

Input: nums = [1]
Output: [1]

Input: nums = [1,2]
Output: [1,2]
 

Constraints:
    1 <= nums.length <= 5 * 10^4
    -10^9 <= nums[i] <= 10^9
 

Follow up: Could you solve the problem in linear time and in O(1) space?

Approach: Extended Boyer–Moore Voting
- Its guaranteed that only two candidates will be there at max.

    Suppose 3 different elements each appear more than ⌊n/3⌋ times.

    Let their counts be:
        a > n/3
        b > n/3
        c > n/3

    Then total elements would be:

    (a + b + c) > (n/3 + n/3 + n/3) > (3n) / 3

    That means: (a + b + c) > n

    ❌ Impossible — because the array size is exactly n.

TWIST THE ALGO A BIT

Maintain: candidate1, candidate2
          count1, count2

Step 2: Traverse array
- If num == candidate1 → count1++
- Else if num == candidate2 → count2++
- Else if count1 == 0 → candidate1 = num, count1 = 1
- Else if count2 == 0 → candidate2 = num, count2 = 1
- Else → count1--, count2--

Step 3: Validate candidates

Count occurrences again and check > n/3 condition

REMEMBER THE ORDER:
1. match candidate1
2. match candidate2
3. assign candidate1
4. assign candidate2
5. decrement both

*/

function majorityElement2(a: number[]): number[] {
    const n = a.length;

    let count1 = 0, count2 = 0, candidate1 = -1, candidate2 = -1;
    let ans = [];
 
    for(let i = 0; i < n; i++) {
        if(a[i] === candidate1) count1++;
        else if(a[i] === candidate2) count2++;
        else if(count1 === 0) {
            candidate1 = a[i];
            count1 = 1;
        }
        else if(count2 === 0) {
            candidate2 = a[i];
            count2 = 1;
        } 
        else {
            count1--;
            count2--;
        }
    }

    count1 = 0;
    count2 = 0;
    for(let ele of a) {
        if(ele === candidate1) count1++;
        else if(ele === candidate2) count2++;
    }

    if(count1 > Math.floor(n / 3)) ans.push(candidate1);
    if(count2 > Math.floor(n / 3)) ans.push(candidate2);

    return ans;
}