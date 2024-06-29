/* A conveyor belt has packages that must be shipped from one port to another within days days.
The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages 
on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight 
capacity of the ship.
Return the least weight capacity of the ship that will result in all the packages on the conveyor belt 
being shipped within days days.

Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5           Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10

Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.

Input: weights = [3,2,2,4,1,4], days = 3                    Output: 6
Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
1st day: 3, 2
2nd day: 2, 4
3rd day: 1, 4
Example 3:

Input: weights = [1,2,3,1,1], days = 4                      Output: 3
Explanation:
1st day: 1
2nd day: 2
3rd day: 3
4th day: 1, 1

BRUTE FORCE LOGIC:
- Note that the ship's capacitiy will always be >= Math.max(...weights) bcoz we have to sum up the values as per days
- Corner case is if day = 1, min weight of the ship must be the sum of all elements of weights[]

[1,2,3,4,5,6,7,8,9,10], days = 5

                    weight = 10
day1: 1, 2, 3, 4
day2: 5
day3: 6
day4: 7
day5: 8

                    weight = 11
day1: 1, 2, 3, 4
day2: 5, 6
day3: 7
day4: 8
day5: 9

                    weight = 12
day1: 1, 2, 3, 4
day2: 5, 6
day3: 7
day4: 8
day5: 9

                    weight = 13
day1: 1, 2, 3, 4
day2: 5, 6
day3: 7
day4: 8
day5: 9

                    weight = 14
day1: 1, 2, 3, 4
day2: 5, 6
day3: 7
day4: 8
day5: 9

                    weight = 15
day1: 1, 2, 3, 4, 5
day2: 6, 7
day3: 8
day4: 9
day5: 10


TC: O((INT_MAX) * (days * weights.length))
SC: O(1) */
function isCurrentWeightPossible(weights: number[], days: number, currentWeight: number): boolean {
    let index: number = 0;
    let n: number = weights.length;

    while (days > 0) {

        let wght: number = 0;
        // keep adding the current weight only if it is <= currentWeight
        while ((index < n) && (wght + weights[index]) <= currentWeight) {
            wght += weights[index];
            index++;
        }
        days--;   
    }
    // If all weights are processed within days days, return true
    return (index === n); 
}

function bruteForceSol(weights: number[], days: number): number {
    if(days === 1) return weights.reduce((sum, wght) => {
        return sum = sum + wght;
    });

    for(let currentWeight = Math.max(...weights); currentWeight <= Number.MAX_SAFE_INTEGER; currentWeight++) {

        // since we are iterating in an ascending order, the first element we get will be minimum
        if(isCurrentWeightPossible(weights, days, currentWeight)) return currentWeight;
    }

    // we will never reach here
    return -1;
}

/* Optimisation using BS
- since the solution starts appearing after a particular range and the space is in increasing order, we can think of BS
- No need to actually modify helper function, if it returns false for currentWeight, low = mid + 1 else high = low - 1
- Determine the range for BS, low = Math.max(...arr) and high = sum of all elements of the array
  they both can be calculated in one iteration to save time

TC: O(log2(INT_MAX) * (days * weights.length))
SC: O(1) */

function BS_solution(weights: number[], days: number): number {
    let sum: number = 0;
    let low: number = Number.MIN_SAFE_INTEGER;
    let high: number = 0;
    let ans: number = 0;

    weights.forEach((weight) => {
        sum = sum + weight;
        low = Math.max(low, weight);
    });
    high = sum;

    if(days === 1) return sum;

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        if(isCurrentWeightPossible(weights, days, mid)) {
            ans = mid;
            high = mid - 1;
        }
        else  low = mid + 1;
    }
    return ans;
}
