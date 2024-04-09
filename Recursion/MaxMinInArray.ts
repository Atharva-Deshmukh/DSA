/*   Find Minimum and Maximum elements of array

Input: arr = {1, 4, 3, -5, -4, 8, 6};    Output: min = -5, max = 8

Input: arr = {1, 4, 45, 6, 10, -8};      Output: min = -8, max = 45

Iterative: 

Way 1: Sorting
TC: O(nlogn)
SC: O(1) 

Way 2: Single iteration over each element and compare with INT_MAX (Number.MAX_SAFE_INTEGER in js) and 
INT_MIN (Number.MIN_SAFE_INTEGER in js)
TC: O(n)
SC: O(1) 
*/

function MaxMin_it(a: number[]): number[] {
    if(a.length === 0) return [];
    if(a.length === 1) return [a[0], a[0]];
  
    let max = a[0];   let min = a[0];
  
    a.forEach((element) => {
      if (element >= max) {
        max = element;
      }
      if (element <= min) {
        min = element;
      }
    });
    return [min, max];
  }
 
 /* Recursive: go inside till u remain with one element, after that keep going to the parent and compare the 
 a[0] with returned array
 
   f([1,4,5,2], 1, 1)      --> return [1,5]
            \
    f([4,5,2], 1, 1)       --> return [2,5]
              \
        f([5,2], 1, 1)     --> return [2,5]
                \
            f([2], 1, 1)   --> return [2,2]

    TC: O(n)
    SC: O(n) 
 */

    function MaxMin_rec(a: number[]): number[] {
      if (a.length === 0) return [];
      if (a.length === 1) return [a[0], a[0]];

      let [min, max] = MaxMin_rec(a.slice(1));

      if (a[0] >= max) max = a[0];
      if (a[0] <= min) min = a[0];
      return [min, max];
    }

    let arr: number[] = [1, 2, 3, -1, 4];
    console.warn(MaxMin_rec(arr));

