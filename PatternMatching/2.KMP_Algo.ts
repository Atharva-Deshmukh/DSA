 /* KMP Algo:

Problem with niave algo: whenever there is a mismatch, we again shift back, j = 0 in pattern and i + 1 
again in text, we again compare strings which is redundant

KMP Algo tries to avoids redundant comparisons. 

It preprocesses the pattern string and creates an array called the Longest proper Prefix Suffix (lps) array 
which indicates how much of the pattern can be reused after a mismatch.

                                                WHAT IS LPS?
LPS is the Longest Proper Prefix which is also a Suffix. A proper prefix is a prefix that doesn’t include 
the whole string. For example, prefixes of “abc” are subsets from starting index =>  “”, “a”, “ab”, and “abc” 
but proper prefixes are “”, “a”, and “ab” only. 

Similarly, Suffixes of the string are “”, “c”, “bc”, and “abc”. but proper suffixes => “”, “c”, and “bc”

lps[i] => length of the longest proper prefix of pat[0..i] which is also a suffix of pat[0..i].

---------------------------------------------------------------------------------------------

pattern = "abacab"

pattern[0..i]	LPS[i]
    a	          0
    ab	          0
    aba	          1        -> "a" is the longest proper prefix which is also a suffix
    abac	      0
    abaca	      1        -> "a" is the longest proper prefix which is also a suffix
    abacab	      2        -> "ab" is the longest proper prefix which is also a suffix



---------------------------------------------------------------------------------------------
                                CONSTRUCTION OF LPS[] on PAT:

let pattern pat = [a, b, a, b, a, a]
            lps = [                ]

 - lps[0] is always 0 since a string of length one has no proper prefix (string of n = 1 will be prefix of 
   its own). 
 - We store the value of the previous LPS in a variable len, initialized to 0. As we traverse the pattern, 
 - we compare the current character at index i, with the character at index len.

      l   i
pat = [a, b, a, b, a, a]    len = 0  l => denotes len pointer in array 
lps = [0               ]    start i with 1 directly since lps[0] = 0
 
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

---------------------------------------------------------------------------------------------
                                        KMP DRY RUN:

- construct lps[] for pattern string
- keep i on txt and j on pat strings and iterate both as given below
- Note that only j moves back in case of mismatch, i always moves foreward

- Whenever txt[i] === pat[j] => i++ and j++;

let txt = [a b a b a b c a b a b c]
let pat = [a b a b c]
let lps = [0 0 1 2 0]

ans = []

 i                             j
[a b a b a b c a b a b c]     [a b a b c]

txt[i] === pat[j]
i++;
j++;

   i                             j
[a b a b a b c a b a b c]     [a b a b c]

txt[i] === pat[j]
i++;
j++;

     i                             j
[a b a b a b c a b a b c]     [a b a b c]

txt[i] === pat[j]
i++;
j++;

       i                             j
[a b a b a b c a b a b c]     [a b a b c]

txt[i] === pat[j]
i++;
j++;

         i                             j
[a b a b a b c a b a b c]     [a b a b c]

txt[i] !== pat[j]  lps = [0 0 1 2 0]
j = lps[j - 1] = 2

         i                         j
[a b a b a b c a b a b c]     [a b a b c]

--> "aba" are already matched, so we can skip redundant comparisons

txt[i] === pat[j]
i++;
j++;

           i                         j
[a b a b a b c a b a b c]     [a b a b c]

txt[i] === pat[j]
i++;
j++;

             i                         j
[a b a b a b c a b a b c]     [a b a b c]

txt[i] === pat[j]             lps = [0 0 1 2 0]
i++;
j++;

               i                         j
[a b a b a b c a b a b c]     [a b a b c]

j === m now

PATTERN TRAVERSED FULLY
j = m = 5
i = 7
ans.push(i - j) since starting point of match will be i - j, j is on m remember.
also, j = lps[j - 1] to explore further matches and avoid redundant comparisions.
j = lps[j - 1] = lps[5 - 1] = lps[4] = 0


               i               j
[a b a b a b c a b a b c]     [a b a b c]

txt[i] === pat[j]
i++;
j++;

                 i               j
[a b a b a b c a b a b c]     [a b a b c]

txt[i] === pat[j]
i++;
j++;

                   i               j
[a b a b a b c a b a b c]     [a b a b c]

txt[i] === pat[j]
i++;
j++;

                     i               j
[a b a b a b c a b a b c]     [a b a b c]

txt[i] === pat[j]
i++;
j++;

                       i               j
[a b a b a b c a b a b c]     [a b a b c]

txt[i] === pat[j]
i++;
j++;

j === m, 

                         i               j
[a b a b a b c a b a b c]     [a b a b c]

ans.push(i - j) = [2, 7]

*/

function calculateLPS_Array(pattern: string): number[] {
    let n: number = pattern.length;

    // Corner cases
    if(n === 0) return [];  // empty string
    if(n === 1) return [0]; // single char string
    
    // initialise the lps[] with 0 of same size, first element will be 0 to cover case => n === 1
    let lps: number[] = Array(n).fill(0); 
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

    /* LC 1392: Along with length, get that LPS string also
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
        - get the last value in lps => let num = lps[n - 1];
        - ans = pattern.substring(0, num); */

function kmpAlgo(pat: string, txt: string): number[] {
    let pat_len: number = pat.length;
    let txt_len: number = txt.length;

    // corner case
    if(txt_len < pat_len) return [];

    let i: number = 0;
    let j: number = 0;
    let ans: number[] = [];

    let lps: number[] = calculateLPS_Array(pat);

    while(i < txt_len) {
        // if there is a match, move both pointers forward
        if(txt[i] === pat[j]) {
            i++;
            j++;

            // if entire pattern is traversed and matched
            // store the starting index of the window
            if(j === pat_len) {
                ans.push(i - j);

                // using lps of previous index to skip redundant comparision
                j = lps[j - 1];
            }
        } 
        // if there is a mismatch 
        else {
            if(j === 0) i++;
            else j = lps[j - 1];
        }
    }

    return ans;
}


