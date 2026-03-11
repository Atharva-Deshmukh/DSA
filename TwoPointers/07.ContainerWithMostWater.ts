/* Container With Most Water

You are given an integer array height of length n. There are n vertical lines drawn 
such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that 
the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Input: arr[] = [1, 5, 4, 3]
Output: 6
Explanation: 5 and 3 are 2 distance apart. So the size of the base is 2. 
Height of container = min(5, 3) = 3. So, total area to hold water = 3 * 2 = 6.

Input: arr[] = [3, 1, 2, 4, 5]
Output: 12
Explanation: 5 and 3 are 4 distance apart. So the size of the base is 4. 
Height of container = min(5, 3) = 3. So, total area to hold water = 4 * 3 = 12.

Input: arr[] = [2, 1, 8, 6, 4, 6, 5, 5]
Output: 25 
Explanation: 8 and 5 are 5 distance apart. So the size of the base is 5. 
Height of container = min(8, 5) = 5. So, the total area to hold water = 5 * 5 = 25.

Constraints:
    1 ≤ arr.size() ≤ 10^5
    0 ≤ arr[i] ≤ 10^4


                                            BRUTE FORCE
                                            -----------
- for each wall, check the water stored with subsequent walls and store the max
  height of container formed by a[i] and a[j] = min(a[i], a[j])
                                       width  = (j - i)
                                       Volume = height * width

                                         |
                                      |  |
                             |        |  |
                             |     |  |  |
                             |  |  |  |  |
                            [3, 1, 2, 4, 5]
                             0  1  2  3  4


                                 if(n === 1) return 0;

                                for(let i = 0; i < n; i++) {
                                    for(let j = (i + 1); j < n; j++) {
                                        const height = Math.min(a[i], a[j]);
                                        const width = (j - i);
                                        const vol = height * width;
                                        maxVol = Math.max(maxVol, vol);
                                    }
                                }

                                return maxVol;

TC: O(n^2)
SC: O(1)

We need to optimise this, now, since we need both walls left and right, we can think of trapping rainwater like 
two pointer approach, but with a change

left = 0, right = (n - 1)

vol = Math.max(vol, ((right - left) * (Math.min(a[left], a[right]))))

Now, whichever pointer is smaller, move that pointer only because
we need max volume
Moving pointers decreases the width as indices come closer
So, we try to increase the height at least so that we can maximise the volume

TC: O(n)
SC: O(1) */

function maxArea(a: number[]): number {
    const n = a.length;
    let maxVol = 0, left = 0, right = (n - 1);

    if(n === 1) return 0;

    while(left < right) {

        maxVol = Math.max(maxVol, ((right - left) * (Math.min(a[left], a[right]))));

        if(a[left] <= a[right]) left++;
        else if(a[left] > a[right]) right--;   /* don't use two ifs because updated left will be used in next one then */
    }

    return maxVol;
};