 /* KMP Algo:

Problem with niave algo: whenever there is a mismatch, we again shift back, j = 0 in pattern and i + 1 again in text, we again compare
strings which is redundant

Unlike naive pattern, KMP uses the structure of the pattern to avoid redundant comparisons. 

It preprocesses the pattern string and creates an array called the Longest Prefix Suffix (lps) array which indicates
how much of the pattern can be reused after a mismatch.

WHAT IS LPS?
LPS is the Longest Proper Prefix which is also a Suffix. A proper prefix is a prefix that doesn’t include the whole string. 
For example, prefixes of “abc” are subsets from starting index =>  “”, “a”, “ab”, and “abc” 
but proper prefixes are “”, “a”, and “ab” only. 

Similarly, Suffixes of the string are “”, “c”, “bc”, and “abc”. but proper suffixes => “”, “c”, and “bc”

lps[i] => length of the longest proper prefix of pat[0..i] which is also a suffix of pat[0..i].


CONSTRUCTION OF LPS[]:

let pattern pat = [a, b, a, b, a, a]
            lps = [                ]


 lps[0] is always 0 since a string of length one has no non-empty proper prefix. We store the value of the 
 previous LPS in a variable len, initialized to 0. As we traverse the pattern, we compare the current character at index i, 
 with the character at index len.

      l   i
pat = [a, b, a, b, a, a]    len = 0  l => denotes len pointer in array 
lps = [0               ]    start i with 1 directly since 0 index dekh liya hai already
 
       l  i
pat = [a, b, a, b, a, a]    len = 0   
lps = [0               ]

pat[len] !== pat[i] && len === 0
lps[i] = 0;
i++;

       l     i
pat = [a, b, a, b, a, a]    len = 0  
lps = [0  0            ]

pat[len] === pat[i]
len++;
lps[i] = len;
i++;

          l     i
pat = [a, b, a, b, a, a]    len = 1  
lps = [0  0  1         ]

pat[len] === pat[i]
len++;
lps[i] = len;
i++;

             l     i
pat = [a, b, a, b, a, a]    len = 2  
lps = [0  0  1  2      ]
 
pat[len] === pat[i]
len++;
lps[i] = len;
i++;

                l     i
pat = [a, b, a, b, a, a]    len = 3 
lps = [0  0  1  2  3   ]

pat[len] !== pat[i] && len !== 0
len = lps[len - 1]

          l           i
pat = [a, b, a, b, a, a]    len = 1
lps = [0  0  1  2  3   ]

pat[len] !== pat[i] && len !== 0
len = lps[len - 1]

       l              i
pat = [a, b, a, b, a, a]    len = 0
lps = [0  0  1  2  3   ]

pat[len] === pat[i]
len++
lps[i] = len
i++

       l              i
pat = [a, b, a, b, a, a]    len = 1
lps = [0  0  1  2  3  1]

KMP DRY RUN:



*/

function calculateLPS_Array(pattern: string): number[] {
    let n: number = pattern.length;

    // Corner cases
    if(n === 0) return [];  // empty string
    if(n === 1) return [0]; // single char string

    let lps: number[] = Array(n).fill(0); // initialise the lps[] with 0 of same size, first element will be 0 to cover case => n === 1
    let len: number = 0;
    let i: number = 1;       // start from first index directly

    while(i < n) {
        // if there is match
        if(pattern[len] === pattern[i]) {
            len++;
            lps[i] = len;
            i++;
        }
        else {
            if(len === 0) {
                lps[i] = 0;
                i++;
            } else {
                // Update len to the previous lps value to avoid redundant comparisons
                len = lps[len - 1];
            }
        }
    }
    return lps;
}

    /* To get the lps string also LC 1392

    function longestPrefix(pattern: string): string {
    let n: number = pattern.length;

    // Corner cases
    if(n <= 1) return "";

    let lps: number[] = Array(n).fill(0); // initialise the lps[] with 0 of same size, first element will be 0 to cover case => n === 1
    let len: number = 0;
    let i: number = 1;       // start from first index directly
    let ans: string = "";

    while(i < n) {
        // if there is match
        if(pattern[len] === pattern[i]) {
            len++;
            lps[i] = len;
            i++;
        }
        else {
            if(len === 0) {
                lps[i] = 0;
                i++;
            } else {
                // Update len to the previous lps value to avoid redundant comparisons
                len = lps[len - 1];
            }
        }
    }

    INTUITION:
    Input: s = "abab"
    LPS Array: [0, 0, 1, 2]
    string = ab

    Input: s = "aabcdaabc"
    LPS Array: [0, 1, 0, 0, 0, 1, 2, 3, 4]
    string = aabc

    Input: s = "aaaa"
    LPS Array: [0, 1, 2, 3]
    string = aaa
    
    Corner case:

    Input: s = "babbb"
    LPS Array: [0, 0, 1, 1, 1]
    string = b

    LOGIC to get lps string:
    - get the last value in lps
    - keep concatenating untill it becomes 0



    let num = lps[n - 1];
    let k = n - 1;
    while((k >= 0) && (num > 0)) {
        ans = pattern[k] + ans;
        num--;
        k--;
    }
    

    return ans;
}

*/


