/* prime factor is finding which prime numbers multiply together to make the original number.
The prime factors of 15 => 3,5. 

Way 1: 
- Iterate from 1 to N and do if((n % i === 0) && (isPrime(i) === true))

TC: O(N * sqrt(N))
SC: O(1)

Way 2: use School method to get prime factors (vo dabbey wali method)
- loop from 2 to squrt(n), WE CONSIDER 1 to be neither prime nor composite
- keep dividing by 2 till the number becomes odd, 
  by doing so u reduce n such that no multiple of 2 is able to divide it further 
- now since the number is odd, next number in the loop will be even for sure, so i += 2
  to check only for odd since we need prime numbers and 2 is THE ONLY even prime number. 
- keep dividing by the current number in the loop till its exhausted. and do n = n/i
  this reduces n simultaneously and we don't need to loop till sqrt(n)
- CORNER CASE: when the input number is itself prime, say n = 37, now loop is only till sqrt(37),
  so when the loop ends, we are sure that all multiples are exhausted and only any prime number is left
  so add n to the set in the last
- if input n is not a prime number, then by school method, the last number in the dabba is 1

TC: O(sqrt(n))
SC: O(n) //for printing the set
*/

function primeFactors(n: number): Set<number> {
    let ans = new Set<number>(); // to store unique prime factors

    // since after 2, when i += 2, we skip 3, so do a while loop for 2 beforehand
    if(n % 2 === 0) {
        ans.add(2);
        while(n % 2 === 0) n = Math.floor(n/2);
    }

    for(let i = 3; i <= Math.floor(Math.sqrt(n)); i += 2) {
        if(n % i === 0) {
            ans.add(i);
            while(n % i === 0) n = Math.floor(n/i);
        } 
    }

    // case: if n itself is a prime number
    if(n > 2) ans.add(n);

    return ans;
}