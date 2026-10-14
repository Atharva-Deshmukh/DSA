/* 853. Car Fleet

There are n cars at given miles away from the starting mile 0, traveling to reach the mile target.

You are given two integer arrays position and speed, both of length n, where position[i] is 
the starting mile of the ith car and speed[i] is the speed of the ith car in miles per hour.

A car cannot pass another car, but it can catch up and then travel next to it at the speed of the slower car.

A car fleet is a single car or a group of cars driving next to each other. 

The speed of the car fleet is the minimum speed of any car in the fleet.

If a car catches up to a car fleet at the mile target, it will still be 
considered as part of the car fleet.

Return the number of car fleets that will arrive at the destination.

Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3

Explanation:
The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. 
The fleet forms at target.
The car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself.
The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. 
The fleet moves at speed 1 until it reaches target.


Input: target = 10, position = [3], speed = [3]
Output: 1

Explanation:

There is only one car, hence there is only one fleet.

Input: target = 100, position = [0,2,4], speed = [4,2,1]
Output: 1

Explanation:

The cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, meeting each other at 4. 
The car starting at 4 (speed 1) travels to 5.
Then, the fleet at 4 (speed 2) and the car at position 5 (speed 1) become one fleet, 
meeting each other at 6. The fleet moves at speed 1 until it reaches target.
 

Constraints:

n == position.length == speed.length
1 <= n <= 10^5
0 < target <= 10^6
0 <= position[i] < target
All the values of position are unique.
0 < speed[i] <= 10^6


Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
            timeToReachTarget  [1, 1, 12, 7, 3]

If a car behind reaches earlier or at same time as car ahead → it must catch it.
If it reaches later → it will never catch it.

                                            Visualize on Road
                                            -----------------

Road:
0 ---- 3 ---- 5 ---- 8 ---- 10 ---- 12(target)

Cars closer to 12 are in front.
A car can only interact with cars in front of it.
So if I am car at position 3, I only care about cars at 5, 8, 10.
I DO NOT care about car at 0 (behind me).

This is the key insight.

When deciding whether car at 3 merges,
we need to already know what happened to cars at 5, 8, 10.

If we go farthest → closest: (above order)
    We try to predict the future.
    That doesn’t work.

If we go closest → farthest:
    We already know the final behavior of cars ahead.

That’s why sorting descending is mandatory.

Hence, Arrange the coordinates from closest to target -> Farthest

SortedCoordinatesOrderDescendingOrder = (10, 2), (8, 4), (5, 1), (3, 3), (0, 1) 
                   timeToReachTarget  =     1       1       7       3      12  

Stack Approach:
- Calculate time to reach target for each coordinate
- Iterate from 0 to n - 1
- If currentTime > st.top(), it will be a separate fleet, push it into the stack
- if currentTime <= st.top(), it will form fleet and st.top() already accounted for this fleet, 
   so don't do anything

time[0] = 1:
    stack = empty, so push
    [ 1

time[1] = 1:
    time should be greater than st.top()
    Don't do anything
    [ 1

time[2] = 7:
    time > st.top()
    push it
    [ 1 7

time[3] = 3:
    time < st.top()
    Don't do anything
    [ 1 7

time[4] = 12:
    time > st.top()
    Push it
    [ 1 7 12

st.length() = answer

*/

class myStack {
    public currentSize: number;
    private stack: number[];

    constructor() {
        this.currentSize = 0;
        this.stack = [];
    }

    push(element: number) {
        this.stack[this.currentSize] = element;
        this.currentSize++;
    }

    /* Just free the memory of the last element stored in the array */
    pop() {
        if (!this.isEmpty()) {
            this.currentSize--;
            this.stack.length = this.currentSize;
        }
    }

    display() {
        console.warn(this.stack);
    }

    top() {
        if (this.currentSize > 0) return this.stack[this.currentSize - 1];
        else return NaN;
    }

    isEmpty() {
        return (this.currentSize === 0) ? true : false;
    }
};

function carFleet(target: number, position: number[], speed: number[]): number {
    
    /* Combine the positions and the speeds 
       Create an array of tuples 
       Values example: [[10, 2], [8, 4], [0, 1], [5, 1], [3, 3]]
    */
    const coordinates: [number, number][] = position.map((pos, i) => [pos, speed[i]]);
    
    /* Sort by position descending. Closest -> Farthest */
    coordinates.sort((a, b) => b[0] - a[0]);
    
    let st = new myStack();
    
    /* Traverse the reversed coordinates */
    for (const ele of coordinates) {
        const pos = ele[0];
        const spd = ele[1];

        const currentTime = (target - pos) / spd;
        
        /* If stack empty OR current car cannot catch fleet ahead */
        if ((st.isEmpty()) || (currentTime > st.top())) st.push(currentTime);
    }
    
    return st.currentSize;
};