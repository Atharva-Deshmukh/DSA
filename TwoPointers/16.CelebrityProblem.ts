/* The Celebrity Problem

A celebrity is a person who is known to all but does not know anyone at a party. 
A party is being organized by some people. A square matrix mat[][] of size n*n is used to represent 
people at the party such that if an element of row i and column j is set to 1 it means ith person knows 
jth person. You need to return the index of the celebrity in the party, if the celebrity does not exist, 
return -1.

Note: Follow 0-based indexing.

Input: mat[][] = [
                    [1, 1, 0],
                    [0, 1, 0],                             Output: 1
                    [0, 1, 1]
                 ]

                                                BRUTE FORCE
                                                -----------
                                                
Criteria for being a celebrity:
-------------------------------
- Everybody knows the celebrity (including myself) --> Hence row of this person should have only one 1 (itself)
- Celebrity knows nobody                           --> column of this person should have all 1s


Lets iterate this matrix:
Input: mat[][] = [
                    P0, P1, P2
                    ---------> I know
                P0   [1, 1, 0],   |
                P1   [0, 1, 0],   |
                P2   [0, 1, 1]    |
                                  v
                              Knows me
                 ]
         
For each a[i][j] -> Iterate full ith row and jth column
                    check if condition for candidate is satisfied

TC: O(n * n) * (n + n)  -> O(n^3)
SC: O(1)

There is one observation here:
    Minimum celebrities we can have = 0
    Maximum Celebrities we can have = 1 because celebrity must not know anyone as per definition, and 
                                        if there are > 1 celebrities, then this definition fails



                                              OPTIMAL APPROACH
                                              ----------------

We are eliminating people who definitely cannot be celebrities until only one candidate remains.

A celebrity, if present, must be somewhere in [0 ... n - 1].
Hence, initialize two pointers:
                                top = 0
                                bottom = n - 1

                                      0  1  2  3
                           top ->  0 [1, 1, 1, 0]
                                   1 [0, 1, 0, 0]
                                   2 [0, 1, 1, 0]
                        bottom ->  3 [1, 1, 0, 1]

Step 1:
    Check mat[top][bottom] = mat[0][3] = 0 --> Person 0 does NOT know Person 3.
                                               Person 3 CANNOT be a celebrity because everybody must know the celebrity.
    Hence, eliminate Person 3: bottom--

                           top ->   [1, 1, 1, 0]
                                    [0, 1, 0, 0]
                        bottom ->   [0, 1, 1, 0]
                                    [1, 1, 0, 1]

Step 2:
    Check mat[top][bottom] = mat[0][2] = 1 --> Person 0 knows Person 2.
                                               Person 0 CANNOT be a celebrity because a celebrity does not know anyone (except themselves).
    Hence, eliminate Person 0: top++


                                    [1, 1, 1, 0]
                           top ->   [0, 1, 0, 0]
                        bottom ->   [0, 1, 1, 0]
                                    [1, 1, 0, 1]

                
Step 3:
    Check mat[top][bottom] = mat[1][2] = 0 --> Person 1 does NOT know Person 2. 
                                               Person 2 CANNOT be a celebrity because everybody must know the celebrity.
    Hence, eliminate Person 2: bottom--


                                    [1, 1, 1, 0]
                       top,bottom ->[0, 1, 0, 0]
                                    [0, 1, 1, 0]
                                    [1, 1, 0, 1]


    Now: top == bottom == 1

    Therefore, Person 1 is the ONLY POSSIBLE celebrity.

    NOTE:  Being the only remaining candidate does NOT guarantee that Person 1 is actually a celebrity.
           We must verify the candidate.
           - Check the candidate's row --> mat[1][j] == 0 for every j != 1
           - Check the candidate's column --> mat[i][1] == 1 for every i != 1

TC: O(n) (Elimination phase = O(n) + Verification = O(n))
SC: O(1)
*/

class Solution {
    celebrity(m) {
        const rows = m.length;
        const cols = m[0].length;

        let top = 0;
        let bottom = (rows - 1);

        while(top < bottom) {
            if(m[top][bottom] === 0) bottom--;
            else top++;
        }

        if(top > bottom) return -1;

        /* If we reach here, it means Top === bottom */
        
        /* Verify Row */
        for(let j = 0; j < cols; j++) {
            if((top != j) && (m[top][j] === 1)) return -1; /* only one 1 should be there in row */
        }
        
        /* Verify Col */
        for(let i = 0; i < rows; i++) {
            if(m[i][top] === 0) return -1;               /* All elements should be 1 in this col*/
        }
        
        return top;
    }
}