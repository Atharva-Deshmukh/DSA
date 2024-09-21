/* 1915. Number of Wonderful Substrings (Lots of NEW LEARNINGs)

A wonderful string is a string where at most one letter appears an odd number of times.
If the same substring appears multiple times in word, then count each occurrence separately.

Given string consists of the first ten lowercase English letters ['a' - 'j'], 
return the number of wonderful non-empty substrings in word.

For example, "ccjjc" and "abab" are wonderful, but "ab" is not.
In case of "abab", at most, one holds, zero characters have odd freqencies



Input: word = "aba"             Output: 4
Explanation: The four wonderful substrings are underlined below:
- "aba" -> "a"
- "aba" -> "b"
- "aba" -> "a"
- "aba" -> "aba"

Input: word = "aabb"            Output: 9
Explanation: The nine wonderful substrings are underlined below:
- "aabb" -> "a"
- "aabb" -> "aa"
- "aabb" -> "aab"
- "aabb" -> "aabb"
- "aabb" -> "a"
- "aabb" -> "abb"
- "aabb" -> "b"
- "aabb" -> "bb"
- "aabb" -> "b"

Input: word = "he"              Output: 2
Explanation: The two wonderful substrings are underlined below:
- "he" -> "h"
- "he" -> "e"

Brute Force: 
- Find all substrings and maintain a map to get count of chars in each substring
- if there is <= 1 odd count characters, ans++ and return the ans;

Another Approach:
- we can use similar approach to the previous question
- we will use cumulative xors to solve this problem

- First, we will solve for all the wonderful substrings with 0 odd occurrences, that will be easy with xor

- Before that, denote chars using some unique number with only 1 set bit, it will be easy to track them down after xor
    a - 1 - 0001
    b - 2 - 0010
    c - 3 - 0100
    d - 4 - 1000
    .
    .
    .
    j

- if cumulative xor from a ^ b ^ b ^ b ^ b = a, it means b ^ b ^ b ^ b = 0, they occur even number of times. 

- maintain a map to store number of times the cumulativexor has occurred before, since we have to find number
  of wonderful substrings.


        0 1 2 3 4 5
let s = a b b c c d, cummulativeXor = 0000 
map[0000] = 1, will later be used to compare

(a)bbccd:
cumulativeXor = 0001, it denotes, only a is present in xor till now, add to map
map[0000] = 1
map[0001] = 1

a(b)bccd:
cumulativeXor = 0011, it denotes, a & b are present in xor till now since that position bits are set, add to map
map[0000] = 1
map[0001] = 1
map[0011] = 1

ab(b)ccd:
cumulativeXor = 0001, we got this already
map[0000] = 1         see the xors, [a]bbcd [abb]ccd, means a ke baad beech me kahi xor = 0 => even characters only
map[0001] = 2         ans += 1 ("bb" from index 0 and 2)
map[0011] = 1        map[0001]++ = 2

abb(c)cd:
cumulativeXor = 0101, denotes a and c are only present in xor, since that position bits are set, add this to map
map[0000] = 1
map[0001] = 2
map[0011] = 1
map[0101] = 1

abbc(c)d:
cumulativeXor = 0001, got this already
map[0000] = 1         see the xors, [a]bbcd [abbcc]d, means a ke baad beech me kahi xor = 0 => even characters only 
map[0001] = 3         ans += 2, ("cc" from index 3 and 4) and ("bbcc" from index 1 and 4) 
map[0011] = 1
map[0101] = 3        map[0001]++ = 3, add this to map

abbcc(d):
cumulativeXor = 1001, denotes a and d are only present in xor, since that position bits are set, add this to map
map[0000] = 1
map[0001] = 2
map[0011] = 1
map[0101] = 1
map[1001] = 1

ans = 3 till now, 

Now, how to get substring with odd number of times repeatitions,

see, at ab(b)ccd:
cumulativeXor [abb] = 0001

Observe that, if there is at most one character in the cumulativeXor which appears odd number of times,
So, if I xor that same character again to this cumulative xor, whole cumulativexor = 0 as everything cancels out

So, approach is, after every iteration, just xor the cumulativeXor with all the characters once,
when we get cumulativeXor ^ (all chars one by one) = already in map, just ans++ since
it denotes that the current substring contains at most one odd character

                                                FULL DRY RUN:

        0 1 2 
let s = a b a, cummulativeXor = 0000 
map[0000] = 1, will later be used to compare

(a)ba:
cumulativeXor = 0001, not found before, add to map
map[0000] = 1
map[0001] = 1

check for odd count chars:
take cumulativeXor with a----j and see if the resultant xor is already there in map, if yes, it means there is odd count
wonderful substring



check cumulativeXor ^ (a--j one by one)  
cumulativeXor ^ 0001(a) === 0000, [0000] is already in map, it means starting ka a ko pakadke substring = "a" = wonderful
cumulativeXor ^ 0010(b) not in map
cumulativeXor ^ 0100(c) not in map    ans += 1
cumulativeXor ^ 1000(d) not in map
.
.
. with j

a(b)a:
cumulativeXor = 0011, not found before, add to map
map[0000] = 1
map[0001] = 1
map[0011] = 1

check for odd count chars: 
check cumulativeXor ^ (a--j one by one) 
cumulativeXor ^ 0001(a) = 0010 = not in map
cumulativeXor ^ 0010(b) = 0001 = in map, means ans += 1, since we get substring "b"
cumulativeXor ^ 0100(c) = 0101 = not in map
cumulativeXor ^ 1000(d) = 1001 = not in map

ab(a):
cumulativeXor = 0010, not found before, add to map
map[0000] = 1
map[0001] = 1
map[0011] = 1
map[0010] = 1

check for odd count chars: 
check cumulativeXor ^ (a--j one by one) 
cumulativeXor ^ 0001(a) = 0011 = in map, means ans += 1, since we get substring "a", the second a
cumulativeXor ^ 0010(b) = 0000 = in map, means ans += 1, since we get substring "aba", with b single odd
cumulativeXor ^ 0100(c) = 0101 = not in map
cumulativeXor ^ 1000(d) = 1001 = not in map

final answer = 4

TC: O(n * k)
SC: O(10) = O(k) */

