/* Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. 
The guards have gone and will come back in h hours.Koko can decide her bananas-per-hour eating speed of k. 
Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, 
she eats all of them instead and will not eat any more bananas during this hour.
Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.
Return the minimum integer k such that she can eat all the bananas within h hours.


Input: piles = [3,6,7,11],      h = 8   Output: 4

Input: piles = [30,11,23,4,20], h = 5   Output: 30

Logic (Linear): 
- Note that koko can move to next pile only if she finishes current pile in that hour
- She decides her eating speed k and iterates on that pile[] 
- she will have to try for k from 1 to INT_MAX and get the total time for each i, 
  if totalTime < h, that is the ans
  ex: 
  let k = 1
    piles[] = [3, 6, 7, 11]
time taken  = [3, 6, 7, 11] --> (using Math.ceil(arr[i]/k)), ceil because if arr[i] < k, that hour will be wasted, koko 
                                                             will take full hour even though she finishes eating

total time  = 3 + 6 + 7 + 11 > h, NOT ACCEPTABLE 
  
ex: let k = 2
    piles[] = [3, 6, 7, 11]
time taken  = [3, 6, 7, 11] --> (using Math.ceil(arr[i]/k)), ceil because if arr[i] < k, that hour will be wasted, koko 
                                                             will take full hour even though she finishes eating

total time  > h, NOT ACCEPTABLE 

ex: let k = 3
    piles[] = [3, 6, 7, 11]
time taken  = [1, 2, 3, 4] --> (using Math.ceil(arr[i]/k)), ceil because if arr[i] < k, that hour will be wasted, koko 
                                                             will take full hour even though she finishes eating

total time  > h, NOT ACCEPTABLE 

ex: let k = 4
    piles[] = [3, 6, 7, 11]
time taken  = [1, 2, 2, 3] --> (using Math.ceil(arr[i]/k)), ceil because if arr[i] < k, that hour will be wasted, koko 
                                                             will take full hour even though she finishes eating

total time  <= h, ACCEPTABLE and MINIMUM value 
  

TC: O(INT_MAX * arr.length), it will give TLE!!
SC: O(1)

BS Logic:
- Note that we try k from 1 --- INT_MAX, but that can also be 1 --- Math.max(...arr)
- whenever we have ans after a particular range, we can use BS. Refer sqrt using BS Q
- Determine the range for BS, here it is [1....Math.max(...arr)]


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

        // if eating 3 bananas takes 8 hrs say, then eating 2 and 1 bananas will obviously take more time,
        // So, eliminate left half
        else if(totalTime > h) low = mid + 1; 

    }

    return ans;
}