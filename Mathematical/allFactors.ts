/* 
Input : n = 10       Output: 1 2 5 10

Input:  n = 100      Output: 1 2 4 5 10 20 25 50 100

Logic:
- loop for(i to n) and check if(n%i === 0)

TC: O(n)
SC: O(1)

A better solution:
- NOTE THAT the factors of a number exist in PAIRS, in n = 100, ex: we can do 10*10 to get the pair
- So, instead of looping till N, if we loop till sqrt(n), we will get the remaining divisors as well
- IMP: if n is prime, then it has two factors only, 1 and n itself
- IMP: if n is a perfect square: it will have a repeating factor, which is sqrt * sqrt
       else it will have distince factors in pairs

TC: O(sqrt(n)) 
SC: O(1)

- BUT here, the output is not in a sorted order, it will be zig-zag:
- Input:  n = 10      Output: 1 10 2 5
- Input:  n = 100      Output: 1 100 2 50 4 25 5 20 10 10

way 1: 
- We can store the odd indices in a separate array and then print them after even indices in reverse order

TC: O(sqrt(n)) 
SC: O(sqrt(n))

Way 2: 
- the storage space can be optimised to O(1)
- iterate two times from 1 to sqrt(n)
- in first iteration, print the numbers who gave remainder 0
- in the second iteration, go in reverse order and print the quotient of the number who gave remainder 0

TC: O(sqrt(n)) + O(sqrt(n)) = O(sqrt(n))
SC: O(1)
*/

function isPrime(n) {
    if (n <= 1) return false; 
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function allFactors(n: number): void {
    if(isPrime(n)) console.log(1, n);
    else {
     for(let i = 1; i <= (Math.floor(Math.sqrt(n))); i++) {
         if(n % i === 0) console.log(i);
     }
     // now print in reverse order
     for(let i = (Math.floor(Math.sqrt(n))); i >= 1; i--) {
 
         // when the no. is a perfect square, the sqrt(n) gets repeated in the factor,
         // now its already printed in the above loop, so no need to print that again
         if(i !== (Math.floor(Math.sqrt(n)))) {
             if(n % i === 0) console.log(Math.floor(n/i))
         }
     }
    }
 }





  
