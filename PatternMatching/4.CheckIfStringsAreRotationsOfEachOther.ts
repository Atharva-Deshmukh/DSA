/*
Input: s1 = “abcd”, s2 = “cdab”
Output: true
Explanation: After 2 right rotations, s1 will become equal to s2.


Input: s1 = “aab”, s2 = “aba”
Output: true
Explanation: After 1 left rotation, s1 will become equal to s2.


Input: s1 = “abcd”, s2 = “acbd”
Output: false
Explanation: Strings are not rotations of each other.

Niave Approach:
- Generate all rotations of anyone say s1 and check if any rotation match the given s2
- if none match, return false

        aab       aba
        baa
        aba
                            --> no of rotations = length of string, hence we iterate till s1.length

        abcd      acbd
        dabc
        cdab
        bcda

To analyze the time complexity of the given code:

1. **Outer Loop**:
   - The `for` loop runs `n1` times, where `n1` is the length of the string `s1`.
   - Thus, the loop executes O(n1) iterations.

2. **Inner Operations**:
   - Within the loop:
     - `substring(0, n1 - 1)` and `substring(n1 - 1)` are executed, each taking O(n1) time because `substring` 
        operates on a portion of the string.
     - String concatenation `lastCharRemoved + remainingString` also takes O(n1) time.
     - String comparison `newRotation === s2` takes O(n1) time in the worst case.

   Overall, each iteration of the loop takes O(n1) + O(n1) + O(n1) = O(n1) operations.

3. **Total Complexity**:
   - Since the loop runs n1 times and each iteration takes O(n1) time, the total time complexity is:
     O(n1 × n1) = O(n1^2)

TC: O(n1^2), where n1 is the length of the string `s1`.

-----------------------------------------------------------------------------------------------------
BY PATTERN MATCHING USING KMP Algo since a single pattern needs to be matched deterministically:


s1 = aab 
s2 = aba

for s2 to be a rotation of s1 => pattern of s2 should be there in (s1 + s1)

"aabaab" has "aba"

modify KMP to return true or false and not the index

*/

// assuming strings are of equal lengths and both are non-empty
function checkRightRotationsNiaveApproach(s1: string, s2: string): boolean {

    let newRotation: string = s1; // start with s1
    let n1: number = s1.length;

    for(let i = 1; i <= n1; i++) {

        let [lastCharRemoved, remainingString] = [newRotation.substring(0, n1 - 1), newRotation.substring(n1 - 1)];
        newRotation = lastCharRemoved + remainingString;
        if(newRotation === s2) return true;
    }

    return false;
}

// ---------------------------------------------------------------------------------------------------------------------

function generateLPS(pattern: string): number[] {
    let n: number = pattern.length;
    let lps = Array<number>(n).fill(0);
    let len: number = 0;
    let i: number = 1;

    while(i < n) {
        if(pattern[len] === pattern[i]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if(len === 0) {
                lps[i] = 0;
                i++;
            } else {
                len = lps[len - 1]; // to avoid recomputation
            }
        }
    }

    return lps;
}

function kmpToCheckRotation(txt: string, pat: string): boolean {
    let txt_len: number = txt.length;
    let pat_len: number = pat.length;

    if(txt_len < pat_len) return false;

    let lps: number[] = generateLPS(pat);
    let i: number = 0;
    let j: number = 0;

    while(i < txt_len) {
        if(txt[i] === pat[j]) {
            i++;
            j++;

            if(j === pat_len) {
                return true;
            }
        }
        else {
            if(j === 0) i++;
            else j = lps[j - 1];
        }
    }



    return false;
}