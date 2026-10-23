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

- To keep the permutations sorted, we first sort the initial given string and then generate all permutations

    => We fix the first position and try every character in that position.
    => After we fix the first position, we recursive repeat the process for the remaining string.  
    => Once we generate all permutations beginning with the current character, to bring the next character at 
       its position in current string, we swap the next character, with the current character.

Recursion Tree for Permutations of String "ABC" (swapping approach)
[ ] marks the characters that are FIXED at that level

                                                                index = 0
                                                                 [A B C]
                                                              /     |     \
                                                         /          |          \
                                        swap(0,0)  /                | swap(0,1)      \ swap(0,2)
                                 (A with A)  /                      | (A with B)           \ (A with C)
                                       /                            |                            \
                                  /                                 |                                 \
                        index = 1  (index 1 means index 0 fixed) index = 1                               index = 1
                         [A] B C                                 [B] A C                                 [C] B A
                       A is fixed                              B is fixed                              C is fixed
                          /   \                                   /   \                                   /   \
             swap(1,1)  /       \ swap(1,2)          swap(1,1)  /       \ swap(1,2)          swap(1,1)  /       \ swap(1,2)
          (B with B)  /           \ (B with C)    (A with A)  /           \ (A with C)    (B with B)  /           \ (B with A)
                    /               \                       /               \                       /               \
              index = 2           index = 2           index = 2           index = 2           index = 2           index = 2
               [A B] C             [A C] B             [B A] C             [B C] A             [C B] A             [C A] B
                  |                   |                   |                   |                   |                   |
              swap(2,2)           swap(2,2)           swap(2,2)           swap(2,2)           swap(2,2)           swap(2,2)
             (C with C)          (B with B)          (C with C)          (A with A)          (A with A)          (B with B)
                  |                   |                   |                   |                   |                   |
              index = 3           index = 3           index = 3           index = 3           index = 3           index = 3
             index === n         index === n         index === n         index === n         index === n         index === n
               [A B C]             [A C B]             [B A C]             [B C A]             [C B A]             [C A B]
                  |                   |                   |                   |                   |                   |
                push                push                push                push                push                push
                "ABC"               "ACB"               "BAC"               "BCA"               "CBA"               "CAB"
            (AB is fixed)       (AC is fixed)       (BA is fixed)       (BC is fixed)       (CB is fixed)       (CA is fixed)

   Level index = 2 has a single iteration (currentIndex = 2), so it always swaps with itself and goes to index = 3.
   Base case: index === n -> push the string to output and return (no further swaps).
   After returning from every child we swap back (backtrack) so the siblings see the original order.
   Total leaves = 3! = 6
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
        
        /* Retrun the formed string once we reach end */
        if(index === n) {
            output.push(str.join(''));
            return;
        } 

        /*
            [A B C] --> (A with A)
                        (A with B)
                        (A with C)
        */
        for(let currentIndex = index; currentIndex < n; currentIndex++) {

            [str[index], str[currentIndex]] = [str[currentIndex], str[index]];

            recurse(str, index + 1);

            /* 
                Until now, we just checked all possibilities for index = 0 say,
                for further indices, we need to restore the original array back for the next iteration of the loop
            */
            [str[index], str[currentIndex]] = [str[currentIndex], str[index]]; // swap again to restore state for next recursion
        }
    } 

    recurse(str, 0);

    return output;

}

let str: string = "abc";
let strArr: string[] = str.split('');
console.log(permutationsString(strArr));