/* I am covering 2 problems together
- query wise prime factorisation (school way to get Prime factors)
- Prime factorisation using SPF (Smallest Prime Factor)

let query = [12, 16, 60]
12 --> 2 2 3                 spf = 2 
15 --> 3 5                   spf = 3
16 --> 2 2 2 2               spf = 2
60 --> 2 2 3 5               spf = 2

so this query based question can be solved using earlier solved primeFactors question, 
but there I calculated unique prime factors, here we need all prime factors (including duplicates)

Logic is same as primeFactors.ts with just a slight change since we need to include all prime 
factors

function allPrimeFactors(n: number): Set<number> {
    //DONT USE SET, USE ARRAY
    let primeFactors: number[] = [];

    // since after 2, when i += 2, we skip 3, so do a while loop for 2 beforehand
    if(n % 2 === 0) {
        ans.add(2);
        while(n % 2 === 0) n = Math.floor(n/2);
    }

    for(let i = 3; i <= Math.floor(Math.sqrt(n)); i += 2) {
        if(n % i === 0) {
            while(n % i === 0) {
                ans.add(i);                //CHANGE HERE SINCE WE NEED ALL OCCURRENCES
                n = Math.floor(n/i);
            } 
        } 
    }

    // case: if n itself is a prime number
    if(n > 2) ans.add(n);

    return ans;
}

TC: O(no.of.queries * sqrt(n))

OPTIMISATIONS: 
- for each query, we always need to loop till sqrt(n)
- this loop can be prevented for maximum case provided we have some precomputations of prime factors of number
- say for 20 -> loop from 2 to sqrt(20) we can just have some function SPF(20) which will give smallest prime factor
  for input
  So, 
  SPF(20) = 2   now 20/2 = 10
  SPF(10) = 2   now 10/2 = 5
  SPF(5) = 5    now 5/5 = 1            this iterations take max O(logN) which happens when a number is power of 2
                                       for power of 2, we need max iterations since every time I need to divide by 2
STOP AT 1

FILLING SPF[] using sieve way takes O(n*log(logn))


  SEE!!, we got prime factorisations faster since SPF(n) = O(1) as its precomputed

  LOGIC: 
  - Precompute spf[] using sieve like method. Let n = 10, where index = element in the array
  - if spf[i] === i, then its a prime, keep this point in mind while iteration
  - let spf[n+1] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    0  1  2  3  4  5  6  7  8  9  10
  - Iterate spf[] fully start from 2 since we know all prime thing starts from 2
    override multiples of 2 with 2, start from 2 * 2 as discussed in primeFactors question
    
    [0, 1, 2, 3, 2, 5, 2, 7, 2, 9, 2]
     0  1  2  3  4  5  6  7  8  9  10

  - now go to 3 & override multiples of 3 with 3 ONLY IF THERE IS NO 2, since 2 is smaller than 3 and spf[i] = smallest
    prime number till i. start from 3 * 3
    
    [0, 1, 2, 3, 2, 5, 2, 7, 2, 3, 2]
     0  1  2  3  4  5  6  7  8  9  10

     TC for spf[] = O(10^5) max since we precompute for max integers
     in JS -> Number.MAX_SAFE_INTEGER = (Math.pow(2, 53) - 1), I will just go for 10^5 to keep sync with gfg 

AFTER SPF[] PRECOMPUTATION, now we need to get prime factorisation query-wise
- iterate each query
- for each query, get the SPF(n) and store this spf factor in the ans[], now divide n by this factor
- repeat this till n becomes 1

Overall TC: filling spf using sieve + query iteration and division  n = 10^5, max integer as per question
            O(n * log(log n)) + O(no.of.queries * log(n))
        SC: O(n) for storing sieve spf[]
*/

let SPF = Array(Math.pow(10,5) + 1);  //size n + 1
// ACTUALLY, THIS ARRAY CAN BE OF SIZE (N+1), no need for 10^5

let n: number = 20;
let query: number[] = [12, 16, 60];

function fillSPF() {
    for(let i = 0; i < SPF.length; i++) SPF[i] = i;

    for(let i = 2; i < SPF.length; i++) {
        //if its untouched, then only override the multiples also, override such that smallest override is there in the array
        if(SPF[i] === i) {
            for(let j = i * i;j < SPF.length; j += i) {
                if(i <= SPF[j]) SPF[j] = i;
            }
        }
    }
}

function allPrimeFactors(n : number): number[] {
    let primeFactors: number[] = [];

    while(n != 1) {
        let factor = SPF[n];
        primeFactors.push(factor);
        n = n / factor;
    }

    return primeFactors;
}

query.forEach((q) => {
    allPrimeFactors(q);
});

