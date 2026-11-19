/* Split an array into two equal Sum subarrays

Given an array of integers arr, return true if it is possible to split it in two subarrays 
(without reordering the elements), such that the sum of the two subarrays are equal. 
If it is not possible then return false.

Input: arr = [1, 2, 3, 4, 5, 5]
Output: true
Explanation: In the above example, we can divide the array into two subarrays with equal sum. 
The two subarrays are: [1, 2, 3, 4] and [5, 5]. The sum of both the subarrays are 10. 
Hence, the answer is true.

Input: arr = [4, 3, 2, 1]
Output: false
Explanation: In the above example, we cannot divide the array into two subarrays with equal sum. 
Hence, the answer is false.

Approach: We will use same approach of prefix sum for finding equilibrium index problem
          With a change.
          There, we were calculating sum before and after ith index
          Now, we need to include the current index as well

          Things we can notice:
          leftSum + rightSum = totalSum
                2 * rightSum = totalSum   (As leftSum = rightSum)
                    rightSum = totalSum / 2 

          Basically, we only need to find the sum which is totalSum / 2
          If its there, we can return true, else return false

          Compute any one prefixSum, not left and right both


            0  1  2   3   4   5
   nums =  [1, 7, 3,  6,  5,  6 ]
leftSum =  [1, 8, 11, 17, 22, 28]       -->    False as proper division of subarrays is not possible
rightSum = [28,27,20, 17, 11, 6]

            0  1  2   3   4   5
   nums =  [1, 2, 3,  4,  5,  5]         --> true as there is 20 / 2 = 10, so we can split subarrays
leftSum =  [1, 3, 6, 10, 15, 20] 

*/

function canSplit(a) {
    const n = a.length;

    if(n === 1) return false;  /* Single element cannot be split into two subarrays */


    let leftSum = Array(n).fill(0);
    leftSum[0] = a[0];

    /* Precompute leftSum[] */
    for(let i = 1; i < n; i++) leftSum[i] = (leftSum[i - 1] + a[i]);

    const totalSum = leftSum[n - 1];  /* Last element will be the total sum */

    if(totalSum % 2 === 1) return false;  /* totalSum MUST be even */

    /* Check if leftSum[] has any sum which is half of total sum 
       Not allowing split at the last element, since then rightHalf = []
    */
    for(let i = 0; i < (n - 1); i++) if(leftSum[i] === (totalSum / 2)) return true;

    return false;   
}