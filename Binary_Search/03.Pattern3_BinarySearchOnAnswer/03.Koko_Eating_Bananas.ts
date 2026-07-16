/* Leetcode 875: Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. 
The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. 
Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, 
she eats all of them instead and will not eat any more bananas during this hour.
Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
Return the minimum integer k such that she can eat all the bananas within h hours.

Input: piles = [3,6,7,11],      h = 8   Output: 4

Input: piles = [30,11,23,4,20], h = 5   Output: 30

                                                Way-1: Brute Force
                                                ------------------

- Each hour, she chooses some pile of bananas and eats k bananas from that pile.
  Hence, koko can move to next pile only if she finishes current pile in that hour.
- She decides her eating speed k and iterates on that pile[] 
- So, she will have to try for k = [1 to INT_MAX] and get the total time for each k, 
  if totalTime < h, that is the ans

  let's say koko decided the rate = k
  time taken = Math.ceil(piles[i] / k)

  ceil because if (arr[i] < k), that hour will be wasted, koko will take full hour even though 
  she finishes eating

  Ceil and floor don't follow standard rounding rules, they just consider next and previous integer values

| Input | ceil() (Up) | floor() (Down) |
|  ---  |  ---------- |  ------------- |
| 4.1   | 5           | 4              |
| 4.9   | 5           | 4              |
| -4.1  | -4          | -5             |
| -4.9  | -4          | -5             |


k = 1:
    piles[] = [3, 6, 7, 11] and h = 8
    time taken (ceil values) = [3, 6, 7, 11] ==> 3 + 6 + 7 + 11 > h ==> NOT ACCEPTABLE 
  
k = 2:
    piles[] = [3, 6, 7, 11]
    time taken  = [2, 3, 4, 6] ==> total time  > h, NOT ACCEPTABLE 

k = 3:
    piles[] = [3, 6, 7, 11]
    time taken  = [1, 2, 3, 4] > h, NOT ACCEPTABLE 

k = 4:
    piles[] = [3, 6, 7, 11]
    time taken  = [1, 2, 2, 3] ==> total time  <= h, ACCEPTABLE and MINIMUM value 
  

TC: O(INT_MAX * arr.length), Obviously, it will give TLE!!
SC: O(1)

                                            Way-2: Binary Search
                                            --------------------

- Though Process: we try k from [1 -- Math.max(...arr)]
- whenever we stop getting ans after particular limit and we wan't max or min value, use BS

  So, our BS space = [1 -- Math.max(...arr)]

  We are calculating (piles[i] / k) --> as k increases, time decreases and lower the time, 
                                                        more possible the answer

  hence we will get something like [X, X, X, X, X, ✓, ✓, ✓, ✓, ✓]
                                                   |
                                                  ans


TC: O(arr.length * log2(MAX_ARR_ELEMENT))
SC: O(1)
*/

function calculateTotalTime(piles: number[], k: number): number {
    let total: number = 0;

    piles.forEach((ele) => {
        total = total + Math.ceil(ele/k);
    });

    return total;
}

function BS_Solution(piles: number[], h: number): number {
    let n = piles.length;

    // Corner cases
    if(n === 0) return -1;
    if((n === 1) && (piles[0] <= h)) return 1;  //quotient = 0.something, so Ceil it to 1
    if((n === 1) && (piles[0] > h)) return Math.ceil(piles[0]/h);
    
    let low: number = 1;
    let high: number = Math.max(...piles);
    let ans: number = Number.MAX_SAFE_INTEGER;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2); 
        let totalTime: number = calculateTotalTime(piles, mid);

        // if totalTime <= h, eliminate right half to explore further smaller possibilities
        if(totalTime <= h) {
            ans = mid;                              // we are sure that further ans will be always less than this ans
            high = mid - 1;                         // explore further smaller values
        }

        else low = mid + 1; 
    }

    return ans;
}