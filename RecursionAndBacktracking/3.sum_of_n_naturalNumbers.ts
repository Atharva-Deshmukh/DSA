/* Thinking:
   - Go down and down, keep adding the sum and passing it down
   - In the last, return it

*/

function parameterisedRecursion_Sum(n: number, sum: number): void {

    if(n < 1) {
        console.log(sum);
        return;
    }
    
    parameterisedRecursion_Sum(n - 1, sum + n);
}

parameterisedRecursion_Sum(3, 0);
parameterisedRecursion_Sum(5, 0);

/* TREE

    F(3, 0)
        \
       F(2, 3)
          \
         F(1, 5)
            \
           F(0, 6)

 */

function functionalRecursion_Sum(n: number): number {   
    if(n < 1) return 0;
    return n + functionalRecursion_Sum(n-1);
}

console.log(functionalRecursion_Sum(3));
console.log(functionalRecursion_Sum(5));

/* TREE

        F(3) = 3 + F(2)
                    2 + F(1) 
                         1 + F(0)

        F(2) = 2 + F(1)
        F(1) = 1 + F(0)
        Putting these values in F(3)

        F(3) = 3 + 2 + 1 + F(0)
             = 3 + 2 + 1 + 0

 */