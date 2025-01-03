/* Given two strings s and t. 
The task is to find maximum length of some prefix of the string S which occur in string t as subsequence.

Examples : 

Input : s = "digger"
        t = "biggerdiagram"
Output : 3

Prefix "dig" of s is longest subsequence in t.

Input : s = "geeksforgeeks"
        t = "agbcedfeitk"
Output : 4 => "geek"

Naive Approach:
A simple solutions is to consider all prefixes one by one and check if current prefix of s[] is a 
subsequence of t[] or not. Finally return length of the largest prefix.

Efficient Approach:

1. Use two pointers: one for traversing s (let’s call it i) and another for traversing t (let’s call it j).
2. i = 0; j = 0;
3. While traversing t:
   - Check if the character at s[i] matches t[j].
   - If it matches, increment i to check the next character of s.
   - Always increment j to move through t.
4. Stop when either:
   - All characters of the prefix in s have been matched (i reaches the length of s), or
   - t is fully traversed (j reaches the length of t).
5. The value of i at the end gives the length of the longest prefix of s that is a subsequence in t.

DRY RUN:
-------------------------------------------------------------------
s = "digger"
t = "biggerdiagram"

1. Initialize: i = 0, j = 0, prefix = "".
2. Traverse t:
   - Compare s[0] = 'd' with t[0] = 'b': No match → Increment j.
   - Compare s[0] = 'd' with t[1] = 'i': No match → Increment j.
   - Compare s[0] = 'd' with t[2] = 'g': No match → Increment j.
   - Compare s[0] = 'd' with t[3] = 'g': No match → Increment j.
   - Compare s[0] = 'd' with t[4] = 'e': No match → Increment j.
   - Compare s[0] = 'd' with t[5] = 'r': No match → Increment j.
   - Compare s[0] = 'd' with t[6] = 'd': Match!
     Append 'd' to prefix → "d".
     Increment i → 1, j → 7.
   - Compare s[1] = 'i' with t[7] = 'i': Match!
     Append 'i' to prefix → "di".
     Increment i → 2, j → 8.
   - Compare s[2] = 'g' with t[8] = 'a': No match → Increment j.
   - Compare s[2] = 'g' with t[9] = 'g': Match!
     Append 'g' to prefix → "dig".
     Increment i → 3, j → 10.

3. At this point, i = 3, meaning the prefix "dig" has been fully built, and we stop as we cannot match further.

Output: "dig"

TC: O(t_len)
SC: O(1)

*/

function maxLenSubstringLen(s: string, t: string): number {
    let ans: string = "";
    let s_len: number = s.length;
    let t_len: number = t.length;

    if((s_len === 0) && (t_len === 0)) return 0;

    let i: number = 0;
    let j: number = 0;

    while((i < s_len) && (j < t_len)) {
        if(s[i] === t[j]) {
            ans += s[i];
            i++;
            j++;
        } 
        else {
            j++;
        }
    }

    console.log('subsequence => ', ans);

    return ans.length;
}