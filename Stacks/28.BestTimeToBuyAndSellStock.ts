/* 121. Best Time to Buy and Sell Stock

You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing 
a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. 
If you cannot achieve any profit, return 0.

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

Constraints:
    1 <= prices.length <= 10^5
    0 <= prices[i] <= 10^4


                                            BRUTE FORCE
                                            -----------

- For each i, iterate j from (i + 1) --- (n - 1) and store max(maxProfit, (a[j] - a[i]))
  If max at the end is still Number.MIN_SAFE_INTEGER, return 0

TC: O(n^2)
SC: O(1)

Since we can sell only in the future day, we can think of stack to store greatest element on right
Getting the largest element on right is similar to Next greater element, 
Just the difference is, push only when stack is empty, if stack is not empty, a[i] < st.top()
means, st.top() is greatest element on the right

arr = [7,  1, 5, 3,  6,  4]
nge = [-1, 6, 6, 6, -1, -1]

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
    }

    isEmpty() {
        return (this.currentSize === 0) ? true : false;
    }
};

function greatestElementOnRight(a: number[]): number[] {
    const n = a.length;
    
    if(n === 1) return [-1];
    
    let st = new myStack();
    let ans = Array(n).fill(0);
    
    for(let i = (n - 1); i >= 0; i--) {
        
        /* Remove all the elements from the stack that are less than a[i] */
        while((!st.isEmpty()) && (st.top() <= a[i])) st.pop();
        
        ans[i] = (st.isEmpty())? -1: st.top();
        
        /* Push only if stack is empty, because if stack is not empty, means
           on right, we still have some element greater than a[i], hence it will
           be greatest
        */
        
        if(st.isEmpty()) st.push(a[i]);
    }
    
    return ans;
}

function maxProfit(prices: number[]): number {
    let maxProfit = Number.MIN_SAFE_INTEGER;
    const n = prices.length

    let ngeArr = greatestElementOnRight(prices);

    for(let i = 0; i < n; i++) maxProfit = Math.max(maxProfit, (ngeArr[i] - prices[i]));

    if(maxProfit < 0) maxProfit = 0;
    return maxProfit;
};


/* Best Approach: Greedy Approach */

function maxProfit(prices: number[]): number {
    let minPrice = Infinity;
    let maxProfit = 0;

    for (let price of prices) {

        minPrice = Math.min(minPrice, price);

        let profit = price - minPrice;

        maxProfit = Math.max(maxProfit, profit);
    }

    return maxProfit;
}