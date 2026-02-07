/* 
Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array 
[0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.

Constraints:

n == height.length
1 <= n <= 2 * 10^4
0 <= height[i] <= 10^5


Approach:

Water will be trapped in a[i] only if (a[i-1] > a[i] < a[i+1])

let height: number[] = [4, 0, 2, 0, 3, 0, 4]

|             |
|        |    |
|   |    |    |                  --> 12
|   |    |    |
---------------
0 1 2 3  4 5  6

index = 1  
    a[0] > a[1] < a[2] --> TRUE
    water += Min(a[0], a[2]) - arr[i] = 2 (it can store water from its top, so subtract its height)

index = 2  
    a[1] > a[2] < a[3] --> FALSE
    water += 0

index = 3 
    a[2] > a[3] < a[4] --> TRUE
    water += Min(a[2], a[4]) - arr[i]  = 4
    
index = 4 
    a[2] > a[3] < a[4] --> FALSE
    water += 0 = 4
    
index = 5 
    a[4] > a[5] < a[6] --> TRUE
    water += Min(a[4], a[6]) - arr[i]  = 7


But we missed a lot of units of water here because we are not able to keep
track of leftMaxHeight and rightMaxHeight, 

If we have it, then
waterStored[i] = Min(leftMaxHeight[i], rightMaxHeight[i]) - height[i];

We basically need to keep track of NGE left and NGE Right in two separate hashes/arrays
KEEP IN MIND that leftMaxHeight and rightMaxHeight should be the global maxs, not next maxs
unlike standard NGE algos

We will maintain a prefixMax[] and suffixMax[] to know global max till a[i]

TC: O(n) + O(n) + O(n) = O(3n)  (prefix[] + suffix[] + finalArr traversals)
SC: O(n) + O(n) = O(2n)         (prefix[] + suffix[]) 

Optimisation:
- We don't need both leftMax and rightMax, we just need Min(leftMax, rightMax)

Approach: 
- use 2 pointers to traverse both sides at the same time left and right
- maintain 2 variables, leftMax and rightMax
- See code for more clarity

TC: O(n)
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