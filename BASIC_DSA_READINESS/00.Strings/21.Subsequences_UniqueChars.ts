/* 

CONCEPT: Subset vs Subsequence

+------------+----------------------------+----------------------------------------------------------------+
|            | Powerset / subsets         | Subsequences                                                   |
+------------+----------------------------+----------------------------------------------------------------+
| Order      | Unordered                  | Sequence matters here                                          |
|            | {a,b} = {b,a}              | "ab" != "ba", only "ab" is valid                               |
+------------+----------------------------+----------------------------------------------------------------+
| Duplicates | A set has no duplicates    | Strings like "aab" can produce repeated subsequences,          |
|            |                            | e.g. "", a, a, aa, aab, ab, ab, b                              |
+------------+----------------------------+----------------------------------------------------------------+
| Count      | 2^n                        |  a string of length n always has 2ⁿ subsequences               |
|            |                            |  duplicates included                                           |
+------------+----------------------------+----------------------------------------------------------------+
| Empty      | Includes {} (empty set)    | Includes "" (empty string)                                     |
+------------+----------------------------+----------------------------------------------------------------+


Generating all possible Subsequences using Recursion including the empty one.

Input : [1, 2]
Output : 
[
   []
   [1]        --> 2^2
   [2]
   [1,2]
]


Input : [1, 2, 3]
Output : 
[
   []
   [1]        --> 2^3
   [2]
   [3]
   [1,2]
   [2,3]
   [1,3]
   [1,2,3]
]

Way-1; Using recursion

    At every step while iterating the array, we have 2 choices, 
    1: include the current element
    2: exclude the current element

                                                  inputStr = "abc"
                                                  ---------------
                                             f(0, "")  index 0, curr = ""
                                               pick a /         \ skip a
                                                 /                   \
                                            /                             \
                                       /                                       \
                                  /                                                 \
                         f(1, "a")                                                   f(1, "")
                  pick b /       \ skip b                                     pick b /       \ skip b
                     /               \                                           /               \
                  /                     \                                     /                     \
         f(2, "ab")                     f(2, "a")                     f(2, "b")                     f(2, "")
     pick c /    \ skip c          pick c /    \ skip c          pick c /    \ skip c          pick c /    \ skip c
         /         \                   /         \                   /         \                   /         \
  f(3, "abc")    f(3, "ab")     f(3, "ac")      f(3, "a")     f(3, "bc")      f(3, "b")      f(3, "c")      f(3, "")
     push           push           push           push           push           push           push           push

Leaves from left to right: "abc", "ab", "ac", "a", "bc", "b", "c", ""
Note: for "aab", two different leaves can produce the same string (pick index 0 vs pick index 1), that is how duplicates appear.
*/


function generateAllPossibleSubsequences(s: string): string[] {

        const inputArr = s.split('')
        const n = inputArr.length;
        let output: string[] = [];

    function recurse(currentSubsequence: string[], currIndex: number): void {

        /* Base case: Return the array generated till now */
        if (currIndex === n) {
            output.push(currentSubsequence.join(''))
            return;
        }

        /* include the current element OF INPUT ARRAY in the subsequence and get the further possible combinations */
        currentSubsequence.push(inputArr[currIndex]);
        recurse(currentSubsequence, currIndex + 1);

        /* exclude the current element OF INPUT ARRAY in the subsequence and get the further possible combinations */
        currentSubsequence.pop();
        recurse(currentSubsequence, currIndex + 1);
    }

    recurse([], 0);
    return output;

    // return output.sort(); --> For lexicographically sorted subsequences
}

/*
Time Complexity: O(n * 2^n)
- Each of the n elements has two choices: include or exclude -->  2^n possible subsequences.
- For each subsequence, join() takes O(n) time in the worst case.
- Therefore, the total time complexity is O(n * 2^n).

Space Complexity: O(n * 2^n)
- The output array stores 2^n subsequences, each requiring up to O(n) space.
- The recursion stack requires O(n) space.
- The currentSubsequence array requires O(n) space.
- Therefore, the output space dominates, giving O(n * 2^n) total space complexity.
*/

/* Way-2: Power set / Bit manipulation

Note that in Binary representation of nos from [0-7], we have the power set
0 -->  000    {}
1 -->  001    {c}
2 -->  010    {b}
3 -->  011    {b, c}
4 -->  100    {a}
5 -->  101    {a, c}
6 -->  110    {a, b}
7 -->  111    {a, b, c}

Observation: For every power of 2, IF we iterate from 0 to (2^n)-1, we find the bits are in proper power set permutation

0 -->  00000
1 -->  00001
2 -->  00010
3 -->  00011   ---- power set till here for string of length = 2, [0, (2 ^ (2 - 1))]
4 -->  00100   
5 -->  00101
6 -->  00110
7 -->  00111  ---- power set till here for string of length = 3, [0, (2 ^ (3 - 1))]
8 -->  01000  
9 -->  01001
10 --> 01010
11 --> 01011
12 --> 01100
13 --> 01101
14 --> 01110
15 --> 01111  ---- power set till here for string of length = 4, [0, (2 ^ (4 - 1))]
16 --> 10000 

Just the subsequences generated this way are not sorted lexicographically - sort them later
*/

function generateSubseuences_UsingPowerSet(str: string): string[] {
    const n = str.length;
    let subsequences: string[] = [];

    // iterate from [0 to 2^n-1]
    for(let num=0; num<Math.pow(2, n); num++) {
        let subsquence: string = "";

        // iterate str from [0 to n-1]. jis position ki bit set hai, include it within the subsquence
        //  if((num & ((1 << i))) === 1) {subsquence += str[i];} DONT USE THIS SINCE RESULTS ARE ABSURD
        for(let i=0; i<n; i++) {
            if((num & ((1 << i)))) {subsquence += str[i];}
        }
        subsequences.push(subsquence);
    }

    return subsequences.sort();
}

/*
Time Complexity: O(n * 2^n)
- The outer loop iterates 2^n times, representing all possible subsets using bitmasks.
- For each iteration, the inner loop checks all n bits to determine which characters to include.
- Constructing each subsequence takes up to O(n) time.
- Finally, sorting 2^n subsequences takes O(N * log N * n) = O(n^2 * 2^n) mathematically
- Therefore, the overall time complexity is O(n * 2^n).

Space Complexity: O(n * 2^n)
- The subsequences array stores 2^n strings, each of which can contain up to n characters.
- The temporary subsquence string can require O(n) space.
- Therefore, the total space complexity is O(n * 2^n).
*/

