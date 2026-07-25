/* Given a row-wise sorted matrix of size rows X cols
find the median in the given matrix.
Note: rows X cols is odd. (It means both are odd)

Input Format:M = 3, N = 3,                                Result: 5
matrix[][] =
                    1 4 9                                  
                    2 5 6
                    3 8 7
                    
Explanation:  If we find the linear sorted array, the array becomes 1 2 3 4 5 6 7 8 9. So, median = 5

Input Format:M = 3, N = 3, 
matrix[][] =                                             Result: 3
                    1 3 8 
                    2 3 4
                    1 2 5
                    
Explanation:  If we find the linear sorted array, the array becomes 1 1 2 2 3 3 4 5 7 8. So, median = 3

Input: R = 3, C = 1                                      Result: 2
matrix[][] = [[1], [2], [3]]

Explanation: Sorting matrix elements gives 
us {1,2,3}. Hence, 2 is median.

Expected Time Complexity: O(32 * R * log(C))
Expected Auxiliary Space: O(1) 


                    1 3 8 12 13
                    2 3 4 13 14             --> 5
                    1 2 5 17 18

        1 1 2 3 3 3 4 5 8 12 13 13 14 17 18 

Corner case:
- If there is only one row, then return row[mid] directly since row size is always odd

                                            Way-1: BRUTE FORCE
                                            ------------------

- Flatten all the rows to one array and sort
- Return arr[(rows * cols) / 2] since there are odd no. of elements

TC: O(rows * cols) + O(log2(rows * cols))
SC: O(rows * cols)

                                            Way-2: Binary Search
                                            --------------------

- We can think of BS since individual rows are sorted.

There is one median property that we can exploit for odd lengthed array

Suppose the sorted array is -> [1 2 3 4 5 7 9 10 12] n = 9, median = 5

Notice -> no of elements <= 5 === 5  which is > 4 (half of array length)
          
          Even if there are duplicates in the array 

          [1 2 3 4 5 5 5 7 8] n = 9 and median = 5
          
          no of elements <= 5 === 7 which is > 4 (half of array length)

FACT:     
    For an odd number of elements, the median is the smallest value whose 
    count of elements ≤ it is strictly greater than half of the total number of elements.

Now, our search space is fixed:
    low  = minimum element in the matrix
    high = maximum element in the matrix

Suppose low = 1 and high = 12 --> mid = 6
Now ask How many numbers are ≤ 6?

How to eleminate the half?
---------------------------

if (count <= totalElements / 2)
    low = mid + 1;   // Current value is too small, explore larger values.
else
    high = mid - 1;  // Current value is a valid candidate, explore smaller possibilities.                           

How to calculate count[i] at runtime?
----------------------------------

For each row, find the index of the first element greater than the target
(i.e., the upper bound).

Since all elements before the upper bound are ≤ target,
the upper bound index itself gives the count of elements ≤ target
in that row.

Example 1:

    arr[] = [1  5  5  9  11], target = 5
            0  1  2  3   4

    upper_bound(5) = index 3

    Count of elements ≤ 5 = 3


Example 2:

    arr[] = [1  5  5  5  11], target = 5
            0  1  2  3   4

    upper_bound(5) = index 4

    Count of elements ≤ 5 = 4


Since every row is sorted, we can find the upper bound of each row using BS  in O(log(cols))

TC: O(log2(10^9) * (rows * log2(cols)))
         BS              count()  

SC: O(1) */

/* Helper to just get the lowest and highest element of the matrix */
function range(mat: number[][]): number[] {
    let low: number = Number.MAX_SAFE_INTEGER;
    let high: number = Number.MIN_SAFE_INTEGER;

    for(let i = 0; i < mat.length; i++) {
        if(mat[i][0] < low) low = mat[i][0];                                    // getting minimum
        if(mat[i][mat[0].length - 1] > high) high = mat[i][mat[0].length - 1];  // getting maximum
    }

    return [low, high];
}

function upperBoundIndex(arr: number[], target: number): number {
   let n: number = arr.length
   let low: number = 0;
   let high: number = n - 1;

   while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);
        if(arr[mid] > target) high = mid - 1;
        else low = mid + 1; 
   }

   return low;
}

/* From the whole matrix, get the count of elements <= ele */
function countLessThanEqualToEle(mat: number[][], ele: number): number {
    let count: number = 0;
    mat.forEach((row) => {
        count += upperBoundIndex(row, ele);
    });

    return count;
}

function medianOfMatrix(mat: number[][]): number {
    let rows: number = mat.length;
    if(rows === 0) return NaN;

    let cols: number = mat[0].length;

    if((rows === 1) && (cols === 1)) return mat[0][0];

    // BS on range (search space), not the count[]
    let [low, high] = range(mat);
    const target = Math.floor((rows * cols) / 2);

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);
        let eleCount: number = countLessThanEqualToEle(mat, mid); 

        if (eleCount <= target)
            low = mid + 1;   // Current value is too small, explore larger values.
        else
            high = mid - 1;  // Current value is a valid candidate, explore smaller possibilities.
    }

    // when low > high, the low will be at first element in count[] (smallest) which will be > (m * n) / 2
    return low;
}