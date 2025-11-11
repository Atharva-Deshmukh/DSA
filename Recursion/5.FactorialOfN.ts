function factorial_ParameterisedRecursion(n: number, fact: number): void {   

    if(n < 1) {
        console.log(fact);
        return;
    }
    
    factorial_ParameterisedRecursion(n - 1, (fact * n));
}

factorial_ParameterisedRecursion(3, 1);
factorial_ParameterisedRecursion(5, 1);

/* TREE

                F(3, 1)
                   \ 
                  F(2, 3)
                     \ 
                    F(1, 6)
                       \ 
                      F(0, 6)

 */


function factorial_FunctionalRecursion(n: number): number {   
    if(n < 1) return 1;
    else return n * factorial_FunctionalRecursion(n - 1);
}

console.log(factorial_FunctionalRecursion(3));
console.log(factorial_FunctionalRecursion(5));

/* TREE

        F(3) = 3 * F(2)
                    2 * F(1)
                         1 * F(0)

        Putting all these values in F(3)

        F(3) = 3 * 2 * 1 * F(0)
             = 3 * 2 * 1 * 1 
             = 6

 */





