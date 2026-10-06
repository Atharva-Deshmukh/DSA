/* LC 42. Trapping Rain Water

Given n non-negative integers representing an elevation map where the width of each bar is 1, 
compute how much water it can trap after raining.

Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: 
                              X
                      X       X X   X
                _ X _ X X _ X X X X X X

             In this case, 6 units of rain water are being trapped.

Input: height = [4,2,0,3,2,5]
Output: 9
 

Constraints:
    n == height.length
    1 <= n <= 2 * 10^4
    0 <= height[i] <= 10^5

NOTE: 
-----
Refer the stack solution first 


                                            TWO POINTER APPROACH
                                            --------------------

The amount of water trapped at index i is:  

                                water[i] = min(leftMax, rightMax) - height[i]

    where:
        leftMax  = maximum height on the left side
        rightMax = maximum height on the right side

    Normally, finding leftMax and rightMax for every index would take
    O(n) extra space using prefix/suffix arrays.

    We can avoid those arrays using TWO POINTERS.

--------------------------------------------------------------------------------------------------------

    Start with two pointers:
                            left  = 0
                            right = n - 1

    Also maintain:
                            leftMax  = maximum height seen so far from the left
                            rightMax = maximum height seen so far from the right

                    left                  right
                      ↓                      ↓

              [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]


    At every step, compare: height[left] & height[right]
    We process the side having the SMALLER current height.

TC: O(n) Both pointers move at most n times in total
SC: O(1)
*/

function trap(height: number[]): number {
    const n: number = height.length;

    /* Single element and two elements won't be able to trap any water, we need minimum 3 elements */
    if(n <= 2) return 0;

    let res: number = 0;

    let left: number = 0;
    let right: number = (n - 1);
    
    let leftMax: number = -1;
    let rightMax: number = -1;

    while(left < right) {

        /* Deal with the lesser part always, if left is less, then deal with left */
        if(height[left] <= height[right]) {

            /* if current element is less than leftMax, it means, on left we have someone greater for sure */
            if(height[left] < leftMax) res += (leftMax - height[left]);
            else leftMax = height[left];  /* Else update leftMax since current element is max */
            left = left + 1;              /* ++ the smaller part, left here */
        } else {

            /* if current element is less than rightMax, it means, on right we have someone greater for sure */
            if(height[right] < rightMax) res += (rightMax - height[right]);
            else rightMax = height[right];  /* Else update rightMax since current element is max */
            right = right - 1;              /* -- the smaller part, right here */
        } 
    }
    return res;  
};