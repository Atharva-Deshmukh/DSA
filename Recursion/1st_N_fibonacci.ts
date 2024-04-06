/*  
Input: n = 3   Output: 0, 1, 1

Input: n = 7   Output: 0, 1, 1, 2, 3, 5, 8

Iterative: Simply add prev 2 terms and keep logging


TC: O(n)
SC: O(1) 
*/

function firstNFibonacci_it(n: number): number[] {
    if(n <= 1) return [0];
    if(n === 2) return [0, 1];

    let ans = [0,1];

    for(let i = 2; i < n; i++) {
        let next: number = ans[i-2] + ans[i-1];
        ans.push(next);
    }

    return ans;
 }
 
 /* Recursive

                            fib(4)
                            /     \
                    fib(3)         fib(2)
                   /     \        /      \
              fib(2)   fib(1)  fib(1)  fib(0)
             /     \
       fib(1)   fib(0)


    TC: O(n)
    SC: O(n) 
 */
    function firstNFibonacci_rec(n: number): number {
        if(n <= 1) return n;
        return firstNFibonacci_rec(n - 1) + firstNFibonacci_rec(n - 2);
    }
 
 
 let n: number = 5;
 for (let i = 0; i < n; i++) {
    console.warn(firstNFibonacci_rec(i)) + " ";
}
