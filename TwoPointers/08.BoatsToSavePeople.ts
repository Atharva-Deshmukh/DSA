/* 881. Boats to Save People

You are given an array people where people[i] is the weight of the ith person, and an 
infinite number of boats where each boat can carry a maximum weight of limit. 
Each boat carries at most two people at the same time, provided the sum of the 
weight of those people is at most limit.

Return the minimum number of boats to carry every given person.

Input: people = [1,2], limit = 3
Output: 1
Explanation: 1 boat (1, 2)

Input: people = [3,2,2,1], limit = 3
Output: 3
Explanation: 3 boats (1, 2), (2) and (3)

Input: people = [3,5,3,4], limit = 5
Output: 4
Explanation: 4 boats (3), (3), (4), (5)

Input: people = [1,3,2,3,2], limit = 3
Output: 4
Explanation: (3), (3), (1, 2), (2)
 

Constraints:
    1 <= people.length <= 5 * 10^4
    1 <= people[i] <= limit <= 3 * 10^4


Thought of a BRUTE FORCE, but it doesn't work because we need combination of one light and one heavy
person to make boats count minimum, but here we are just filling the boats starting from mins to maxs.
This gives wrong output for some tests

function numRescueBoats(people: number[], limit: number): number {
    people.sort((a, b) => a - b);
    
    const n: number = people.length;
    let boats: number = 0, i = 0;
    
    while(i < n) {
        
        let currentBoatWeight: number = 0;
        let peopleInBoat: number = 0;
        
        while(((currentBoatWeight + people[i]) <= limit) && (peopleInBoat <= 2)) {
            currentBoatWeight = currentBoatWeight + people[i];
            peopleInBoat++;
            i++;
        }
        
        boats++;
    }
    
    return boats;
};


Two Pointer Approach:
---------------------
- Sort this array --> This will shift lightest person on left and heaviest person on right
- now left = 0 (points to the lightest person)
      right = (n - 1) (points to the heaviest person)
- One boat = 2 people's capacity
- If both the persons can sit in the same boat, count++, left++, right-- of boats. 
- Otherwise, make the heavier person sit in the boat since we need min boats and right--. 
  Also, increase the count of boats.

TC: O(n log n) + O(n) = O(n log n)
SC: O(1)  */

function numRescueBoats(a: number[], limit: number): number {
    let l = 0, r = (a.length - 1), count = 0;

   a = a.sort((x, y) => x - y);

    while (l <= r) {
        if((a[l] + a[r]) <= limit) {
            count++; 
            l++;
            r--;
        }
        else {
            if(a[l] <= a[r]) { r--; count++; } /* If right is heavy, make heavier person to sit in boat and right-- */
            else { l++; count++; }             /* If left is heavy, make heavier person to sit in boat and left++ */
        }
    }

    return count;
};