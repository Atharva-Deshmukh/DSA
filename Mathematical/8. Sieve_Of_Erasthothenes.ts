/* The sieve of Eratosthenes is one of the most efficient ways to find all primes smaller than n when 
n is smaller than 10 million or so.

Input: n = 10   Output: 2 3 5 7 
Input: n = 20   Output: 2 3 5 7 11 13 17 19

Way 1: Brute force
- iterate from 2 to n and check if every i is prime or not

TC: O(n * sqrt(n))   for every number , we need n and for isPrime(i), sqrt(n)
SC: O(1)

- if n = 10^5, then this will be costly
- our target is to somewhere change the prime check (O(sqrt(n))) to O(1)

Way 2: Sieve
- create Array(n+1) filled with 1 so that the Array is from i = 0 --- n
- we will loop it from 2 to n since we know that 0 and 1 are not prime

Dry run:
- let n = 15, 
    s = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1,  1,  1,  1,  1,] 
         0  1  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
- for i = 2, mark all its multiples as 0 except 2 itself
    s = [1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0,  1,  0,  1,  0,  1,] 
         0  1  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15

- similarly, for i = 3, mark all its multiples as 0 except 3 itself 
    s = [1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0,  1,  0,  1,  0,  0,] 
         0  1  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15

- similarly, for i = 4, all multiples are already marked as 0
    s = [1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0,  1,  0,  1,  0,  0,] 
         0  1  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15

- we are left only with primes as 1 value in array (from index 2 onwards) => 2,3,5,7,11,13 

                            Pseudo Code (BEFORE OPTIMISATION)

                            prefillSieve()
                            for(i = 2 --- N) {
                                if(sieve[i] === 1) {
                                    for(j = 2 * i; j < N; j+=i) sieve[j] = 0; // mark the multiples of i as 0
                                }
                            }
                            
                            OPTIMISATION-1: 

    - In the for loop we are iterating from 2 * i to n everytime although we don't need it
      2*2 = 4    3*2 = 6     4*2 = 8
      2*3 = 6    3*3 = 9     4*3 = 12
      2*4 = 8    3*4 = 12    4*4 = 16
      2*5 = 10   3*5 = 15    4*5 = 20

      for 3, 3*2 is already calculated during 2's computation
      for 4, 4*2, 4*3 is already calculated during 2's and 3's computation

      so start with i*i directly, since i*(i` < i) are already covered in previous iteration
                                
                            prefillSieve()
                            for(i = 2 --- N) {
                                if(sieve[i] === 1) {
                                    for(j = i * i; j < N; j+=i) sieve[j] = 0; 
                                }
                            }
    
                            OPTIMISATION-2:

    - for i = 5, 5*5 = 25 = j > input itself!
    - so outer for loop don't need to go till n, it can be till sqrt(n), inner loop will mark the remaining.

                            prefillSieve()
                            for(i = 2 --- sqrt(n)) {
                                if(sieve[i] === 1) {
                                    for(j = i * i; j < N; j+=i) sieve[j] = 0;
                                }
                            }


TC: O(n * log(log(n)))  //Mathematically proven, Reason: Prime Harmonic Series
SC: O(n) for maintaining sieve */

function primeTillN(n: number): void {
    let sieve: number[] = Array(n+1).fill(1);

    // mark the sieve
    for(let i = 2; i <= Math.sqrt(n); i++) {
        if(sieve[i] === 1) {
            for(let j = i * i; j <= n; j+=i) sieve[j] = 0; 
        }
    }

    // return the primes < n
    for (let index = 2; index <= sieve.length; index++) {
        if (sieve[index] === 1) {
            console.log(index);
        }
    }
}