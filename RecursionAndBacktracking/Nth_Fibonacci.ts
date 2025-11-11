/*  

Input: n = 3   Output: 1  (0, 1, 1)

Input: n = 7   Output: 8  (0, 1, 1, 2, 3, 5, 8)

Iterative: Simply add prev 2 terms and keep logging


TC: O(n)
SC: O(1) 
*/


// if series is considered from 1 -> 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, , use >= 2
// else use > 2 in while
function Nth_Fibonacci_it(n: number): number {
    if(n <= 1) return n;
    if(n === 2) return 1;

    let ans: number = 0; let f1: number = 0; let f2: number = 1;

    while(n >= 2) {
        ans = f1 + f2;
        f1 = f2;
        f2 = ans;
        n--;
    }

    return ans;
 }
 
 /* Recursive WAY 1

                            fib(4)
                            /     \
                    fib(3)         fib(2)
                   /     \        /      \
              fib(2)   fib(1)  fib(1)  fib(0)
             /     \
       fib(1)   fib(0)


    TC: O(2^n)
    SC: O(n) 
    
    To calculate F(4),  you first calculate F(3) and F(2). To compute F(3), you again calculate 
    F(2) and F(1). Notice the redundancy? F(2) is being calculated twice. Such duplicated effort 
    multiplies as 'n' grows, leading to this staggering time complexity.
 */
    function Nth_Fibonacci_rec(n: number): number {
      if (n <= 1) return n;
      if (n === 2) return 1;

      return Nth_Fibonacci_rec(n - 1) + Nth_Fibonacci_rec(n - 2);
    }

    let n: number = 10;
    console.warn(Nth_Fibonacci_rec(n));

    /* Recursive    WAY 2             if series --> 1,1,2,3,5,8,13,21,34,55,89

    f(5, 0, 1)             
          \
       f(4, 1, 1)          
            \
        f(3, 1, 2)         
              \
            f(2, 2, 3)     
                \
                f(1, 3, 5) 
                  \
                  f(0, 5, 8)    --> 5 and keeps this returning to parent

    TC: O(n)
    SC: O(n)
*/
    function N_Fibonacci_REV_rec(n: number, f1: number, f2: number): number {
      if (n === 0) {
        return f1;
      }

      return N_Fibonacci_REV_rec(n - 1, f2, f1 + f2);
    }

    let n1: number = 5;
    console.warn(N_Fibonacci_REV_rec(n1, 0, 1));

    /* Recursive    WAY 3             if series --> 0, 1,1,2,3,5,8,13,21,34,55,89

    f(5, 0, 1)             
          \
       f(4, 1, 1)          
            \
        f(3, 1, 2)         
              \
            f(2, 2, 3)     
                \
                f(1, 3, 5)  --> 3 and keeps this returning to parent
     

    TC: O(n)
    SC: O(n)
*/
function N_Fibonacci_REV_rec(n: number, f1: number, f2: number): number {
   if (n === 1) {
     return f1;
   }

   return N_Fibonacci_REV_rec(n - 1, f2, f1 + f2);
 }


