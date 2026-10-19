/* GFG Version - Much Simpler: Run Length Encoding

Given a string s, implement a function encode that performs run-length encoding on the string. 
Run-length encoding is a form of compression where consecutive occurrences of the same character 
are replaced by the character followed by the count of its occurrences.

Input: s = aaaabbbccc
Output: a4b3c3
Explanation: The character 'a' repeated 4 times consecutively and 'b' 3 times, 'c' also 3 times, so answer for this test case is a4b3c3.

Input: s = abbbcdddd
Output: a1b3c1d4
Explanation:  The character 'a' is repeated 1 time, 'b' 3 times, 'c' 1 time and 'd' repeated 4 times, 
              so answer for this test case is a1b3c1d4.

Input: s = g
Output: g1

Constraints:
    1 ≤ s.size() ≤ 10^6


Way-1: Use map
- Iterate full string first and store frequency in map
- Iterate second time and append frequency from map

TC: O(2n) - O(n) 
SC: O(k) - unique char

Way-2: Two pointer approach

0 1 2 3 4 5 6 7 8
b b b c c d d d d
i
j

i = 0
    while(a[i] === a[j]) j++

    0 1 2 3 4 5 6 7 8
    b b b c c d d d d
    i     j

    Notice: count(a[i]) = (j - i)
    ans += a[i] + count(a[i])

i = j

    0 1 2 3 4 5 6 7 8
    b b b c c d d d d
        i
        j

        j = i again

When j > n

count = (j - i) separately after the loop

TC: O(n)
SC: O(1)
*/

function GFG_VersionEncodingTwoPointers(s: string): string {

    const n = s.length;

    let result = "";
    let i = 0, j = 0;

    while (j < n) {

        j = i;

        while ((j < n) && s[j] === s[i]) j++;

        result += s[i] + (j - i);

        i = j
    }

    return result;
}

/* Leetcode Version: 443. String Compression - Memorize technique

Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. 

For each group of consecutive repeating characters in chars:
    If the group's length is 1, append the character to s.
    Otherwise, append the character followed by the group's length.
    
The compressed string s should not be returned separately, but instead, be stored in the input character array chars. 
Note that group lengths that are 10 or longer will be split into multiple characters in chars.

After you are done modifying the input array, return the new length of the array.

You must write an algorithm that uses only constant extra space.

Note: The characters in the array beyond the returned length do not matter and should be ignored.

Input: chars = ["a","a","b","b","c","c","c"]
Output: 6
Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
After modifying the input array in-place, the first 6 characters of chars should be ["a","2","b","2","c","3"].

Input: chars = ["a"]
Output: 1
Explanation: The only group is "a", which remains uncompressed since it is a single character.
After modifying the input array in-place, the first character of chars should be ["a"].

Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: 4
Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
After modifying the input array in-place, the first 4 characters of chars should be ["a","b","1","2"].

Constraints:
    1 <= chars.length <= 2000
    chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.


Way-1: Brute Force:
-------------------
- First iteration: store frequencies in map
- Second iteration:
    if map.get(s[i]) === 1
        res += s[i]
    else res += s[i] + map.get(s[i])
- return result.length

TC: O(n)
SC: O(uniqueChars) + O(result.length)

But here we need extra space, we need to modify the input array

Way-2: Two pointers Approach:
-----------------------------

- Set i = 0, j = 0
- While j < n, handle one group of equal characters:
    Save the group's character: ch = chars[j].
    Set count = 0.
    Move j forward while j < n and chars[j] === ch, adding 1 to count each step. 
    When this stops, j is at the start of the next group.
    Write ch at chars[i], then i++.
    If count > 1, convert count to a string and write each digit at chars[i], doing i++ after each one. 
    The array holds single characters, so 12 becomes '1' and '2'.
    Return i. This is the new length.

*/

function compress(s: string[]): number {
    const n: number = s.length;

    let i = 0, j = 0;

    while (j < n) {

        const firstCharOfGroup = s[j];
        let count = 0;

        while ((j < n) && (s[j] === firstCharOfGroup)) {
            j++;
            count++;
        }

        s[i] = firstCharOfGroup;
        i++;

        if (count > 1) {
            for (let char of String(count)) {
                s[i] = char;
                i++;
            }
        }

    }

    return i;
}