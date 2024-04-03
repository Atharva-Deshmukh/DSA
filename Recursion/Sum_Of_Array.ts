/* Sum of array elements using recursion
Given an array of integers, find sum of array elements using recursion. 

Input : A[] = {1, 2, 3} Output : 6
1 + 2 + 3 = 6

Input : A[] = {15, 12, 13, 10} Output : 50 

f([15, 12, 13, 10])
        \
    15 + f([12, 13, 10]) --> 50 
            \
        12 + f([13, 10])  --> 35
                \
            13 + f([10])  --> 23
*/


function sumOfArray(a: number[]): number {
    if(a.length === 0) return NaN;
    if(a.length === 1) return a[0];

    return a[0] + sumOfArray(a.slice(1));
}

let arr: number[] = [15, 12, 13, 10];

console.warn('sum -> ', sumOfArray(arr));