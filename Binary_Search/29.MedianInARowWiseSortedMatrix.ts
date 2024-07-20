/* Given a row-wise sorted matrix of size MXN, where M is no. of rows and N is no. of columns, 
find the median in the given matrix.
Note: MXN is odd. (It means both are odd)

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

BRUTE FORCE:
- Flatten all the rows to one array and sort
- Return arr[(rows * cols) / 2] since there are odd no. of elements

TC: O(rows * cols) + O(log2(rows * cols))
SC: O(rows * cols)

BS APPROACH:
- We can think of BS since individual rows are sorted
- For applying BS, first define the search space

considering this example:

                    1  5  7  9  11
                    2  3  4  5  10        
                    9  10 12 14 16

        [ 1 2 3 4 5 5 7 9 9 10 10 11 12 14 16 ] --> 9

our median will lie between 1 and 16 always for sure  

Now, consider this

nums[]:  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16   --> Numbers from 1 to 16      
count[]: 1 2 3 4 6 6 7 7 9 11 12 13 13 14 14 15   --> No of numbers in the matrix <= that number   

Since, the matrix me have duplicates, so we cannot surely say that say for x, all numbers before x will be < x
hence we did <= x

Before understanding thought process, lets observe somethings

Consider this array (got this after flattening and sorting the matrix)

1 2 3 4 5 7 7 9 9 10 10 11 12 14 16  --> median = 9
             (m)

THERE ARE 9 elements (till 7 and + 2 9s) <= 9

if the array is: 
1 2 3 4 5 7 7 9 10 10 10 11 12 14 16  --> median = 9
             (m)

THERE ARE 8 elements (till 7 and + 1 9) <= 9

if the array is: 
1 2 3 4 5 7 7 7 7 10 10 11 12 14 16  --> median = 7
             (m)

THERE ARE 9 elements (till 7) <= 7

if the array is: 
1 2 3 4 5 7 7 10 10 10 10 11 12 14 16  --> median = 10
             (m)

THERE ARE 11 elements (till 7 + 4 10s) <= 10

if the array is: 
1 2 3 4 5 10 10 10 10 10 10 11 12 14 16  --> median = 10
               (m)

THERE ARE 11 elements (till 5 + 6 10s) <= 10

OBSERVATION: => [[NO. of elements <= median]] > 7 (the half of m*n)

Coming to this now,
nums[]:  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16   --> Numbers from 1 to 16      
count[]: 1 2 3 4 6 6 7 7 9 11 12 13 13 14 14 15   --> No of numbers in the matrix <= that number

the first element in the count[] > 7 (the half of m*n) = 9 = median =  our answer.

But we don't have the count[] really, we have written it manually, but we do have the search space [1 - 16]

Now, How can u get the count[i] at runtime, 
since every row is sorted, we can use BS in every row to get count[i]
in every row, we just have to find the index of first element > target (upper bound), from this we can get no. of elements <= target

ex: arr[] = [1  5  5  9  11]  target = 5
             0  1  2  3  4
             upper bound index = ans = 4

ex: arr[] = [1  5  5  5  11]  target = 5
             0  1  2  3  4
             upper bound index = ans = 4

our search space = 0 min, INT_MAX max 
for every element of our search space, we are calling the countLessThanEqualToEle() that
does BS on every row of matrix

TC: O(log2(10^9) * (rows * log2(cols)))
         BS              count()  

SC: O(1) */
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

    if((rows === 1) && (cols === 0)) return NaN;
    if((rows === 1) && (cols === 1)) return mat[0][0];

    // BS on range (search space), not the count[]
    let [low, high] = range(mat);
    const target = Math.floor((rows * cols) / 2);

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);
        let elementsLessThanMid: number = countLessThanEqualToEle(mat, mid); 

        if(elementsLessThanMid > target) high = mid - 1;           // explore smaller possibility
        else if(elementsLessThanMid <= target) low = mid + 1;
    }

    // when low > high, the low will be at first element in count[] (smallest) which will be > (m * n) / 2
    return low;
}