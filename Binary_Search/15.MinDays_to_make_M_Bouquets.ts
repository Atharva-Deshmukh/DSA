/* You are given an integer array bloomDay, an integer m and an integer k.
You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.
The garden consists of n flowers, the ith flower will bloom in the bloomDay[i] and then can be used in exactly one 
bouquet. Return the minimum number of days you need to wait to be able to make m bouquets from the garden. 
If it is impossible to make m bouquets return -1.


Input: bloomDay = [1,10,3,10,2], m = 3, k = 1       Output: 3
Explanation: Let us see what happened in the first three days. x means flower bloomed and _ means flower did not 
bloom in the garden.
We need 3 bouquets each should contain 1 flower.
After day 1: [x, _, _, _, _]   // we can only make one bouquet.
After day 2: [x, _, _, _, x]   // we can only make two bouquets.
After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.

Input: bloomDay = [1,10,3,10,2], m = 3, k = 2       Output: -1
Explanation: We need 3 bouquets each has 2 flowers, that means we need 6 flowers. We only have 5 flowers so it is 
impossible to get the needed bouquets and we return -1.


Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3    Output: 12
Explanation: We need 2 bouquets each should have 3 flowers.
Here is the garden after the 7 and 12 days:
After day 7: [x, x, x, x, _, x, x]
We can make one bouquet of the first three flowers that bloomed. We cannot make another bouquet from the last three flowers that bloomed because they are not adjacent.
After day 12: [x, x, x, x, x, x, x]
It is obvious that we can make two bouquets in different ways.

Logic: (Brute force)
- First, the corner case => if(arr.length < m*k) return -1;
- Lets do this by brute force

let bloomDay = [7, 7, 7, 7, 12, 13, 7, 7], m = 2, k = 3

for a bloom to even occur, we need minimum 7 days    => Math.min(...bloomDay)
for a bloom to definitely occur, we need max 13 days => Math.max(...bloomDay)

so range of days => [7, ......., 13]

Day 7: 
        bloomDay = [7, 7, 7, 7, 12, 13, 7, 7]
     bloomStatus = [x, x, x, x, _,  _,  x, x]

     iterate bloomDay and let counter = 0
     if(bloomDay[i] < day) counter++ // counts adjacent same values
     else {
        let n = counter/k   // we have count of adjacent blooms, get no. of bouquets that can be formed
        counter = 0;        // Reset counter for further adjacent bloom calculations
        if(n === m) return true; 
     }

     return false

     So, here we have n = 1 only at the end of day 7 and n < m, return false

Day 8: 
      returns false similarly

Day 9: 
      returns false similarly
      .
      .
      .
      .

Day 12: 
        bloomDay = [7, 7, 7, 7, 12, 13, 7, 7]
     bloomStatus = [x, x, x, x, x,  _,  x, x]

     iterate bloomDay and let counter = 0
     if(bloomDay[i] < day) counter++ // counts adjacent same values
     else {
        let n = counter/k   // we have count of adjacent blooms, get no. of bouquets that can be formed
        counter = 0;        // Reset counter for further adjacent bloom calculations
        if(n === m) return true; 
     }

     return false

     So, here we have n = 1 only at the end of day 12 and n < m, return false

TC: O((MaxEle - MinEle) * (arr.length))
SC: O(1)
*/
function isThisDayPossible(bloomDay: number[], day: number, m: number, k: number): boolean {
    let counter: number = 0;
    let boquetsPossible: number = 0;

    bloomDay.forEach((blmDay) => {
        // counts adjacent same values and check if the counter is reached k after counter++ here itself
        if(blmDay <= day) {
            counter++;
            if(counter === k) {
                boquetsPossible++;
                counter = 0;
            }
        } 

        // reset the counter
        else counter = 0;
    });

    if(boquetsPossible >= m) return true;
    return false;
}

function bruteForceSol(bloomDay: number[], m: number, k: number): number {
    let n: number = bloomDay.length;

    // corner cases
    if(n < m*k) return -1;
    if((n === 1) && (m === 1) && (k === 1)) return 1;

    // determine range of days to iterate from, we won't iterate from 1 ---- INT_MAX
    // This can be optimised in one loop itself instead of using low = Math.min(...bloomDay) 
                                                            //  high = Math.max(...bloomDay)
    let low: number = bloomDay[0];
    let high: number = bloomDay[0];
    bloomDay.forEach((blmDay) => {
        if(blmDay < low)  low = blmDay; 
        if(blmDay > high) high = blmDay; 
    });

    for(let day = low; day <= high; day++) {
        // Since we are already iterating in ascending order of days, return the first possible day since that will
        // be definitely a minimum
        if(isThisDayPossible(bloomDay, day, m, k)) return day;
    }

    // we will never reach here
    return -1;
}

/* OPTIMISATION USING BS

- we have solution availablility as -> [X, X, X, X, Y, Y, Y, Y, Y], it indicates BS approach can be used
  X = solution not possible
  Y = solution possible
- Inner function cannot be optimised further since adjacent calculate karne ke liye full array traversal is needed
  but it can be now modified to return no. of bouquets possible for comparision and half elimination during BS
- Outer function iterates from arrMin --- arrMax, this is sorted and we can use BS here

TC: O(log2(MaxEle - MinEle) * (arr.length))
SC: O(1)
*/

function noOfBouquetsPossibleThisDay(bloomDay: number[], day: number, m: number, k: number): number {
    let counter: number = 0;
    let boquetsPossible: number = 0;

    bloomDay.forEach((blmDay) => {
        // counts adjacent same values and check if the counter is reached k after counter++ here itself
        if(blmDay <= day) {
            counter++;
            if(counter === k) {
                boquetsPossible++;
                counter = 0;
            }
        } 

        // reset the counter
        else counter = 0;
    });

    return boquetsPossible;
}

function BS_Sol(bloomDay: number[], m: number, k: number): number {
    let n: number = bloomDay.length;

    // corner cases
    if(n < m*k) return -1;
    if((n === 1) && (m === 1) && (k === 1)) return 1;

    // determine range of days to iterate from, we won't iterate from 1 ---- INT_MAX
    // This can be optimised in one loop itself instead of using low = Math.min(...bloomDay) 
                                                            //  high = Math.max(...bloomDay)
    let low: number = bloomDay[0];
    let high: number = bloomDay[0];
    bloomDay.forEach((blmDay) => {
        if(blmDay < low)  low = blmDay; 
        if(blmDay > high) high = blmDay; 
    });
    let ans: number = Number.MAX_SAFE_INTEGER;

     // to handle cases like [1,1,1,1] m = 3 k = 1
     if(low === high) {
        let boquetsPossible: number = Math.floor(n / k);
        return (boquetsPossible >= m)? low: -1;
    } 

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);
        
        if(noOfBouquetsPossibleThisDay(bloomDay, mid, m, k) === m) {
            ans = mid;
            high = mid - 1; // explore further smaller possibilities
        }
        else if(noOfBouquetsPossibleThisDay(bloomDay, mid, m, k) < m) low = mid + 1;
        else if(noOfBouquetsPossibleThisDay(bloomDay, mid, m, k) > m) high = mid - 1;
    }

    return (ans !== Number.MAX_SAFE_INTEGER)? ans: -1;
}

