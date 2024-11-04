/*  A query-based problem

Input : Query 1 : L = 1, R = 10  Query 2 : L = 5, R = 10
Output : 4 2

Explanation: Primes in the range L = 1 to R = 10 are 
{2, 3, 5, 7}. Therefore for query, answer 
is 4 {2, 3, 5, 7}.

For the second query, answer is 2 {5, 7}.

Way 1: Brute force
- iterate from L -- R and check if n is prime

TC: O(Queries * (R-L+1) * sqrt(n))  -->  its like (something) ^ cube
SC: O(1)

Way 2: use Sieve to optimise sqrt(n)
- create sieve for R (maximum of all Rs), can be 10^6 as per GFG question

TC: O(Queries * (R-L+1))   its like (something) ^ square
SC: O(R) OR O(10^6)  R is the max right limit in the question

Way 3: use prefix sum for further Optimisation
- It is not possible to OPTIMISE queries as we WILL need to iterate EVERY Query
- in the question, we need to return the count(prime nos) between [L-R], prefix sum can be used because 
  count = addition of 1s
  let sieve = [1,0,1,1,0]
  let prefs = [1,1,2,3,3]
- use prefix sum to store the count so that we can return count of primesTill R in O(1)
- for each query range, no. of primes [L-R] = prefixSum[R] - prefixSum[L-1]

TC: O(10^6*log(log(n))) for sieve +  O(10^6) for prefix sum + O(no.of queries)
SC: O(R) OR O(10^6)  for Sieve */

// I am implementing this function for without query, directly for L-R
function primesInRange(L: number, R: number): number {
    let sieve: number[] = Array(R+1).fill(1);
    let prefixSum: number[] = Array(R+1).fill(0);
    
    for(let i = 2; i <= Math.sqrt(R); i++) {
        if(sieve[i] === 1) {
            for(let j = i * i; j <= R; j+=i) sieve[j] = 0; 
        }
    }

    for(let i = 1; i < sieve.length; i++) {
        prefixSum[i] = prefixSum[i-1] + sieve[i];
    }

    return (prefixSum[R - 1] - prefixSum[L - 1]);
}