/* Permutations of a String with DUPLICATE characters (LC 47 Permutations II, GFG "Permutations of given String")

Given a string that may contain duplicate characters, return all UNIQUE permutations.

Input: s = "AAB"
Output: ["AAB", "ABA", "BAA"]

Input: s = "ABC"
Output: ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]

Input: s = "AAA"
Output: ["AAA"]

Number of unique permutations = n! / (c1! * c2! * ... ) where ci = frequency of the i-th distinct character
"AAB" -> 3! / 2! = 3

--------------------------------------------------------------------------------------------------
Why duplicates appear with the plain swap approach (see 00.PermutationsOfStrings_UniqueChars.ts)
--------------------------------------------------------------------------------------------------
At a given index we try every character of arr[index..n-1] in that position.
If two of those characters are equal, the whole subtree below them is identical, so we
generate the same permutations again.

DUPLICATE LOGIC (swap approach):
    At every level (index), keep a local Set of characters we have ALREADY placed at this index.
    If arr[currentIndex] is already in the set -> SKIP it (do not swap, do not recurse).

    - The set is created fresh for every recursive call, it is NOT shared across levels.
      (The same char is allowed again at a deeper index, e.g. "AAB" has A at index 0 and A at index 1)
    - No sorting of the input is needed for this to be correct.
    - It prunes the entire duplicate SUBTREE, so no work is wasted. Checking for duplicates at the leaf
      (global Set of strings) still explores all n! leaves.

Recursion Tree for "AAB" (swapping approach + per level pruning)
[ ] marks the characters that are FIXED at that level
X SKIP X = char already tried at this level, the whole subtree is pruned

                                                    index = 0
                                                     [A A B]
                                            tried at this level = { }
                                                     /  |  \
                                                 /      |      \
                                   swap(0,0)  /         |         \ swap(0,2)
                              (A with A)  /             | (A with A)  \ (A with B)
                                       /                | swap(0,1)       \
                                   /                    |                    \
                            index = 1              X  SKIP  X               index = 1
                             [A] A B           A is already tried            [B] A A
                           A is fixed          at index 0 -> prune         B is fixed
                           tried = { }                                     tried = { }
                              /   \                                           /   \
                swap(1,1)  /         \ swap(1,2)                swap(1,1)  /         \ swap(1,2)
             (A with A)  /             \ (A with B)          (A with A)  /             \ (A with A)
                      /                   \                           /                   \
                index = 2               index = 2               index = 2              X  SKIP  X
                 [A A] B                 [A B] A                 [B A] A           A is already tried
                    |                       |                       |              at index 1 -> prune
                swap(2,2)               swap(2,2)               swap(2,2)
               (B with B)              (A with A)              (A with A)
                    |                       |                       |
                index = 3               index = 3               index = 3
               index === n             index === n             index === n
                 [A A B]                 [A B A]                 [B A A]
                    |                       |                       |
                  push                    push                    push
                  "AAB"                   "ABA"                   "BAA"
              (AA is fixed)           (AB is fixed)           (BA is fixed)

    Leaves = 3 = 3!/2!  (plain swap approach would have 6 leaves, 3 of them duplicates)

    Skip check at index 0: tried = {A} after the first iteration, the 2nd char is A again -> skip,
                           the 3rd char is B -> not in the set -> go.
    Skip check at index 1 under [B] A A: tried = {A} after the first iteration, the 2nd char is A -> skip.

--------------------------------------------------------------------------------------------------
Lexicographic order
--------------------------------------------------------------------------------------------------
The swap approach does NOT produce lexicographic order, even with a sorted input
("ABC" gives ... CBA before CAB because swap(0,2) puts C in front of an unsorted tail "BA").
If the judge expects sorted output, sort the result at the end (approach 1), or use the
"sort + used[]" approach (approach 2) which generates the sorted order natively.
*/

