/* The Knuth-Morris-Pratt (KMP) algorithm is a string-searching algorithm which is used to find a  
pattern within large texts efficiently. 

Unlike naive pattern searching algorithm which starts from the beginning of the pattern after each 
mismatch, KMP uses the structure of the pattern to avoid redundant comparisons. It preprocesses the 
pattern string and creates an array called the Longest Prefix Suffix (lps) array which indicates
how much of the pattern can be reused after a mismatch.

Niave Approach:

txt = “abcab”,  
pat = “ab”

txt = “abcabdefabd”,  
pat = “abd”

i = 0 on txt
j = 0 on pat

Iterate both simultaneously and get the matches, when matches fail, start from next index in txt
include corner cases based on pat.length and txt.length 

TC: O((txtLen - patLen + 1) * patLen) 
SC: O(1) -> no extra space */

function niavePatternSearchApproach(txt: string, pat: string): number[] {
    let txtLen: number = txt.length;
    let patLen: number = pat.length;

    // corner case
    if(patLen > txtLen) return [-1];
    
    let ansIndices: number[] = [];

    // iterate each i and keep comparing whole patLen window for each i, Iterate such that
    // in the last iteration, we can accomodate the pattern length so that last window can be compared 
    for(let i = 0; i <= (txtLen - patLen); i++) {
        
        // for each i, compare whole window using (i + j) => i is fixed and 0 <= j < patLen, so we can note i if pattern matches
        let j: number = 0;
        while((j < patLen) && (txt[i + j] === pat[j])) j++;

        // if full pattern match, push starting index
        if(j >= patLen) ansIndices.push(i);
    }

    return ansIndices;
}

/* KMP Algo

*/


