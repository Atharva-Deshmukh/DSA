 /*  Count Occurences of Anagrams

Given a word pat and a text txt. 
Return the count of the occurrences of anagrams of the word in the text.
Anagrams = Permutations from the same characters

Input: txt = "forxxorfxdofr", pat = "for"
Output: 3
Explanation: for, orf and ofr appears in the txt, hence answer is 3.

Input: txt = "aabaabaa", pat = "aaba"
Output: 4
Explanation: aaba is present 4 times in txt.

Constraints:
    1 <= |pat| <= |txt| <= 10^5
    Both strings contain lowercase English letters.

                    Way-1: Rabin karp algo (Rolling hash - Hash sum)
                    -----------------------------------------------

- Since, we need to match multiple patterns, we can think of Rabin Karp algo
- In Rabin Karp, we use a special hash function to hash each string char
- Calculate hash of first window and the pattern string
- keep rolling the hash with window slide
- But the problem is - the hash function needs to produce unique sums for unique hashes 
  different hash encodings can also produce same total sum
  Ex: (1 + 3 + 5) = (2 + 7)
- In such spurious hits/Same hash sums, we check if the matches are anagrams or not, 
  this can cause TLE  if there are many spurious hits


            A simple Better approach: Simply use hashing + sliding window
            -------------------------------------------------------------

- Instead of a hash function, simply maintain 2 hashes of size 256 corresponding to each ASCII char count
- hash1 = hash for pattern
  hash2 = hash for current window

  if(stringify(hash1) === stringify(hash2)) occurrence++

  TC: O(n)
  SC: O(2 * (256)) = O(k) = O(1)

*/

function countOccurencesOfAnagrams(pat: string, txt: string): number {
    let count: number = 0;

    let txt_len: number = txt.length;
    let pat_len: number = pat.length;

    if(txt_len < pat_len) return 0;

    let hashPat = Array<number>(256).fill(0);
    let hashTxt = Array<number>(256).fill(0);


    /* First window
       Here, pat_len is like k for k-sized window
    */
    let k = pat_len;
    let i;
    for (i = 0; i < k; i++) {
        hashPat[pat.charCodeAt(i)]++;
        hashTxt[txt.charCodeAt(i)]++;
    }

    /* Many times, this line can give TLE as its 256 chars */
    if(JSON.stringify(hashPat) === JSON.stringify(hashTxt)) count++;

    /* Subsequent windows */
    for(let i = k; i < txt_len; i++) {

        /* Update the hash */
        hashTxt[txt.charCodeAt(i - k)]--;   /* remove first char of the previous window */
        hashTxt[txt.charCodeAt(i)]++;       /* Add last character of current window */

        /* If current window hash matches the pattern hash, count++ */
        if(JSON.stringify(hashPat) === JSON.stringify(hashTxt)) count++;
    }

    return count;
}
