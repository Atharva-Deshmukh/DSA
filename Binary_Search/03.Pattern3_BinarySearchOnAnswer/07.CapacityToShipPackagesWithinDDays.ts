/* Leetcode 1011:
A conveyor belt has packages that must be shipped from one port to another within D days.
The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages 
on the conveyor belt (in the order given by weights[]). We may not load more weight than the maximum weight 
capacity of the ship.
Return the least weight capacity of the ship that will result in all the packages on the conveyor belt 
being shipped within D days.

Input: weights = [1,2,3,4,5,6,7,8,9,10], D = 5           Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10

Note that the cargo must be shipped in the order given, so using a ship of capacity 14 
and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.

Input: weights = [3,2,2,4,1,4], D = 3                    Output: 6
Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
1st day: 3, 2
2nd day: 2, 4
3rd day: 1, 4

Input: weights = [1,2,3,1,1], D = 4                      Output: 3
Explanation:
1st day: 1
2nd day: 2
3rd day: 3
4th day: 1, 1

                                                Way-1: Brute force
                                                ------------------

- Fix the capacities one by one. Try out all capacities from [Math.max(...weights[])---INT_MAX]
  since we are calculating the sum of the weights, so minCapacity >= Math.max(...weights[])
- Corner case: if D = 1, minWeight = weights.reduce((sum, w) => sum + w)
- Grouping of cargo is formed automatically once we fix the ship's minWeight

[1,2,3,4,5,6,7,8,9,10], D = 5

Fix minWeight = 10, now iterate and see if all the cargo can be shipped within D days

day1: 1, 2, 3, 4 <= 10
day2: 5          <= 10
day3: 6          <= 10
day4: 7          <= 10
day5: 8          <= 10

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


Here also, we will have to return first valid capacity, since that will be min

                [X, X, X, X, ✓, ✓, ✓, ✓]
                             |
                            min

                    for(capacity = 1; capacity <= INT_MAX; capacity++) {

                            // first minimum capacity should be returned
                            if(ifThisCapacityValid(capacity) === true) return capacity;

                            return -1;

                    }

                    // All cargo must be shipped within D days for the capacity to be valid
                    ifThisCapacityValid(capacity) {

                            // distribute the cargo load each day
                            for(day = D; day > 0; day--) {

                                let sum = 0
                                for(let i = 0; i < weights.length;) {
                                    while(sum <= capacity) {
                                        sum += weights[i];
                                        i++;
                                    }
                                }

                            }
                    }


TC: O((INT_MAX) * (days * weights.length))
SC: O(1) */

function isThisCapacityValid(weights: number[], capacity: number, D: number): boolean {
    const n: number = weights.length;
    let i: number = 0;

    // distribute the cargo load each day
    // for each day, weights[] should not be iterated from the start
    while(D > 0) {

        let sum: number = 0;  // sum resets each day
        
                          // add only if the capacity is addable
        while((i < n) && (sum + weights[i] <= capacity)) {
            sum += weights[i];
            i++;
        }
        
       D--;
    }
    
    return (i === n);
}

function shipWithinDays(weights: number[], D: number): number {
        const n: number = weights.length;
    
    for(let capacity = 1; capacity <= Number.MAX_SAFE_INTEGER; capacity++) {
        if(isThisCapacityValid(weights, capacity, D) === true) return capacity;
    }
    
    return -1;
};

/*                                     Way-2: Binary Search Approach
                                       -----------------------------

Thought:
- Our search space is sorted [1---INT_MAX] and we start to get solution after a certain range
  and we've to return min value, we can use BS here to eliminate some nodes

                [X, X, X, X, ✓, ✓, ✓, ✓]
                             |
                            min

TC: O(log2(INT_MAX) * (days * weights.length))
SC: O(1) */

function BS_solution(weights: number[], D: number): number {
    let low: number = 1;
    let high: number = Number.MAX_SAFE_INTEGER;
    let ans: number = Number.MAX_SAFE_INTEGER;

     /* Corner case */
    if(D === 1) return weights.reduce((sum, w) => sum + w);

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);

        if(isThisCapacityValid(weights, mid, D)) {
            ans = (mid < ans)? mid: ans; /* Explore further minimum */
            high = mid - 1;
        }
        else  low = mid + 1;
    }
    return ans;
}
