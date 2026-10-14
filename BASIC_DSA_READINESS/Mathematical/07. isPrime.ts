/* Check if a number is prime

Way 1:
- iterate from 2 to n and check if(num % i === 0)
- we will loop it from 2 to n since we know that 0 and 1 are not prime
- So, we are checking if any of the FACTORS of n exists between 2 and n 

TC: O(n) 
SC: O(1)


Way 2:
- Observe that the factors of n exists in pair ALWAYS

  Ex: 100 --> 1, 2, 4, 5, 10, 20, 25, 50, 100
                           |
            If we check till 10, then 20, 25... don't need to be checked as only pairs will be factors
            no other number after 10, hence go till sqrt(n)

- so rather than checking from [2,n], check only till sqrt(n)
- Recall that a perfect square has a duplicate factor pair, (10,10) in case of 100  

TC: O(sqrt(n)) 
SC: O(1)  */

function isPrime(n: number): boolean {
    if(n <= 1) return false;
    for(let i = 2; i <= Math.sqrt(n); i++) {
        if(n % i === 0) return false;
    }
    return true;
}