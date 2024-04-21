/* calculating the nth number in the Fibonacci sequence */

/* With memoisation: repeated calculations will be avoided due to cache

                            fib(4)
                            /     \
                    fib(3)         fib(2)
                   /     \        /      \
              fib(2)   fib(1)  fib(1)  fib(0)
             /     \
       fib(1)   fib(0)


    TC: O(n)  EARLIER this was O(2^n), since now we can get repeated values in O(1) due to cache
    SC: O(n) 
*/

let cache = new Map();

function Nth_Fibonacci_Memoisation(n: number): number {
    if(cache.has(n)) return cache.get(n);

    if(n === 1) return 0;
    if(n === 2) return 1;
    
    
    let result: number;
    result = Nth_Fibonacci_Memoisation(n-1) + Nth_Fibonacci_Memoisation(n-2);

    cache.set(n, result);

    return result;
}

let n: number = 3; // 0, 1, 1, 2, 3, 5, 8
console.warn(Nth_Fibonacci_Memoisation(n));

