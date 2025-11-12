/* Fibonacci series till N 

Input: n = 3   Output: 0, 1, 1
Input: n = 7   Output: 0, 1, 1, 2, 3, 5, 8

Iterative way */
function fibonacciSeriesTillN_Iterative(n: number): void {
    let f0: number = 0;
    let f1: number = 1;
    let ans: number[] = [0, 1];

    if(n === 1) {
        console.log([0]);
        return;
    }
    if(n === 2) {
        console.log([0, 1]);
        return;
    }

    for(let i = 3; i <= n; i++) {
        let fi: number = f0 + f1;
        ans.push(fi);

        f0 = f1;
        f1 = fi;
    }

    console.log(ans);
}

/* Generate Fibonacci series - Leetcode using Genrators 

  Generators are a special kind of function that can stop, and then continue from where it stopped, 
  using this kind of function you can make a function that implements an iterative algorithm only 
  by writing just one function which doesn't have to run its course at a go. They are defined by 
  a function with an * in it and make use of the keyword yield in order to generate a set of numbers.

 const gen = fibGenerator();
 gen.next().value; // 0
 gen.next().value; // 1
*/
function* fibGenerator(): Generator<number, any, number> {
    let f0: number = 0;
    let f1: number = 1;

    while(true) {
        yield f0;
        [f0, f1] = [f1, f0 + f1];
    }
};

/* Fibonacci series recursively
   We used recursion only to get Nth fibonacci number
*/
function fibonacciSeriesTillN_Recursive(n: number): number[] {

    let ans: number[] = [];

    function nthFibRecursive(n: number): number {

        if (n <= 1) return n;
        else return nthFibRecursive(n - 1) + nthFibRecursive(n - 2);
    }

    let i: number = 0;
    while(i < n) {
        ans.push(nthFibRecursive(i));
        i++;
    }

    return ans;
}

function nthFibonacciNumber_Iterative(n: number): number {
    if(n === 0) return -1;
    if((n === 1) || (n === 2)) return (n - 1);

    let f0: number = 0;
    let f1: number = 1;
    
    for(let i = 3; i <= n; i++) {
        [f0, f1] = [f1, (f0 + f1)];   /* Using JS destructuring */
    }

    return f1;
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
function nthFibonacciNumber_Recursive(n: number): number {
    if(n === 0) return -1;
    if((n === 1) || (n === 2)) return (n-1);
    else return nthFibonacciNumber_Recursive(n-1) + nthFibonacciNumber_Recursive(n-2);
}

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


