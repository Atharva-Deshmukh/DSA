/* Leetcode 1482:
You are given an integer array bloomDay, an integer m and an integer k.
You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.
The garden consists of n flowers, the ith flower will bloom in the bloomDay[i] and then can be used in exactly one 
bouquet. Return the minimum number of days you need to wait to be able to make m bouquets from the garden. 
If it is impossible to make m bouquets return -1.


Input: bloomDay = [1,10,3,10,2], m = 3, k = 1       Output: 3
Explanation: Let us see what happened in the first three days. 
             x --> flower bloomed
             _ --> means flower did not bloom in the garden.

We need 3 bouquets each should contain 1 flower.
After day 1: [x, _, _, _, _]   // we can only make one bouquet.
After day 2: [x, _, _, _, x]   // we can only make two bouquets.
After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.

Input: bloomDay = [1,10,3,10,2], m = 3, k = 2       Output: -1
Explanation: We need 3 bouquets each has 2 flowers, that means we need 6 flowers. 
             We only have 5 flowers so it is impossible to get the needed bouquets and we return -1.


Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3    Output: 12
Explanation: We need 2 bouquets each should have 3 flowers.

Here is the garden after the 7 and 12 days:

After day 7: [x, x, x, x, _, x, x]

We can make one bouquet of the first three flowers that bloomed. 
We cannot make another bouquet from the last three flowers that bloomed because they are not adjacent.

After day 12: [x, x, x, x, x, x, x]
               |-----|  |-----|    -->   we cannot use same flower twice

                                                Way-1: Brute Force
                                                ------------------

- if(arr.length < m*k) return -1; as for m bouquets with k adjacent flowers, we need atleast m*k a[].length;
- ans will always be in between [Math.min(...bloomDay)..Math.max(...bloomDay)]
  because we need min time to bloom always


Ex. bloomDay = [7, 7, 7, 7, 12, 13, 7, 7], m = 2, k = 3

Range of days => [7, ......., 13]

Day 7: 
        bloomDay = [7, 7, 7, 7, 12, 13, 7, 7]
     bloomStatus = [x, x, x, x, _,  _,  x, x]

     noOfBouquetsPossibleWithKAdjacentFlowers = someBlackBox(bloomStatus, k)

     how to find this someBlackBox()

     Instead of maintaining bloomStatus[] separately, we will just simulate the same in bloomDay[]
     X -> when bloomDay[i] <= currentDay
     counter++

     --------------------------------------------------------------------------
     We can count adjacent blooms using a similar algo/problem

    Problem:
    [1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1], 
    sum = 2 and no 1 should be repeated
    return number of instances of sum = 2 with adjacent 1s (blooms in our case) such that no 1 is used twice.
    
    ans = 3 instances
    
    Approach: simply iterate and use counter, reset it
    

        function sumUsingCounter(a: number[], sum): number {
            
            const n: number = a.length;
            let instances: number = 0, counter: number = 0;
            
            for(let i = 0; i < n; i++) {

                if(a[i] === 1) {
                    counter++;
                    if(counter === sum) {
                        instances++;
                        counter = 0; // Reset the counter so that this 1 won't be included again in the count
                    }
                }
                else counter = 0; // Reset the counter
            }
            return instances;
        }

        const a = [1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1], sum = 2;
        console.log(sumUsingCounter(a, sum));

     --------------------------------------------------------------------------

     We can use the same logic above to calculate adjacent k blooms for a particular day

     1 -> In our case its if(bloomDay[i] <= currentDay) --> kAdjacentBloomCounter++
     There also same 1 couldn't be considered, here also same flower won't be considered

     instances -> bouquetsPossible

     But more than this, we need to check if the currentDay is a possible day or not
     so if(bouquetsPossible === m) return true; // this day is valid 

     As soon as we get the first possible day, we will stop, because that is the min day and our ans

                       [X, X, X, X, ✓, ✓, ✓, ✓]
                                    |
                            min sum possible

TC: O((INT_MAX) * (arr.length))
         |             |
   search space   isThisDayPossible() for each day OR each i
SC: O(1)
*/
function isThisDayPossible(bloomDay: number[], currentDay: number, m: number, k: number): boolean {
    let kAdjacentBloomsCounter: number = 0;
    let bouquetsPossible = 0;

    bloomDay.forEach((blmDay) => {

        if (blmDay <= currentDay) {
            kAdjacentBloomsCounter++;
            if (kAdjacentBloomsCounter === k) {
                bouquetsPossible++;
                kAdjacentBloomsCounter = 0;  /* Reset the counter */
            }
        }

        else kAdjacentBloomsCounter = 0;     /* Reset the counter */
    });

    return (bouquetsPossible >= m)? true : false;
}

function bruteForceSol(bloomDay: number[], m: number, k: number): number {
    let n: number = bloomDay.length;

    // corner cases
    if (n < m * k) return -1;
    if ((n === 1) && (m === 1) && (k === 1)) return 1;

    for(let day = 1; day <= Number.MAX_SAFE_INTEGER; day++) {
        /* Since we are already iterating in ascending order of days, return the first possible day since that will be definitely a minimum */
        if (isThisDayPossible(bloomDay, day, m, k)) return day;
    }

    // we will never reach here
    return -1;
}

/* WAY-2: Binary Search

Though: Since we have a condition like this already

                     [X, X, X, X, ✓, ✓, ✓, ✓]
                                  |
                            min sum possible

and we are already iterating from [1 --- INT_MAX] --> sorted order

We can think of BS to eliminate elements

TC: O(log2(MaxEle - MinEle) * (arr.length))
SC: O(1)
*/


function BS_Sol(bloomDay: number[], m: number, k: number): number {
    let n: number = bloomDay.length;
    let ans: number = Number.MAX_SAFE_INTEGER;

    // corner cases
    if(n < (m*k)) return -1;
    if((n === 1) && (m === 1) && (k === 1)) return 1;

    let low: number = 1
    let high: number = Number.MAX_SAFE_INTEGER;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);
        
        if(isThisDayPossible(bloomDay, mid, m, k) === true) {
            ans = (mid < ans)? mid: ans;
            high = mid - 1; // explore further smaller possibilities
        }
        else low = mid + 1;
    }

    return ans;
}

