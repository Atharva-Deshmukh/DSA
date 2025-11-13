/* To print reverse Fibonacci series using a recursion, we can note one thing
   in parametric recursion for fibonacci, at each level, we get nth fibonacci in the first parameter
   So, nth fibonacci is stored in the first parameter of that recursion level

   Just go till n === 1 and keep returning f0 then

    n = 5
      => 0 1 1 2 3

                            F(5, 0, 1)                  -> return [3, 2, 1, 1, 0]
                                \
                                F(4, 1, 1)              -> return [3, 2, 1, 1]
                                    \
                                    F(3, 1, 2)          -> return [3, 2, 1]
                                        \
                                        F(2, 2, 3)      -> return [3, 2]
                                            \
                                            F(1, 3, 5)  -> return [3]
   
   */

function Reversefibonacci_Recursive(n: number, f0: number, f1: number): number[] {
    if(n === 1) return [f0];
    else return Reversefibonacci_Recursive(n - 1, f1, f0 + f1).concat([f0]);
}   

console.log(Reversefibonacci_Recursive(1, 0, 1)); // [0]
console.log(Reversefibonacci_Recursive(2, 0, 1)); // [1, 0]
console.log(Reversefibonacci_Recursive(3, 0, 1)); // [1, 1, 0]
console.log(Reversefibonacci_Recursive(4, 0, 1)); // [2, 1, 1, 0]
console.log(Reversefibonacci_Recursive(5, 0, 1)); // [3, 2, 1, 1, 0] 
console.log(Reversefibonacci_Recursive(6, 0, 1)); // [5, 3, 2, 1, 1, 0] 

/*  Time Complexity

At each recursion level:
A recursive call is made → O(1)
Then .concat([f0]) is used → which creates a new array by copying the previous array 
(of length n-1, n-2, ...), and appending an element.

This .concat() dominates the cost.

Breakdown:
At level n, .concat() on array of size n-1 → O(n-1)
At level n-1, .concat() on array of size n-2 → O(n-2)

Total time = O(1 + 2 + 3 + ... + n-1) = O(n²)

✅ Time Complexity = O(n²)

Space Complexity

Call stack: Depth of recursion = n → O(n)
Array created: Stores n Fibonacci numbers → O(n)
But no reuse of arrays — .concat() creates a new array at each level, so cumulative memory allocations could be O(n²), 
but only one final array is retained, others are garbage collected.

✅ Space Complexity (Auxiliary) = O(n) (due to call stack and final array)
🚨 If interviewer considers all allocations including .concat() memory, worst-case memory overhead = O(n²). 
   But usually we report space = O(n). 
   
   
TO AVOID that O(n^2), we can add one more parameter    */

function Reversefibonacci_Recursive_Optimized(n: number, f0: number, f1: number, result: number[] = []): number[] {
    if (n === 1) {
        result.push(f0);
        return result;
    }
    Reversefibonacci_Recursive_Optimized(n - 1, f1, f0 + f1, result);
    result.push(f0);
    return result;
}

/* Time and Space Complexity

Time = O(n) — each recursion step does only a push, no array copying
Space = O(n) — for both recursion stack and result array */



  