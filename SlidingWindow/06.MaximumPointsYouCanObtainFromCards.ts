/* 1423. Maximum Points You Can Obtain from Cards

There are several cards arranged in a row, and each card has an associated number of points. 
The points are given in the integer array cardPoints.
In one step, you can take one card from the beginning or from the end of the row. 
You have to take exactly k cards.
Your score is the sum of the points of the cards you have taken.

Given the integer array cardPoints and the integer k, return the maximum score you can obtain.

Input: cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12
Explanation: After the first step, your score will always be 1. 
             However, choosing the rightmost card first will maximize your total score. 
             The optimal strategy is to take the three cards on the right, 
             giving a final score of 1 + 6 + 5 = 12.

Input: cardPoints = [2,2,2], k = 2
Output: 4
Explanation: Regardless of which two cards you take, your score will always be 4.
Example 3:

Input: cardPoints = [9,7,7,9,7,7,9], k = 7
Output: 55
Explanation: You have to take all the cards. Your score is the sum of points of all cards.
 

Constraints:

1 <= cardPoints.length <= 10^5
1 <= cardPoints[i] <= 10^4
1 <= k <= cardPoints.length

We cannot apply direct sliding window here since we need to pick one card from start
and one from the end
Most optimal solution here will be the brute force/Intuition only

                                        Brute Force
                                        -----------

Pick k elements from left, then pick k elements from right
pick 1 element from left, and k - 1 from right
pick 2 elements from left, and k - 2 from right
pick 3 elements from left, and k - 3 from right
.
.
.
Similarly, 
pick 1 element from right, and k - 1 from the left
.
.

Putting it logically, maintain two sums leftSum and rightSum

Let cardPoints = [1,2,3,4,5,6,1], k = 3

first k from left                    leftSum = (1 + 2 + 3) = 6    rightSum = 0               Max = 6 (6 + 0)
k - 1 from left and 1 from right     leftSum = (1 + 2) = 3        rightSum = 1               Max = 4 (3 + 1)
k - 2 from left and 2 from right     leftSum = (1) = 1            rightSum = 1 + 6           Max = 8 (7 + 1)
0 from left and k from right         leftSum = 0                  rightSum = 1 + 6 + 5       Max = 12(12 + 0)

first k from right                   leftSum = 0                  rightSum = (1 + 6 + 5)     Max = 12(12 + 0)
k - 1 from right and 1 from left     leftSum = 1 = 1              rightSum = (1 + 6)         Max = 8 (7 + 1)
k - 2 from right and 2 from left     leftSum = (1 + 2) = 3        rightSum = 1               Max = 4 (3 + 1)
0 from right and k from left         leftSum = (1 + 2 + 3) = 6    rightSum = 0               Max = 6 (6 + 0)

So, basically, cases are repeating, hence go for first k elements from left case only 
as unncessary repeatition will be there
*/

function maxScore(cardPoints: number[], k: number): number {
    const n: number = cardPoints.length;
    let maxSum: number = 0;
    let leftSum: number = 0;
    let rightSum: number = 0;

    /* pick all k elements from left */
    for(let i = 0; i < k; i++) {
        leftSum += cardPoints[i];
    }

    maxSum = Math.max(maxSum, leftSum + rightSum);

    /* Now, reduce elements from left and start picking from right 
    
        Let cardPoints = [1,2,3,4,5,6,1], k = 3
                          0 1 2 3 4 5 6

        if we leave (k - 1), we will be at (k-2) | from right, index (n - 1) will be picked
        if we leave (k - 2), we will be at (k-3) | from right, index (n - 2) will be picked
    */
     
    let rightPointer: number = (n - 1);
    for(let i = (k - 1); i >= 0; i--) {
        leftSum -= cardPoints[i];
        rightSum += cardPoints[rightPointer];
        maxSum = Math.max(maxSum, leftSum + rightSum);
        rightPointer--;
    }
    return maxSum;
}