/* The Celebrity Problem

A celebrity is a person who is known to all but does not know anyone at a party. 
A party is being organized by some people. A square matrix mat[][] of size n*n is used to represent 
people at the party such that if an element of row i and column j is set to 1 it means ith person knows 
jth person. You need to return the index of the celebrity in the party, if the celebrity does not exist, 
return -1.

Note: Follow 0-based indexing.

Input: mat[][] = [
                    [1, 1, 0],
                    [0, 1, 0],
                    [0, 1, 1]
                 ]
Output: 1

Explanation:
Every person knows themselves, hence a[0][0], a[1][1] and a[2][2] are 1 always.

Now, 0th person knows 1
     1st person knows 1 (obviously)
     2nd person knows 1

     Hence celebrity = 1


                                                BRUTE FORCE
                                                -----------
                                                
Criteria for being a celebrity:
- knowMe = n (including myself)
- iKnow  = 0

So, iterate the whole matrix and maintain these two arrays
iKnow  = []
knowMe = []
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
         
row0: for i = 0, see each j -> thats people who i knows, fill iKnow[]
      see j = 0 now vertically -> thats people who knows i, fill knowMe[]

              0  1  2
    iKnow  = [1, 1, 0]   
    knowMe = [1, 0, 0]    

row1: for i = 1, see each j -> thats people who i knows, fill iKnow[]
      see j = 1 now vertically -> thats people who knows i, fill knowMe[]

              0  1  2
    iKnow  = [1, 2, 0]   
    knowMe = [2, 1, 1]   

row2: for i = 2, see each j -> thats people who i knows, fill iKnow[]
      see j = 2, now vertically -> thats people who knows i, fill knowMe[]

              0  1  2
    iKnow  = [1, 3, 1]   
    knowMe = [2, 1, 2]      


Finally, need to check the condition, where iKnow[i] = n and knowMe[i] = 1, thats our answer
here its index 1

TC: 2 * O(n * n) + 2 * O(n)  -> Iterate matrix and then iterate the arrays
SC: O(2n)

There is one observation here:
Minimum celebrities we can have = 0
Maximum Celebrities we can have = 1 because celebrity must not know anyone as per definition, and 
                                  if there are > 1 celebrities, then this definition fails



                                              OPTIMAL APPROACH
                                              ----------------

                    We know that the celebrity is within 0 - (n - 1)
                    so we initialise two pointers top = 0, and bottom = (n - 1)
                        
                   top ->  [1, 1, 1, 0]
                           [0, 1, 0, 0]
                           [0, 1, 1, 0] 
                bottom ->  [1, 1, 0, 1] 
                
                now top[bottom] = a[0][3] = 0, so 0 can be a celebrity candidate
                    bottom[top] = a[3][0] = 1, so 0 don't know 3 but 3 knows 0 -> 3 is definitely now a celebrity
                                               because he knows 1 person at least

                no need to check i = 3 (bottom) now, so bottom--

                   top ->  [1, 1, 1, 0]
                           [0, 1, 0, 0]
                 bottom -> [0, 1, 1, 0] 
                           [1, 1, 0, 1] 

                now top[bottom] = a[0][2] = 1, so 0 cannot be a celebrity because 0 knows someone
                top++

                           [1, 1, 1, 0]
                    top -> [0, 1, 0, 0]
                 bottom -> [0, 1, 1, 0] 
                           [1, 1, 0, 1] 

                now top[bottom] = a[1][2] = 0, so 1 can be a celebrity candidate
                    bottom[top] = a[2][1] = 1, 2 knows 1 but 1 doesn't know 2

                bottom--;

                            [1, 1, 1, 0]
             top, bottom -> [0, 1, 0, 0]
                            [0, 1, 1, 0] 
                            [1, 1, 0, 1] 

                To confirm if this row is a celebrity, scan the row and if except[i][i], anyone else is 1
                return -1, else return i

TC: O(n)
SC: O(1)
*/

class Solution {
    celebrity(m) {
        
        const rows = m.length;
        const cols = m[0].length;
        
        let top = 0;
        let bottom = (rows - 1);
        
        while(top < bottom) {
            if(m[top][bottom] === 1) top++;
            else if(m[bottom][top] === 1) bottom--;
            else {            // at least someone must know each other, both cannot be 0
                top++;
                bottom--;
            }
        }
        
        if(top > bottom) return -1;
        
        /* Top === bottom */
        for(let j = 0; j < cols; j++) {
            if((top !== j) && (m[top][j] === 1)) return -1;
        }
        
        return top;
        
        
    }
}