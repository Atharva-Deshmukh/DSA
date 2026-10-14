/* What are permutations and combinations

Permutation is ARRANGING items considering order of selection from a certain group.
Combination is SELECTING items without considering order.
Ex: PQ and QP are different in permutation but same in combination. 
    Therefore we have more permutations than combinations.

*/

/*

                                                    Permutations:
                                --------------------------------------------------------

    nPr (also called permutation coefficient) = n! / (n - r)!

    nPr =  when ‘r’ components are positioned out of a total of ‘n’

    Ex: let n = 3 (A, B, and C) and r = 2 (All permutations of size 2). 
    Then there are 3P2 such permutations, which is equal to 6. 
    These six permutations are AB, AC, BA, BC, CA, and CB.

                                    How to calculate permutation coefficient?
                              --------------------------------------------------------

Way-1: Brute force
- Simply get n! and (n-r)! factorial and divide them.
- Problem is, there are recomputations while calculating both

Way-2: Tabulation (Bottom Up Approach)
- Maintain a fact[] table of size n, where fact[n] = n!.
- This way, we can precompute everything once.

TC: O(n) iteration for dp[]
SC: O(n) dp[]

Way-3: O(1) Approach using a little observation

         (n)!     (n * (n - 1) * (n - 2) * ... (n - r + 1) * (n - r)!)    
npr =   -----  =                                                       = (n * (n - 1) * (n - 2) * ... (n - r + 1))
        (n-r)!    (n - r)!
 
TC: O(n) iteration for calculating above expression
SC: O(1) */

function permutationUsingTabulation(n: number, r: number) {
    let fact = Array(n + 1);
    fact[0] = 1;  // 0! = 1

    for(let i = 1; i <= n; i++) fact[i] = (i * fact[i - 1]);

    return Math.floor(fact[n]/fact[n - r]);
}

function permutationConstTime(n: number, r: number) {
    let npr: number = 1;
    
    for(let i = (n - r + 1); i <= n; i++) {
        npr *= (i);
    }

    return npr;
}

/*

                                                    Combinations:
                                --------------------------------------------------------


    Combination is a way of choosing items from a set, (unlike permutations) when the order of 
    selection doesn’t matter. 
    
    Combination refers to the mixture of n things taken k at a time without repetition.

    nCr (also called binomial coefficient) =         (n)!            (npr)
                                                 ------------   =  ---------
                                                (r)! * (n - r)!       (r)!

    nCr =  The number of combinations when ‘r’ elements are selected out of a complete set of ‘n’ elements

    Example:  For set S = {a, b, c},  the possible combinations of choosing 2 elements are, 
    {a, b}, {a, c}, {b, c}.  If we choose 3 items, then there is only one combination {a, b, c} 
    which is we pick all three.


    Some Observations:
    - ncr = nc(n - r)
      ex: 4c0 = 4c4
          3c1 = 3c2

    - The pascal's triangle can be constructed from the binomial coefficients itself

                                        1                 1c0
                                       1 1              2c0 2c1
                                      1 2 1            3c0 3c1 3c2
                                     1 3 3 1         4c0 4c1 4c2 4c3
                                    1 4 6 4 1      5c0 5c1 5c2 5c3 5c4




                                    How to calculate binomial coefficient?
                              --------------------------------------------------------

Way-1: Brute force
- Simply compute as per the formula
- Problem is, there are recomputations while calculating both

Way-2: Tabulation (Bottom Up Approach)
- Maintain a fact[] table of size n, where fact[n] = n!.
- This way, we can precompute everything once.

TC: O(n) iteration for dp[]
SC: O(n) dp[]

Way-3: O(k) space approach

                                        1                  1
                                       1 1              1c0 1c1
                                      1 2 1            2c0 2c1 2c2
                                     1 3 3 1         3c0 3c1 3c2 3c3
                                    1 4 6 4 1      4c0 4c1 4c2 4c3 4c4

- Take help of pascal's triangle.
- 4c2 = 4 -> 4th row 1st element

                                    1             
                                    1 1             
                                    1 2 1        
                                    1 3 3 1     
                                    1 4 6 4 1     

- rearrange pascals triangle and assume 0s ahead
- first element of every row = 1
- if asked to compute 4c3, we will compute 4c1 since they are same
  so if(r > (n - r)) r = n - r, 

                        compute till r only, no need to compute ahead of r
                                    1 0|            
                                    1 1| 0            
                                    1 2| 1 0        
                                    1 3| 3 1 0    
                                    1 4| 6 4 1 0   --> 4C wali series hai 5th row me
 
we will use dp[] of size (r+1) and use this array to compure nth row and rth coefficient
 
to get 4c3, get 4c1 since they are same and it saves computations so dp[] size = 2

initialise dp[0] = 1 since first element is always 1 of every row and rest elements = 0
dp = [1, 0]  --> this simulates row1

iterate till (n + 1) th row since we started 1c0 from row2 onwards

row1: [1, 0]

row2: use row1's dp to get row2's dp[]
      iterate dp[] from end
      in row2, dp[1] = (dp[1] + dp[0]) in row1's dp[] => 0 + 1 = 1

row3: use row2's dp to get row3's dp[]
      in row3, dp[1] = (dp[1] + dp[0]) in row2's dp[] => 1 + 1 = 2

row4: use row3's dp to get row4's dp[]
      in row4, dp[1] = (dp[1] + dp[0]) in row3's dp[] => 1 + 2 = 3

row5: use row4's dp to get row5's dp[]
      in row5, dp[1] = (dp[1] + dp[0]) in row4's dp[] => 1 + 3 = 4

dp[] = [1, 4], return last elment of dp[]

TC: O(n * k) iterating dp[] for n row
SC: O(k) */

function ncr(n, r) {
    const mod = 1e9 + 7;

    // Corner case
    if (n < r) return 0;

    // Optimize by calculating the smaller value
    if ((n - r) < r) r = n - r;

    const dpLen = r + 1;
    const dp = Array(dpLen).fill(0);
    dp[0] = 1; // First element of each row in Pascal's triangle = 1

    for (let row = 2; row <= (n + 1); row++) {
        // Iterate backwards and fill dp[]
        for (let i = dpLen - 1; i >= 0; i--) {
            if (i - 1 >= 0) {
                dp[i] = (dp[i] + dp[i - 1]) % mod;
            }
        }
    }

    return dp[dpLen - 1];
}
