/* Leetcode 1539:
Given an array arr of positive integers sorted in asc order, and an integer k.
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


--------------------------------------------------------------------------------------------
            Tried To Figure Out Brute Force myself - Didn't work, see BF approach to memorise

[5, 6, 7, 8], k = 4

counter = 1 k = 3
counter = 2 k = 2
counter = 3 k = 1     --> we don't need a loop for this, this can be handled directly
counter = 4 k = 0

if(k < a[0]) directly return k as its missing kth value itself

[2,3,4,7,11], k = 5

counter = 1  k = 4    // 1 is missing
counter = 2  k = 4    // 2 is there so counter++
counter = 3  k = 4    // 3 is there so counter++
counter = 4  k = 4    // 4 is there so counter++
counter = 5  k = 3    // 5 is missing
counter = 6  k = 2    // 6 is missing
counter = 7  k = 2    // 7 is there so counter++
counter = 8  k = 1    // 8 is missing
counter = 9  k = 0    // 9 is missing and k = 0 --> return 9

[1, 2, 3], k = 5

counter = 1  k = 5    // 1 is there so counter++
counter = 2  k = 5    // 2 is there so counter++
counter = 3  k = 5    // 3 is there so counter++
counter = 4  k = 4    // 4 is missing
counter = 5  k = 3    // 5 is missing
counter = 6  k = 2    // 6 is missing
counter = 7  k = 1    // 7 is missing
counter = 8  k = 0    // 8 is missing and k = 0 --> return 8


function BruteForce(a: number[], k: number): number {
    const n: number = a.length;
    let counter: number = 1;  // positive integer counter to track missing
    let i: number = 0;
    
    // Corner case
    if(k < a[0]) return k;
    
    for(i = 0; i < n; i++) {
        if((k > 0) && (a[i] === counter)) {
            counter++; 
            console.log();
            console.log('a[i] -> ' + a[i]);
            console.log('Counter in loop -> ' + counter);
            continue;
        }
        while((k > 0) && (a[i] !== counter)) {
            counter++;
            k--;
        }
        if(k === 0) return counter;
    }
    
    // If k is still remaining after array is traversed
    while((k > 0) && (i >= n)) {
        counter++;
        k--;
        console.log('counter -> ' + counter + ' ' + 'k -> ' + k);
    }
    
    return counter;
} 

console.log(BruteForce([1,2,3,4], 2));
The counter was always +1 more hence wrong answer here

Logs: console.log(BruteForce([1,2,3,4], 2));    

a[i] -> 1
Counter in loop -> 2

a[i] -> 2
Counter in loop -> 3

a[i] -> 3
Counter in loop -> 4

a[i] -> 4
Counter in loop -> 5
counter -> 6 k -> 1
counter -> 7 k -> 0
7

--------------------------------------------------------------------------------------------
  
                                    MEMORISE this brute force algo
                                    ------------------------------

arr = [2, 3, 4, 7, 11], k = 5

a[i] = 2, k = 5
2 < 5 => a[i] < k
k++

a[i] = 3, k = 6
a[i] < k
k++

a[i] = 4, k = 7
a[i] < k
k++

a[i] = 7, k = 8
a[i] < k
k++

a[i] = 11, k = 9
a[i] > k              => return k

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

/*                                  Way-2: Binary Search Approach
                                    -----------------------------

Thought: Since the array is sorted, we can think of binary search approach here
 
                            0  1  2  3  4
                     arr = [2, 3, 4, 7, 11]
Ideal array should be    = [1, 2, 3, 4, 5]           -->  missing[i] = arr[i] - ideal[i]
Missing numbers till now = [1, 1, 1, 3, 6]

Since the array is sorted and ideal array with 0 missing would be a consequtive array from [1---INT_MAX]

so, missing[i] --> Denotes count of missing nos. till ith index of arr[] 
i.e missing[3] = 3 --> 3 nos are missing till index 3

When k = 5, it lies between 3 and 6 => 7 and 11

now, missing number = 7 + (5 - 3)
                    = arr[i] + (k - missing[i])

                    Till a[3] = 7, missing[3] = 3, we have k = 5
                    So, remaining = 5 - 3 = 2 more missing nos.

For calculating missing[], we are going to take TC = O(n) and also O(n) space will be required
Better simulate missing[i] using = arr[i] - (index + 1) in place of missing[i]

               0  1  2  3  ...              
Ideal array = [1, 2, 3, 4, ...]   --> Note that a[i] = (index + 1) since all elements are consequtive +ve nos.

                                BINARY SEARCH TRICK HERE - USING OPPOSITE POLARITY
                                --------------------------------------------------

                            0  1  2  3  4
                     arr = [2, 3, 4, 7, 11]
Ideal array should be    = [1, 2, 3, 4, 5]           -->  missing[i] = arr[i] - ideal[i]
Missing numbers till now = [1, 1, 1, 3, 6]

now when k = 5, it lies between 3 and 6 => 7 and 11

how to know if k lies between a particular range in sorted array using BS,

USING OPPOSITE POLARITY:
- We may or may not get a[mid] === key
- but we anyways execute full BS till low <= high
- when low > high, BS ends

Case: when low < n after BS (k lies within missing[])

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

        After BS, If low < n --> missing[high] < k <= missing[low] --> (high---k---low]

One edge case:

Another dry run for => arr = [1,2,3,4], k = 2               Output: 6

                            0  1  2  3
                     arr = [1, 2, 3, 4]
Ideal array should be    = [1, 2, 3, 4]           -->  missing[i] = arr[i] - ideal[i]
Missing numbers till now = [0, 0, 0, 0]

now when k = 2, it doesn't lie between any of the above missing[] since missing[0] === missing[n - 1] === 0

Case: when low === n after BS (k lies outside missing[])

low = 0
high = 3
                             0  1  2  3
                            [0, 0, 0, 0]   mid = 1
                             |  |     |    missing[mid] < k, low = mid + 1 = 1 + 1 = 2
                             l  m     h

low = 2
high = 3
                             0  1  2  3
                            [0, 0, 0, 0]   mid = 2
                                   |  |    missing[mid] < k, low = mid + 1 = 2 + 1 = 3
                                   l  h
                                   |
                                   m

low = 3
high = 3
                             0  1  2  3
                            [0, 0, 0, 0]   mid = 3
                                      |    missing[mid] < k, low = mid + 1 = 3 + 1 = 4 = n
                                      l
                                      |
                                      h
                                      |
                                      m

low = 4
high = 3  --> low > high --> loop ends

                             0  1  2  3  4
                            [0, 0, 0, 0]  
                                      |  |  
                                      h  l

                        Here, k lies outside array, 

                        if low == n --> All missing[] values are < k  --> k lies to the right of the array.
                    
                    
- If low < n --> missing[high] < k <= missing[low] --> (high---k---low] ==> ans => arr[high] + (k - missing[high]) 
- if low == n --> All missing[] values are < k  --> k lies to the right of the array ==> ans => low + k
                                   
                                                               
TC: O(log2(n))
SC: O(n) for missing[] */

function BS_Solution(arr: number[], k: number): number {
    let n: number = arr.length;

    if(k < arr[0]) return k;
    if((n === 1) && (k > arr[0])) return k + 1;
    /*
    [3] k = 4 --> 5 --> (k + 1)
    [4] k = 6 --> 7 --> (k + 1)

    */
    
    let low: number = 0, high: number = n - 1;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        let missing_mid: number = (arr[mid] - (mid + 1));
                             // (arr[index] - (index + 1));

        /* Note: there is no a[mid] === key condition here */

        if(missing_mid < k) low = mid + 1;
        else high = mid -1;
    }

    return (low === n)? (low + k): (arr[high] + (k - (arr[high] - (high + 1)))); 
}