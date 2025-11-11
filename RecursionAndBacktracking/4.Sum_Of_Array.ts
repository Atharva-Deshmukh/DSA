function sumOfArray_functionalRecursion(arr: number[]): number {
    // base case
    if(arr.length === 0) return 0;
    else return arr[0] + sumOfArray_functionalRecursion(arr.slice(1));
}

console.log(sumOfArray_functionalRecursion([1, 2, 3]));
console.log(sumOfArray_functionalRecursion([1, 2, 3, 4, 5]));

/* TREE

    F([1, 2, 3]) = 1 + F([2, 3])
                            2 + F([3])
                                   3 + F([])
    
    F([]) = 0
    Putting all these values together we get

    F([1, 2, 3]) = 1 + 2 + 3 + 0 = 6
 */


function sumOfArray_parameterisedRecursion(arr: number[], sum: number): void {

    if(arr.length < 1) {
        console.log(sum);
        return;
    }

    sumOfArray_parameterisedRecursion(arr.slice(1), (sum + arr[0]));
}

sumOfArray_parameterisedRecursion([1, 2, 3], 0);
sumOfArray_parameterisedRecursion([1, 2, 3, 4, 5], 0);

/* TREE

    F(arr.splice(1), sum + arr[0])
                    \
        F(arr.splice(1), sum + arr[0])
                        \
            F(arr.splice(1), sum + arr[0])
 */
