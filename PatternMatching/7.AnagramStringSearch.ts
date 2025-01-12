/*  Anagram:
An anagram of a string is another string that contains the same characters, 
only the order of characters can be different.

Given a text txt and a pattern pat of size n and m respectively, the task is to find all occurrences 
of pat and its permutations (or anagrams) in txt. You may assume n > m.

Input: txt = “BACDGABCDA”,  pat = “ABCD”
Output: [0, 5, 6]
Explanation: “BACD” is at 0, “ABCD” at 5 and “BCDA” at 6

Input: txt = “AAABABAA”, pat = “AABA”   
Output:  [0, 1, 4]
Explanation: “AAAB” is at 0, “AABA” at 5 and “ABAA” at 6

NAIVE APPROACH:
- take window length = pat.length keep sliding window till (n - m)
- sort the pattern string
- for each window check if (sorted pattern === sorted current window)
- if they are equal, note the starting index and move window foreward

TC: O(mlogm) for sorting pattern + O(n - m + 1) * (mlogm + m)
                                   window iteration   window sort and window compare
SC: O(m) for storing sorted window


BETTER APPROACH: Rabin karp algo
- Since, we need to match multiple patterns and there is need to maintain a hash and then roll the hash instead
  of recomputing everytime, we can think of Rabin Karp algo
- We will use a very simple hash function which just store the ASCII code of that character.
- Calculate hash of first window and the pattern string
- keep rolling the hash with window slide and verify using rabin karp if the hashes match
- but when there is a spurious hit, we check if the matches are anagrams or not, this can cause TLE if there are many spurious hits


BEST APPROACH: Simply use hashing + sliding window
- simply maintain a hash of size 256 corresponding to each ASCII char count
- maintain two such hash maps in place of any hash function
- Sliding window part will be modified as below

Explaination:

/*                                  
                                    i
                                a b c d        --> window 1
                                | |

                                      i
                                a b c d        --> window 2
                                  | |

                      i is exhausted. THE LAST WINODW IS REMAINING 
                      --------------------------------------------

txt = [b a d a b]  pat = [a b]

hashPat = [a-1, b-1]
hashTxt = [a-1, b-1]  // first window

Start sliding window from (i = m) since we already calculated first window

txt = [(b a)d a b]  pat = [a b]
 
hashPat = [a-1, b-1]
hashTxt = [a-1, b-1] 
Match, push i-m in ans

NEXT WINDOW CALCULATION

hashTxt[i-m]--;
hashTxt[i]++;

TC: O(m) + O((n - m) * 256)
SC: O(256) + O(256) = O(256) + O(k) to store answer */

function naiveApproach(pat: string, txt: string): number[] {
    const n: number = txt.length;
    const m: number = pat.length;

    // sortedpat stores the sorted version of pat
    const sortedpat: string = pat.split('').sort().join('');

    // to store the matching indices
    const res: number[] = [];

    for (let i = 0; i <= n - m; i++) {
        // renamed from temp to curr
        let curr: string = txt.slice(i, i + m).split('').sort().join('');

        // checking if sorted versions are equal
        if (sortedpat === curr) {
            res.push(i);
        }
    }

    return res;
}

// helper for rabin karp
function areAnagrams(s1: string, s2: string): boolean {
    let n1: number = s1.length;
    let n2: number = s2.length;

    if (n1 !== n2) return false;

    s1 = s1.split('').sort().join('');
    s2 = s2.split('').sort().join('');

    for (let i = 0; i < n1; i++) {
        if (s1[i] !== s2[i]) return false;
    }

    return true;
}

function rabinKarpApproach(pat: string, txt: string): number[] {
    let ans: number[] = [];

    let txt_len: number = txt.length;
    let pat_len: number = pat.length;

    if(txt_len < pat_len) return [];

    // calculate pattern hash and first window hash in one iteration beforehand
    let pat_hash: number = 0;
    let txt_hash: number = 0;
    let mod: number = 1e9 + 7;

    // window will be of size pattern only
    for(let i = 0; i < pat_len; i++) {
        pat_hash = (pat_hash +  pat.charCodeAt(i)) % mod;
        txt_hash = (txt_hash +  txt.charCodeAt(i)) % mod;
    }

    pat_hash = (pat_hash) % mod;
    txt_hash = (txt_hash) % mod;

    // Window iteration
    for(let i = 0; i <= (txt_len - pat_len); i++) {
        
        /* If hashes match, check if the two maches are actually anagrams, since
           we have used a weak hash function hence there can be spurious hits */
        if(pat_hash === txt_hash) {
            if(areAnagrams(pat, txt.slice(i, (i + pat_len)))) ans.push(i);
        }

        // Calculate hash for next window
        txt_hash = (txt_hash + txt.charCodeAt(i + pat_len)) % mod;  // add next char to hash
        txt_hash = (txt_hash - txt.charCodeAt(i)) % mod;  // remove starting char hash

        // if text hash is negative due to subtraction
        if(txt_hash < 0) {
            txt_hash += mod;
        }

    }

    return ans;
}


function hashingPlusSlidingWindow(pat: string, txt: string): number[] {
    let ans: number[] = [];

    let txt_len: number = txt.length;
    let pat_len: number = pat.length;

    if(txt_len < pat_len) return [];

    let hashPat = Array<number>(256).fill(0);
    let hashTxt = Array<number>(256).fill(0);


    // calculate pattern hash and first window hash in one iteration beforehand    
    // window will be of size pattern only
    for (let i = 0; i < pat_len; i++) {
        hashPat[pat.charCodeAt(i)]++;
        hashTxt[txt.charCodeAt(i)]++;
    }

    let i: number;
    for(i = pat_len; i < txt_len; i++) {

        // compare both arrays after stringifing them
        if(JSON.stringify(hashPat) === JSON.stringify(hashTxt)) ans.push(i - pat_len);
        
        // set hash for current window
        hashTxt[txt.charCodeAt(i - pat_len)]--;     // remove first char of the previous window
        hashTxt[txt.charCodeAt(i)]++;              // Add last character of current window
    }

    // Check the last window, since i = n - 1 is already stored in hashTxt
    // in for loop every i accounts for (i - m)th window behind
    if(JSON.stringify(hashPat) === JSON.stringify(hashTxt)) ans.push(i - pat_len);

    return ans;
}