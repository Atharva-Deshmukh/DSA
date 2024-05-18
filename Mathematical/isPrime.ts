/* Check if a number is prime

Way 1:
- iterate from 2 to n and check if(num % i === 0)
- So, we are checking if any of the FACTORS of n exists between 2 and n 

TC: O(n) SC: O(1)


Way 2:
- Observe that the factors of n exists in pair ALWAYS
- so rather than checking from [2,n], check only till sqrt(n)
- Recall that a perfect square has a duplicate factor pair, (10,10) in case of 100  

TC: O(sqrt(n)) SC: O(1)  */

function isPrime(n: number): boolean {
    if(n <= 1) return false;
    for(let i = 2; i <= Math.sqrt(n); i++) {
        if(n % i === 0) return false;
    }
    return true;
}