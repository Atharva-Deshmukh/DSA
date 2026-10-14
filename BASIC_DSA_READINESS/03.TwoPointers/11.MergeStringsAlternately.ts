/* 1768. Merge Strings Alternately

You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, 
starting with word1. If a string is longer than the other, append the additional letters onto the 
end of the merged string.

Return the merged string.

Input: S1 = "Hello" S2 = "Bye"
Output: HBeylelo
Explanation: The characters of both the given strings are arranged alternatlively.

Input: S1 = "abc", S2 = "def"
Output: adbecf
Explanation: The characters of both the given strings are arranged alternatlively.

Approach:
- Its a simple 2 pointer approach.

TC: O(n)
SC: O(1) */

function mergeAlternately(s1: string, s2: string): string {
    const n1 = s1.length;
    const n2 = s2.length;

    let ans = "";
    let i = 0, j = 0;

    while((i < n1) && (j < n2)) {
        ans += s1[i];
        ans += s2[j];

        i++;
        j++;
    }

    while(i < n1) {
        ans += s1[i];
        i++;
    }

    while(j < n2) {
        ans += s2[j];
        j++;
    }

    return ans;
};