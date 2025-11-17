/* Leetcode 47. Permutations II
Given a collection of numbers, nums, that might contain duplicates, 
return all possible unique permutations in any order.

Input: nums = [1,1,2]
Output:
[
 [1,1,2],
 [1,2,1],
 [2,1,1]
]

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

[1,1,2]
    index 0 
    swap(0, 0)
    1 fixed -> [1,1,2]

        index 1
        swap(1, 1)
        1, 1 fixed -> [1, 1, 2]

            index 2
            swap(2, 2)
            1, 1, 2 fixed -> [1, 1, 2] -> RETURN

        index 1
        swap(1, 2)
        1, 2 fixed -> [1, 2, 1]

            index 2
            swap(2, 2)
            1, 2, 1 fixed -> [1, 2, 1] -> RETURN

    index 0 
    swap(0, 1)
    1 fixed -> [1,1,2]

        index 1
        swap(1, 1)
        1, 1 fixed -> [1, 1, 2]   --> [1, 1] DUPLICATE, SKIP

        index 1
        swap(1, 2)
        1, 2 fixed -> [1, 2, 1]    --> [1, 2] DUPLICATE, SKIP

    index 0 
    swap(0, 2)
    2 fixed -> [2,1,1]

        index 1 
        swap(1, 1)
        2, 1 fixed -> [2,1,1]

            index 2
            swap(2, 2)
            2, 1, 1 fixed -> [2,1,1] -> RETURN

        index 1 
        swap(1, 2)
        2, 1 fixed -> [2,1,1]    --> [2, 1] DUPLICATE, SKIP


Sort to bring duplicates together.

Use set to track unique combinations only.

Pruning is not possible here as we are generating all permutations.
Also, pruning would require additional checks which would add to time complexity and reduce the reasonability of the logic.
*/

function permuteUnique(arr: number[]): number[][] {
        const n: number = arr.length;
    let output: number[][] = [];
    let isAdded: Set<string> = new Set<string>();

    arr = arr.sort(); // bring duplicates together

    function recurse(arr: number[], index: number): void {
        
        if(index === n) {

            /* Push only when the combination is unique */
            if(!isAdded.has(arr.join(''))) {
                output.push([...arr]);
                isAdded.add(arr.join(''));
            }
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
};

/* For strings */
function findPermutation(str: string): string[] {

    let arr: string[] = str.split("");

    const n = arr.length;
    let output: string[] = [];
    let isAdded: Set<string> = new Set<string>();
    
    arr = arr.sort(); // bring duplicates together

    function recurse(arr: string[], index: number): void {

        if (index === n) {

            /* Push only when the combination is unique */
            if (!isAdded.has(arr.join(""))) {
                output.push(arr.join(""));
                isAdded.add(arr.join(""));
            }
            return;
        }

        for (let currentIndex = index; currentIndex < n; currentIndex++) {
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