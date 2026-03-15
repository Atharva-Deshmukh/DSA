/* Mean of range in array

Given an array arr[] of n integers and q queries represented by an array queries[][], 
where queries[i][0] = l and queries[i][1] = r. For each query, the task is to calculate 
the mean of elements in the range l to r and return its floor value.

Input: arr[] = [3, 7, 2, 8, 5] queries[][] = [[1, 3], [2, 5]]
Output: 4 5
Explanation: For query [1, 3] - Elements in range are 3, 7, 2
Mean is (3+7+2)/3 = 4, Floor value is 4
For query [2, 5] - Elements in range are 7, 2, 8, 5, 
Mean is (7+2+8+5)/4 = 5.5, Floor value is 5

Input: arr[] = [10, 20, 30, 40, 50, 60], queries[][] = [[4, 6]]
Output: 50
Explanation: For query [4, 6] - Elements in range are 40, 50, 60
Mean is (40+50+60)/3 = 50, Floor value is 50 


BRUTE FORCE:
- Calculate sum for each query, divide by no of elements

TC: O(queries.length * k) = O(n^2)
SC: O(1)

Optimal solution:
- To avoid this recalculation of sum again and again, we can precompute the sum

         0  1   2   3   4
arr[] = [3, 7,  2,  8,  5] queries[][] = [[1, 3], [2, 5]]
sum[] = [3, 10, 12, 20, 25]

Now, we can get sum[l, r] = sum[r] - sum[l - 1] -> convert l and r to 0-based index, currently its 1-based index

*/

function findMean(a, q) {
        const n = a.length;

        let mean = [];
        let prefSum = new Array(n);

        prefSum[0] = a[0];

        // Build prefix sum
        for (let i = 1; i < n; i++) {
            prefSum[i] = prefSum[i - 1] + a[i];
        }

        // Process queries
        for (let [l, r] of q) {

            // convert to 0-based index
            l--;
            r--;

            let sum;

            if (l === 0) {
                sum = prefSum[r];
            } else {
                sum = prefSum[r] - prefSum[l - 1];
            }

            const count = r - l + 1;
            mean.push(Math.floor(sum / count));
        }

        return mean;
}

/* GFG Submission:

Given an array arr and q queries. Write a program to find the floor value of the mean in the 
range l to r for each query in a new line.
Queries are given by an array of queries[] of size 2*q. 
Here queries[2*i] denote l and queries[2*i+1] denote r for i-th query.


Input : arr[] = [1, 2, 3, 4, 5] and q[] = [0, 2, 1, 3, 0, 4]
Output : [2, 3, 3]
Explanation: Here we can see that the array of integers is [1, 2, 3, 4, 5]. 
Query 1: L = 0 and R = 2 Sum = 6 Integer Count = 3 So, Mean is 2

Input : arr[] = [6, 7, 8, 10] and q[] = [0, 3, 1, 2]
Output : [7, 7]
Explanation: Element count is 3 and sum of element from 0 to 3 are 21. So mean is 7.



*/

function findMean(a, q) {
    const n = a.length;

    let mean = [];
    let prefSum = new Array(n);

    prefSum[0] = a[0];

    // Build prefix sum
    for (let i = 1; i < n; i++) {
        prefSum[i] = prefSum[i - 1] + a[i];
    }

    // Process queries
    for (let i = 0; i < q.length; i += 2) {

        const l = q[i];
        const r = q[i + 1];


        let sum;

        if (l === 0) {
            sum = prefSum[r];
        } else {
            sum = prefSum[r] - prefSum[l - 1];
        }

        const count = r - l + 1;
        mean.push(Math.floor(sum / count));
    }

    return mean;

}
        
    