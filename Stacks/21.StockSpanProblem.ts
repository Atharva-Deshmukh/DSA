/* 901. Online Stock Span

GFG Problem statement is more clear:
------------------------------------

Input: arr[] = [100, 80, 60, 120]
Output:        [1, 1, 1, 4]
Explanation: For 100, there are no previous higher prices, so span = 1. For 80 and 60, 
each is smaller than the previous, so their spans remain 1. For 120, it is greater 
than all earlier prices (100, 80, 60), so the span extends back across all four days, giving span = 4.

Input: arr[] = [10, 4, 5, 90, 120, 80]
Output:        [1, 1, 2, 4, 5, 1]
Explanation: For 10 and 4, no earlier prices are smaller, so span = 1 each. For 5, 
it is greater than 4, so span = 2. For 90, it is greater than 10, 5, and 4, so span = 4. 
For 120, it is greater than all previous prices, giving span = 5. Finally, 80 is smaller
 than 120, so span = 1.

Leetcode problem statement:
---------------------------

Design an algorithm that collects daily price quotes for some stock and returns the span of 
that stock's price for the current day.

The span of the stock's price in one day is the maximum number of consecutive days 
(starting from that day and going backward) for which the stock price was less than or 
equal to the price of that day.

For example, if the prices of the stock in the last four days is [7,2,1,2] and the price 
of the stock today is 2, then the span of today is 4 because starting from today, the 
price of the stock was less than or equal 2 for 4 consecutive days.
Also, if the prices of the stock in the last four days is [7,34,1,2] 
and the price of the stock today is 8, then the span of today is 3 because starting from today, 
the price of the stock was less than or equal 8 for 3 consecutive days.

Implement the StockSpanner class:

StockSpanner() Initializes the object of the class.
int next(int price) Returns the span of the stock's price given that today's price is price.
 

Example 1:

Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output
[null, 1, 1, 1, 2, 1, 4, 6]

Explanation
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6
 

Constraints:
    1 <= price <= 10^5
    At most 104 calls will be made to next.


Way-1: Brute Force
Just simply have 2 loops 

for(i = 0 --- n-1)
    while(j = i -- 0) traverse backwards until we have i = 0 or a[i-1] <= a[i] 
                                               - current day and previous days

TC: O(n^2)
SC: O(1)

Way-2: Optimised
- Since we need to know previous elements, we can use stack here
- Now, for this array = [7, 2, 1, 2, 3] 
                         0  1  2  3  4

                         for 3, If I would know the previous greater element index,
                         here, previous greater element index = 0, and current index = 4
                         hence, no of previous consequtive smaller or equal elements = 4 - 0

                        Find pge index basically and subtract
*/

class myStack {
    public currentSize: number;
    public poppedElement: number;
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
            this.poppedElement = this.stack[this.currentSize - 1];
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

class Solution {
    calculateSpan(a) {
        const n = a.length;

        if(n === 1) return [1];
        
        let res = [];
        let st = new myStack();
        let previousGreaterIndex = [];

        for(let i = 0; i < n; i++) {

            /* Calculate previous greater index and store in stack */
            while((!st.isEmpty()) && (a[st.top()] <= a[i])) st.pop();
            previousGreaterIndex[i] = (st.isEmpty())? -1: st.top();
            st.push(i);

            /* Try to compute the problem result simultaneosly */
            res[i] = i - previousGreaterIndex[i];  /* -1 automatically adjusts */
        }

        return res;
    }
}

/* Here in the above code, it gives TLE on GFG because of pop(), every time the array resizes itself
   This causes the TC = O(n^2)
   use native array directly as stack
*/

class Solution {
    calculateSpan(a) {
        const n = a.length;

        if(n === 1) return [1];
        
        let res = [];
        let st = []
        let previousGreaterIndex = [];

        for(let i = 0; i < n; i++) {

            /* Calculate previous greater index and store in stack */
            while((!st.length == 0) && (a[st[st.length - 1]] <= a[i])) st.pop();
            previousGreaterIndex[i] = (st.length == 0)? -1: st[st.length - 1];
            st.push(i);

            /* Try to compute the problem result simultaneosly */
            res[i] = i - previousGreaterIndex[i];
        }

        return res;
    }
}

// Leetcode sumbission
class StockSpanner {

    private stack: [number, number][];

    constructor() {
        this.stack = [];
    }

    next(price: number): number {
        let span = 1;

        // Merge spans of smaller or equal prices
        while (this.stack.length > 0 && this.stack[this.stack.length - 1][0] <= price) {
            span += this.stack.pop()![1];
        }

        this.stack.push([price, span]);

        return span;
    }
}