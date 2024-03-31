/* Mean of array using recursion
 
Input : 1 2 3 4 5  Output : 3           
Input : 1 2 3      Output : 2

using array.slice(1) --> returns a new array except the first element (0th index) without modifying original array

slice() consumes extra memory space due to creation of an additional array, hence u can use index++

function sumRec(arr: number[], index: number): number {
    if(arr.length === 0) return NaN;
    if(arr.length === 1) return arr[0];

    return arr[index] += sumRec(arr, index+1); 
}

sum += sumRec(arr, 0);
*/

/* recursively get the sum

f([1,2,3,4])   --> Ans => 10
      \
    1 + f([2,3,4])   --> returns 10 above
         \
      2 + f([3,4])   --> returns 9 above
            \
         3 + f([4])   --> returns 7 above

*/
function sumRec(arr: number[]): number {
    if(arr.length === 0) return NaN;
    if(arr.length === 1) return arr[0];

    return arr[0] += sumRec(arr.slice(1)); 
}

function mean(arr: number[]): number {
    return sumRec(arr)/arr.length;
}

let a: number[] = [1,2,3,4,5];
console.warn('mean of the array -> ', mean(a));


