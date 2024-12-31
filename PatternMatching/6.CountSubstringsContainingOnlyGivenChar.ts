/* 
Input: S = “0110111”, C = ‘1’ 
Output: 9 
Explanation: 
The substrings containing only ‘1’ are:
 “1” — 5 times 
“11” — 3 times 
“111” — 1 time 
Hence, the count is 9.


Input: S = “geeksforgeeks”, C = ‘e’ 
Output: 6 

Naive Approach: 
The simplest approach is to generate all possible substrings of the given string S and count the substrings which contains 
only character C. 

Time Complexity: O(N^3) 
Space Complexity: O(1)

Efficient Approach: Maths Observation
A string of length N forms N*(N+1)/2 substrings.
Therefore, for N consecutive occurrence of character C in the string, N*(N+1)/2 substrings are generated. 

"0110111"  let char = "1"

- Iterate through full string and keep count of consequtive 1s, use formula for a substring and keep adding to total count

TC: O(n)
SC: O(1) */

function countSubstringsWithGivenChar(s: string, char: string): number {
    let totalCount: number = 0;
    let n: number = s.length;
    let mod = 1e9 + 7;

    // corner cases
    if(n === 0) return 0;
    if(n === 1) return (s[0] === char)? 1: 0;

    let count: number = 0;

    for(let i = 0; i < n; i++) {
        if(s[i] === char) count++;  // keep incrementing count till character matches
        else {
            totalCount = (totalCount + Math.floor((count * (count + 1)) / 2)) % mod;  // add counts whenever we substring with char ends
            count = 0;                                          // reset the count
        }
    }

    /* Since we calculate count only when no match is there, hence the substring present in the last in excluded. Count it also */
    if(count > 0) {
        totalCount = (totalCount + Math.floor((count * (count + 1)) / 2)) % mod;
    }

    return totalCount;
}