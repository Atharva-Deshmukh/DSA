/*   Program for factorial of a number

Factorial of a non-negative integer is the multiplication of all positive integers 
smaller than or equal to n. For example factorial of 6 is 6*5*4*3*2*1 which is 720. 

Iterative: 

TC: O(n)
SC: O(1) 
*/

function Factorial_it(n: number): number {
    if(n === 0) return 1;

    let fact = 1;
    while(n > 1) {
        fact = fact * n;
        n--;
    }

    return fact;
}
 
 /* Recursive:
 
   f(3)        --> return 6
     \
   3 * f(2)    --> return 6
        \
    2 * f(1)   --> return 2 * 1 = 2
  

    TC: O(n)
    SC: O(n) 
 */

function Factorial_rec(n: number): number {
    if(n === 0 || n === 1) return 1;
    return n * Factorial_rec(n-1);
}

    let n: number = 5;
    console.warn(Factorial_rec(5));