function wonderfulSubstrings(s: string): number {
    let n: number = s.length;

    // corner case: if single character is there, there is only one wonderful substring 
    if(n === 1) return 1;

    let ans: number = 0;

    /* Denote a---j with single bit number for xor
       a = 0001
       b = 0010          --> this can also be used: console.log('b'.charCodeAt(0) - 'a'.charCodeAt(0))
       c = 0100              But for now, keep things simple by using shifts = i itself in loop
       d = 1000 */

    let charMap = new Map<string, number>();
    let chars: string = "abcdefghij";

    for(let i = 0; i < 10; i++) charMap.set(chars[i], (1 << i));

    let cumulativeXorOccurrenceMap = new Map<number, number>();
    let cummulativeXor: number = 0;

    // add 0000 cumulativeXor first in the map
    cumulativeXorOccurrenceMap.set(cummulativeXor, 1);

    for (let i = 0; i < n; i++) {

        cummulativeXor = cummulativeXor ^  charMap.get(s[i]);

        // Count substrings with no odd-count characters
        if(cumulativeXorOccurrenceMap.has(cummulativeXor)) {
            let count: number = cumulativeXorOccurrenceMap.get(cummulativeXor);
            ans += count;
            cumulativeXorOccurrenceMap.set(cummulativeXor, count + 1)
        }

        if(!(cumulativeXorOccurrenceMap.has(cummulativeXor))) cumulativeXorOccurrenceMap.set(cummulativeXor, 1);

        // Count substrings with exactly one odd-count character
        for (let j = 0; j < 10; j++) {
            let charByCharXor: number = cummulativeXor ^ (1 << j);
            if(cumulativeXorOccurrenceMap.has(charByCharXor)) {
                ans += cumulativeXorOccurrenceMap.get(charByCharXor);
            }
        }
    }

    return ans;
}