/* Approach 1: swap + per level Set pruning */
function permuteUniqueSwap(s: string): string[] {

    const arr: string[] = s.split('');
    const n: number = arr.length;
    const output: string[] = [];

    function recurse(index: number): void {

        if(index === n) {
            output.push(arr.join(''));
            return;
        }

        /* chars already placed at this index, local to this call */
        const triedAtThisLevel: Set<string> = new Set<string>();

        for(let currentIndex = index; currentIndex < n; currentIndex++) {

            if(triedAtThisLevel.has(arr[currentIndex])) continue; // duplicate subtree, prune
            triedAtThisLevel.add(arr[currentIndex]);

            [arr[index], arr[currentIndex]] = [arr[currentIndex], arr[index]];

            recurse(index + 1);

            [arr[index], arr[currentIndex]] = [arr[currentIndex], arr[index]]; // backtrack
        }
    }

    recurse(0);

    return output.sort(); // only needed when lexicographic order is expected
}

/* 
Approach 2: sort + used[] (generates lexicographic order natively)

Sort the chars so equal chars sit next to each other, then build the answer position by position
by picking unused chars from left to right.

DUPLICATE LOGIC: skip chars[i] if chars[i] === chars[i - 1] and chars[i - 1] is NOT used.
    Equal chars must be picked in left to right order. If the previous twin is still unused,
    picking the later twin first would build the exact same permutations as picking the
    previous twin first, so that branch is a duplicate.
    (If the previous twin IS used, it is already sitting in the current path, so we are
    legitimately using the second copy, e.g. the second A in "AAB".)
*/
function permuteUniqueSorted(s: string): string[] {

    const chars: string[] = s.split('').sort();
    const n: number = chars.length;
    const used: boolean[] = new Array(n).fill(false);
    const path: string[] = [];
    const output: string[] = [];

    function recurse(): void {

        if(path.length === n) {
            output.push(path.join(''));
            return;
        }

        for(let i = 0; i < n; i++) {

            if(used[i]) continue;
            if(i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue; // duplicate branch

            used[i] = true;
            path.push(chars[i]);

            recurse();

            path.pop();
            used[i] = false;
        }
    }

    recurse();

    return output;
}

/* 
Let U = number of unique permutations = n! / (c1! * c2! * ...)   (U = n! when all chars are distinct)

Approach 1: swap + per level Set
TC: O(n * U) amortized, O(n * n!) worst case when all chars are distinct
    - Every node of the pruned tree leads to at least one leaf, so the tree is never bigger than n * U nodes.
    - Each leaf builds a string of length n -> O(n) per leaf -> O(n * U).
    - The extra sort of the output costs O(U * log(U) * n) (comparing strings of length n).
      Leave it out if the order does not matter.
SC: O(n^2) auxiliary (excluding output)
    - Recursion stack is n + 1 frames deep, and every frame holds a Set of at most (n - index) chars
      -> n + (n - 1) + ... + 1 = O(n^2) in the worst case.
    - Output is O(n * U).

Approach 2: sort + used[]
TC: O(n log n) for the sort + O(n * U) to build the answers (O(n * n!) worst case)
    Pruned nodes are skipped inside the loop in O(1), at most n checks per node.
SC: O(n) auxiliary (excluding output) = used[] + path + recursion stack.
    Output is O(n * U).

Compare with the "check duplicates at the leaf with a global Set of strings" approach
(RecursionAndBacktracking/19.PermutationWithDuplicates.ts):
    TC: always O(n * n!) even for "AAAAAAAA" (it explores every leaf).
    SC: O(n * U) extra for the Set of strings.
*/

console.log(permuteUniqueSwap("AAB"));    // [ 'AAB', 'ABA', 'BAA' ]
console.log(permuteUniqueSorted("AAB"));  // [ 'AAB', 'ABA', 'BAA' ]
console.log(permuteUniqueSwap("ABC"));    // [ 'ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA' ]
console.log(permuteUniqueSorted("AAA"));  // [ 'AAA' ]
