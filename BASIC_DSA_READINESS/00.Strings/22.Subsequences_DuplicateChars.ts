/*
Distinct Subsequences of a string WITH DUPLICATE CHARACTERS

Problem: Given a string that may contain repeated characters, return all DISTINCT subsequences.

Why the plain logic of Pick/skip recursion fails:
    Pick/skip recursion and bitmask both decide on INDICES, not on character values.
    s = "aab"
    pick index 0 only --> "a"
    pick index 1 only --> "a"      (same string, different indices)
    Output has 2^n = 8 entries: "", a, a, aa, aab, ab, ab, b
    Distinct subsequences = 6    : "", a, aa, aab, ab, b

Sorting the string first (Subsets II trick) does NOT work, it changes the string itself,  and so the order of characters inside the subsequences.

Three ways to fix it:
    Way-1: Pick/skip recursion + Set          (dedupe at the leaves)
    Way-2: Bitmask / power set + Set          (dedupe at the leaves)
    Way-3: Leftmost-occurrence recursion      (never generates a duplicate, no Set needed)

Note: a Set<string[]> does NOT dedupe arrays (compared by reference), so join to a string before adding.
*/


/* Way-1: Pick / skip recursion, same as file 21, only the output is a Set of strings

                                      s = "aab"

                                    f(0, "")
                           pick a /          \ skip a
                         f(1, "a")            f(1, "")
                    pick a /    \ skip a   pick a /    \ skip a
                  f(2, "aa")  f(2, "a")   f(2, "a")  f(2, "")
                   /    \       /    \      /    \      /   \
                "aab"  "aa"   "ab"  "a"   "ab"  "a"   "b"   ""

    Leaves: aab, aa, ab, a, ab, a, b, ""  -->  "ab" and "a" repeat, the Set drops them
*/
function distinctSubsequences_Recursion(s: string): string[] {

    const n: number = s.length;
    const distinct: Set<string> = new Set<string>();

    function recurse(currentSubsequence: string, currIndex: number): void {

        /* Base case: store the subsequence generated till now, Set ignores repeats */
        if (currIndex === n) {
            distinct.add(currentSubsequence);
            return;
        }

        /* include the current character */
        recurse(currentSubsequence + s[currIndex], currIndex + 1);

        /* exclude the current character */
        recurse(currentSubsequence, currIndex + 1);
    }

    recurse("", 0);
    return Array.from(distinct).sort();
}

/*
Time Complexity: O(n * 2^n)  --> 2^n leaves, each builds / hashes a string of up to n chars
                 + sorting m distinct strings: O(m * log m * n), m <= 2^n
Space Complexity: O(n * 2^n) --> Set stores up to 2^n strings of up to n chars, recursion stack O(n)
*/


/* Way-2: Bitmask / power set, same as file 21, only the output is a Set of strings
   Different masks can select different indices holding the same characters, Set removes the repeats
   s = "aab", bit i <--> s[i]
   mask 001 --> "a" (index 0) and mask 010 --> "a" (index 1), both give "a"
   mask 101 --> "ab" (index 0, 2) and mask 110 --> "ab" (index 1, 2), both give "ab"
*/
function distinctSubsequences_PowerSet(s: string): string[] {

    const n: number = s.length;
    const distinct: Set<string> = new Set<string>();

    for (let mask = 0; mask < (1 << n); mask++) {
        let subsequence: string = "";

        for (let i = 0; i < n; i++) {
            if (mask & (1 << i)) subsequence += s[i];
        }

        distinct.add(subsequence);
    }

    return Array.from(distinct).sort();
}

/*
Time Complexity: O(n * 2^n)
Space Complexity: O(n * 2^n)
Limit: 1 << n is a 32 bit operation, so this works only for n <= 30
*/

