/* Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
Return the kth positive integer that is missing from this array.

Input: arr = [2,3,4,7,11], k = 5            Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.

Input: arr = [1,2,3,4], k = 2               Output: 6
Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.

Corner cases: (Note that we have sorted arr[] and positive numbers are 1----n-1)
- if k > arr[0], return k 
  arr = [5, 6, 7, 8] k = 4, ans => 4

if arr = [4], k = 3            Output: 3  same logic of corner case as above

if arr = [4], k = 5            Output: 6
if arr = [5], k = 6            Output: 7
  
MEMORISE this brute force algo

arr = [2, 3, 4, 7, 11], k = 5

ele = 2, k = 5
2 < 5 => ele < k
k++

ele = 3, k = 6
ele < k
k++

ele = 4, k = 7
ele < k
k++

ele = 7, k = 8
ele < k
k++

ele = 11, k = 9
ele > k              => return k

TC: O(n)
SC: O(1) */

function bruteForceSol(arr: number[], k: number): number {
    let n: number = arr.length;

    //corner case
    if(k < arr[0]) return k;
    if((n === 1) && (k > arr[0])) return k + 1;


    for(let ele of arr) {
        if(ele > k) return k;
        else k++;
    }

    // to deal with last element in sorted array => [1,2,3,4]
    return k;
}

/* Sorted array so think of BS

for arr = [2,3,4,7,11], k = 5            Output: 9
9 lies between 7 and 11, so we can reduce the whole array search space using BS

But wait, we new ans = 9, hence we could reduce arr space to [7, 11]

Note that 
                            0  1  2  3  4
                     arr = [2, 3, 4, 7, 11]
Ideal array should be    = [1, 2, 3, 4, 5]           -->  missing[i] = ideal[i] - arr[i]
Missing numbers till now = [1, 1, 1, 3, 6]

now when k = 5, it lies between 3 and 6 => 7 and 11

now, missing number = 7 + (5 - 3)

Another dry run for => arr = [1,2,3,4], k = 2               Output: 6

                            0  1  2  3
                     arr = [1, 2, 3, 4]
Ideal array should be    = [1, 2, 3, 4]           -->  missing[i] = ideal[i] - arr[i]
Missing numbers till now = [0, 0, 0, 0]

now when k = 2, it doesn't lie between any of the above missing[] since missing[0] === missing[n - 1] === 0, 
the array is ideal only so, return missing[n - 1] + k 

But in calculating missing[], we make TC = O(n) only, So, use missing[i] = arr[i] - (index + 1) in place of missing[i]



BINARY SEARCH HAS A TRICK HERE

                            0  1  2  3  4
                     arr = [2, 3, 4, 7, 11]
Ideal array should be    = [1, 2, 3, 4, 5]           -->  missing[i] = ideal[i] - arr[i]
Missing numbers till now = [1, 1, 1, 3, 6]

now when k = 5, it lies between 3 and 6 => 7 and 11

how to know if k lies between a particular range in sorted array using BS,
USING OPPOSITE POLARITY

                             0  1  2  3  4
                            [1, 1, 1, 3, 6]   mid = 2
                             |     |     |    missing[mid] < k, low = mid + 1
                             l     m     h

                             0  1  2  3  4
                            [1, 1, 1, 3, 6]   mid = 3
                                      |  |    missing[mid] < k, low = mid + 1
                                      m  h
                                      |
                                      l

                             0  1  2  3  4
                            [1, 1, 1, 3, 6]   mid = 4
                                         |    missing[mid] > k, high = mid - 1
                                         m
                                         |
                                         l
                                         |
                                         h

                             0  1  2  3  4
                            [1, 1, 1, 3, 6]  
                                      |  |    
                                      h  m
                                         |
                                         l

        now h represents lower bound of the range and l represents higher bound of the range
        So, polarities are changed

        hence k lies between [missing[h], missing[l]]
                                                               
TC: O(log2(n))
SC: O(n) for missing[] */

function BS_Solution(arr: number[], k: number): number {
    let n: number = arr.length;

    if(k < arr[0]) return k;
    if((n === 1) && (k > arr[0])) return k + 1;

    // insted of doing this, use let missing_index: number = (arr[index] - (index + 1));
    // let missing: number[] = Array(n).fill(0).map((ele, index) => {
    //     return ele = arr[index] - (index + 1);
    //     //            arr    ideal arr element
    // });
    
    let low: number = 0;
    let high: number = n - 1;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        let missing_mid: number = (arr[mid] - (mid + 1));

        if(missing_mid < k) low = mid + 1;
        else if(missing_mid >= k) high = mid -1;
    }

    // polarites are changed, that gives us the range
    let missing_high: number = (arr[high] - (high + 1));
    return arr[high] + (k - missing_high);
}