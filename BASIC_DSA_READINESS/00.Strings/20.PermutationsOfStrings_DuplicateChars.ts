/* LC 47. Permutations of a String with DUPLICATE characters

Given a string that may contain duplicate characters, return all UNIQUE permutations.

Input: s = "AAB"
Output: ["AAB", "ABA", "BAA"]

Input: s = "ABC"
Output: ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]

Input: s = "AAA"
Output: ["AAA"]

Number of unique permutations = n! / (c1! * c2! * ... ) where ci = frequency of the i-th distinct character
"AAB" -> 3! / 2! = 3

Way-1:
- Generate all the permutations but keep only those which are unique

*/

function generateUniquePermutations(a: number[]): number[][] {
    const n: number = a.length;
    let output: number[][] = [];
    let hashSet = new Set<string>();

    function recurse(a: number[], index: number): void {

        if(index === n) {
            const stringifiedPermutation: string = a.toString();
            if(!hashSet.has(stringifiedPermutation)) {
                hashSet.add(stringifiedPermutation);
                output.push([...a]);
            }
            return;
        }

        for(let currentIndex = index; currentIndex < n; currentIndex++) {

            [a[index], a[currentIndex]] = [a[currentIndex], a[index]];

            recurse(a, index + 1);

            [a[index], a[currentIndex]] = [a[currentIndex], a[index]];
        }
    }

    recurse(a, 0);

    return output;
}


/*
TIME COMPLEXITY: O(n * n!)

- The recursion explores all n! permutations
- At each leaf, a.toString() takes O(n) time.
- Copying the permutation using [...a] takes O(n) time.
- Therefore, the overall time complexity is O(n * n!).

SPACE COMPLEXITY: O(n * n!)

- OUTPUT: In the worst case, all elements are distinct, producing n!
  permutations, each containing n elements. Therefore, O(n * n!).

- HASH SET: In the worst case, stores n! string keys, each of length O(n).
  Therefore, O(n * n!).

- RECURSION STACK: O(n)

Overall auxiliary space (excluding output): O(n * n!)
Overall space (including output): O(n * n!)
*/

/* Way-2: 
- We should avoid generating duplicate permutation in the first place (rather than skipping it through hash)
- Sort the input array first
- Iterate through elements, skipping visited elements and duplicates.
- Select a valid element, mark it visited, and recurse.
- Backtrack by removing the element and marking it unvisited.
- Add the permutation to the result when all elements are selected.

*/


function generateUniquePermutations(a: number[]): number[][] {
    const n: number = a.length;
    let output: number[][] = [];

    // Sort to bring duplicate elements together
    a.sort((x, y) => x - y);

    // Track which indices have been used
    let visited: boolean[] = new Array(n).fill(false);

    function recurse(curr: number[]): void {

        // Base case: permutation is complete
        if (curr.length === n) {
            output.push([...curr]);
            return;
        }

        for (let i = 0; i < n; i++) {

            /*
                Skip an element if already used
                OR skip a duplicate if its previous occurrence has not been used in the current permutation

                Rule: when choosing between identical values for the same position, choose the earlier unused copy first.

                         0  1  2
                let a = [1, 3, 3]

                Suppose we're building a permutation and curr = [1].

                We have two choices for the next element:
                - Choose the 3 at index 1 → curr = [1, 3]
                - Choose the 3 at index 2 → curr = [1, 3]
                Both choices produce the exact same partial permutation because the values are identical.
                Continuing both branches would generate [1, 3, 3] twice.

                Case-1: previous 3 has not been used
                - visited[1] = false and visited[2] = false since we access everything sequentially
                - When considering the second 3, the first 3 is still unused. 
                  The condition (i > 0 && a[i] === a[i - 1] && !visited[i - 1]) is true, so skip the second 3

                Case-2: Previous 3 HAS been used
                - visited[1] = true and visited[2] = false 
                - this time !visited[i - 1] = !false = true
                  so the condition doesn't skip the second 3. We can choose it and complete [1, 3, 3].

            */
            if (
                visited[i] ||
                (i > 0 && a[i] === a[i - 1] && visited[i-1] === false)
            ) {
                continue;
            }

            // Choose the element
            visited[i] = true;
            curr.push(a[i]);

            // Explore the next position
            recurse(curr);

            // Backtrack: undo the choice
            curr.pop();
            visited[i] = false;
        }
    }

    recurse([]);

    return output;
}

/*


/*
TIME COMPLEXITY: O(n log n + n * k)

Where:
- n = number of elements in the input array
- k = number of unique permutations

Explanation:
1. Sorting the array takes O(n log n) time.
2. The recursion generates k unique permutations.
3. Each completed permutation is copied using [...curr], which takes O(n) time.
4. Generating and storing all unique permutations takes O(n * k) time.

Worst case (all elements are distinct):
- k = n!
- Time complexity = O(n log n + n * n!)
- Simplified: O(n * n!).


SPACE COMPLEXITY:

1. OUTPUT SPACE: O(n * k)
   - There are k unique permutations.
   - Each permutation contains n elements.

2. VISITED ARRAY: O(n)

3. RECURSION STACK: O(n)

4. CURRENT PERMUTATION (curr): O(n)
   - Stores the permutation being built.

Overall auxiliary space (excluding output): O(n)
Overall space (including output): O(n * k)

Worst case (all elements are distinct):
- k = n!
- Total space = O(n * n!).
*/