/* Leetcode 46. Permutations

Given an array nums of distinct integers, return all the possible permutations. 
You can return the answer in any order.

If you have a set of 'n' distinct items, the number of possible permutations 
(unique arrangements of all elements) is given by = n! = n factorial.

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Input: nums = [0,1]
Output: [[0,1],[1,0]]

Input: nums = [1]
Output: [[1]]

Approach: Swapping during recursion

Bring all elements to first poisition, then second and so on.

                             0  1  2
                            [1, 2, 3]

                                index = 0
                                swap(0, 0) -> swapping indices
  Combinations starting with 1  [1, 2, 3] -> 1 Fixed

                                    index = 1
                                    swap(1, 1)
                                    [1, 2, 3] -> 1, 2 Fixed

                                            index = 2
                                            swap(2, 2)
                                            [1, 2, 3] -> 1, 2, 3 Fixed --> RETURN   

                                    index = 1
                                    swap(1, 2)
                                    [1, 3, 2] -> 1, 3 Fixed

                                            index = 2
                                            swap(2, 2)
                                            [1, 3, 2] -> 1, 3, 2 Fixed --> RETURN   

                                swap(0, 1)
  Combinations starting with 2  [2, 1, 3] -> 2 Fixed

                                    index = 1
                                    swap(1, 1)
                                    [2, 1, 3] -> 2, 1 Fixed

                                            index = 2
                                            swap(2, 2)
                                            [2, 1, 3] -> 2, 1, 3 Fixed --> RETURN   

                                    index = 1
                                    swap(1, 2)
                                    [2, 3, 1] -> 2, 3 Fixed

                                            index = 2
                                            swap(2, 2)
                                            [2, 3, 1] -> 2, 3, 1 Fixed --> RETURN   


                                swap(0, 2)
  Combinations starting with 3  [3, 2, 1] -> 3 Fixed

                                    index = 1
                                    swap(1, 1)
                                    [3, 2, 1] -> 3, 2 Fixed

                                            index = 2
                                            swap(2, 2)
                                            [3, 2, 1] -> 3, 2, 1 Fixed --> RETURN   
    
                                    index = 1
                                    swap(1, 2)
                                    [3, 1, 2] -> 3, 1 Fixed

                                            index = 2
                                            swap(2, 2)
                                            [3, 1, 2] -> 3, 1, 2 Fixed --> RETURN  
*/
function permutations(arr: number[]): number[][] {

    const n: number = arr.length;
    let output: number[][] = [];

    function recurse(arr: number[], index: number): void {
        
        if(index === n) {
            output.push([...arr]);
            return;
        } 

        for(let currentIndex = index; currentIndex < n; currentIndex++) {
            [arr[index], arr[currentIndex]] = [arr[currentIndex], arr[index]];
            recurse(arr, index + 1);

            /* Because you're modifying the array in-place, and without restoring the previous state 
            after recursion, it carries over wrong values to future calls. */
            [arr[index], arr[currentIndex]] = [arr[currentIndex], arr[index]]; // swap again to restore state for next recursion
        }
    } 

    recurse(arr, 0);

    return output;
}

/* 
TC: O(n! * n) = number of permutations * time to copy each permutation while pushing in output array
SC: O(n! * n) = number of permutations * space to store each permutation while copying in spread operator */

// For strings
function permutationsString(str: string[]): string[] {

    const n: number = str.length;
    let output: string[] = [];

    function recurse(str: string[], index: number): void {
        
        if(index === n) {
            output.push(str.join(''));
            return;
        } 

        for(let currentIndex = index; currentIndex < n; currentIndex++) {
            [str[index], str[currentIndex]] = [str[currentIndex], str[index]];
            recurse(str, index + 1);

            /* Because you're modifying the array in-place, and without restoring the previous state 
            after recursion, it carries over wrong values to future calls. */
            [str[index], str[currentIndex]] = [str[currentIndex], str[index]]; // swap again to restore state for next recursion
        }
    } 

    recurse(str, 0);

    return output;

}

let str: string = "abc";
let strArr: string[] = str.split('');
console.log(permutationsString(strArr));