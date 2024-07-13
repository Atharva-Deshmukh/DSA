/* BS ON 2D ARRAYS

Given a m x n binary matrix mat, find the 0-indexed position of the row that contains the maximum count of ones, 
and the number of ones in that row. Every row in the matrix will be sorted.
In case there are multiple rows that have the maximum count of ones, the row with the smallest row number 
should be selected.
Return an array containing the index of the row, and the number of ones in it.

Input: mat = [[0,1],[1,0]]                              Output: [0,1]
Both rows have the same number of 1's. So we return the index of the smaller row, 0, 
and the maximum count of ones (1). So, the answer is [0,1]. 

Input: mat = [[0,0,0],[0,1,1]]                          Output: [1,2]
The row indexed 1 has the maximum count of ones (2). So we return its index, 1, and the count. 
So, the answer is [1,2].

Input: mat = [[0,0],[1,1],[0,0]]                        Output: [1,2]
The row indexed 1 has the maximum count of ones (2). So the answer is [1,2].

LOGIC: Brute force
- Iterate every row and calculate the no of 1s and update the max 

TC: O(rows * cols)
SC: O(1)  */

function count1s(row: number[]): number {
    let count: number = 0;

    row.forEach((ele) => {
        if(ele === 1) count++;
    });

    return count;
}

function rowWithMax1s(mat: number[][]): number[] {
    let maxCount: number = Number.MIN_SAFE_INTEGER;
    let maxCountIndex: number = Number.MIN_SAFE_INTEGER;


    mat.forEach((row, index) => {
        let originalMax: number = maxCount;
        maxCount = Math.max(maxCount, count1s(row));

        // update index only if we update maxCount
        if(maxCount !== originalMax) maxCountIndex = index;
    });

    return [maxCountIndex, maxCount];
}

/* Since, rows are sorted, we can think of BS approach

see, the entire row is sorted, hence all 1s will be after all 0s

Now, to count no of 1s, we can use BS, 
get the index of first 1 (lowerbound of 1 OR upperbound of 0) and then from this index, calculate no. of 1s since 
it is guaranteed that all the further elements would be 1s after the first 1

We can do nothing about the row iteration since we have to iterate the row anyways
        
           0  1  2  3  4  5
let row = [0, 0, 0, 1, 1, 1]

index of 1st 1 = 3, and rowLen = 6, no of 1s = 3
no of 1s = rowLen - index of first 1

           0  1  2  3  4 
let row = [0, 0, 1, 1, 1]

index of 1st 1 = 2, and rowLen = 5, no of 1s = 3
no of 1s = rowLen - index of first 1

our count1s() will adapt to BS now

TC: O(rows * log(cols))
SC: O(1)  */

function count1sBS(row: number[]): number {
    let rowLen: number = row.length;
    let first1sIndex: number = Number.MAX_SAFE_INTEGER;

    let low: number = 0;
    let high: number = rowLen - 1;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        // when we get 0, go ahead as we will be having 0s behind this
        if(row[mid] === 0) low = mid + 1;

        // update 1s index and explore smaller possibilities
        else if(row[mid] === 1) {
            first1sIndex = mid;
            high = mid - 1;
        }
    }

    return (rowLen - first1sIndex);
}


