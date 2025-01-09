/* Algo as suggested by Rabin Karp

Idea: calculate hash of pattern and hash of window in text (window len === pat len)
      if the hashes match, check if the strings are actually equal and if they are equal, push the index in ans
      Now, slide the window to next i
      NO NEED to calculate full hash of text of size = window again from scratch, we can use rolling hash concept


Text: "ababcabcacbab"
Pattern: "abc"

To calculate a unique hash, we choose a base (equal to all ASCII Char numbers), a large prime no to take mod

As per Rabin Karp's suggestion, calculate hash in this way:

"abc" = (ASCII(a) * (base ^ 2) + ASCII(b) * (base ^ 1) + ASCII(c) * (base ^ 0))
basically pat_len - 1

do the same for first window "aba"

Now how to slide the window using rolling hash

"aba" = (ASCII(a) * (base ^ 2) + ASCII(b) * (base ^ 1) + ASCII(a) * (base ^ 0))
"bab" = (ASCII(b) * (base ^ 2) + ASCII(a) * (base ^ 1) + ASCII(b) * (base ^ 0))

we simply subtract hash(a) at index i (starting index of window will always be i)


Shift remaining hash to left by base
    if base = 10 and n = 123
    we remove 1 => 023
    to shift 023 => 230, we do (n_remaining * base)

and add the hash of b now which is (i + pat_len) character



CHOOSING base
-----------------------------------------------------------

Why 256?
Extended ASCII Support
Extended ASCII is widely used in text processing. It includes characters like é, ç, and other symbols used in 
various languages. By choosing base=256, the algorithm can handle all these extended characters, making it more 
versatile and applicable for texts beyond just English.

Why Not 128?
Using base=128 would still work for standard ASCII, but it wouldn’t support extended characters.
The computational cost of using base=256 instead of  128 is negligible, as modern processors handle such 
operations efficiently.

Standard ASCII: A, B, C (values: 65, 66, 67)
Extended ASCII: é, ç, ü (values: 233, 231, 252)


HASH CALCULATION
-----------------------------------------------------------
The hash value is calculated as:
hash = ASCII(char1) × 256^(m−1) + ASCII(char2) × 256^(m−2) + ... + ASCII(charm) × 256^0


CHOOSING prime no. for mod
-----------------------------------------------------------
Choose prime = 1e9 + 7. It is a very commonly used large prime number that can be used to calculate mod
such that no of collisions are minimum possible


TC: The average and best-case running time of the Rabin-Karp algorithm is O(n+m), but its worst-case time is O(nm).
The worst case of the Rabin-Karp algorithm occurs when all characters of pattern and text are the same as 
the hash values of all the substrings of T[] match with the hash value of P[]. 
SC: O(1)

Limitations of Rabin-Karp Algorithm
Spurious Hit: When the hash value of the pattern matches with the hash value of a window of the text but 
the window is not the actual pattern then it is called a spurious hit. Spurious hit increases the time 
complexity of the algorithm. In order to minimize spurious hit, we use good hash function. It greatly 
reduces the spurious hit.

*/

function rabinKarpAlgo(pattern: string, txt: string): number[] {
    let pat_len: number = pattern.length;
    let txt_len: number = txt.length;
    
    if(txt_len < pat_len) return [];
    
    let ans: number[] = [];
    let base: number = 256;
    let textHash: number = 0;
    let patternHash: number = 0;
    let hash: number = 1;
    let primeNoForMod: number = 1e9 + 7;


    /* precompute hash = The value of hash would be "pow(base, pat_len-1) % primeForMod" 
       
       For Avoiding Numerical Overflow, we avoid using math.pow()

        Problem: Math.pow(base, pat_len - 1) calculates base^(pat_len-1) directly, which can result in extremely 
        large numbers for even moderate values of pat_len. These large numbers can cause overflow in JavaScript, 
        leading to inaccurate results.

        For Example: If base = 256 and pat_len = 10, 256^9 = 1.84×10^21, which is far beyond safe integer limits.

        Solution: The iterative computation h = (h × base) % primeNoForMod ensures the value of h always remains 
        manageable due to the modulo operation at each step.



        ex: 2 ^ 3, we use modulo exponentiation

        let res = 1 and base = 2

        iteration 1:
            res = res * base;
            res = 2

        iteration 2:
            res = res * base;
            res = 4

        iteration 3:
            res = res * base;
            res = 8

    OBSERVATION: no of iterations = power to calculate */
    for(let i = 1; i <= (pat_len - 1); i++) {
        hash = (hash * base) % primeNoForMod;
    }

    /* LITTLE OPTIMISATION:
    For pattern="abc", base=256, and primeNoForMod=101:

    Original Method:
    Computes 256^2 × ’a’ + 256^1 × ’b’ + 256^0 × ’c’, which involves multiple power calculations.

    Expensive code for this:
    for(let i = 0; i < pat_len; i++) {
        patternHash += ((pattern[i].charCodeAt(0) * Math.pow(base, pat_len - i - 1)) % primeNoForMod);
        textHash += ((txt[i].charCodeAt(0) * Math.pow(base, pat_len - i - 1)) % primeNoForMod);
    }

    Optimized Method:
    Iteratively computes:
    patternHash = (256 × 0 + ’a’) % 101  
    patternHash = (256 × patternHash + ’b’) % 101  
    patternHash = (256 × patternHash + ’c’) % 101  

    Both methods produce the same result, but the optimized method is computationally efficient.*/
    
    /* calculate the hash for the first window and pattern at the same time since window size = pattern size 
       Applying mod at each step keeps the result within the range
    */
    for(let i = 0; i < pat_len; i++) {
        patternHash = (patternHash * base + pattern.charCodeAt(i)) % primeNoForMod;
        textHash = (textHash * base + txt.charCodeAt(i)) % primeNoForMod;
    }

    // final mod of the whole sum to keep full result in proper range
    patternHash = (patternHash % primeNoForMod);
    textHash = (textHash % primeNoForMod);
    
    // slide the window now from 0 to (txt.len - pat.len) 
    for(let i = 0; i <= (txt_len - pat_len); i++) {

        /* Check the hash values of current window of text and pattern. If the 
          hash values match then only check for characters one by one */     
        if(patternHash === textHash) {
            let j: number = 0;
            while((j < pat_len) && (txt[i + j] === pattern[j])) j++;
            if(j === pat_len) ans.push(i);
        }

        /* NEXT WINDOW CALCULATIONS: only done when we have next window, i.e i < (txt_len - pat_len)
           calculate hashes for the next window of txt. Remove leading digit, add trailing digit */

        if(i < (txt_len - pat_len)) {
            // remove leading character
            textHash = (textHash - (txt.charCodeAt(i) * hash)) % primeNoForMod;

            /* Shift remaining hash to left by base
            if base = 10 and n = 123
            we remove 1 => 023
            to shift 023 => 230, we do (n_remaining * base)*/
            textHash = (textHash * base) % primeNoForMod;

            // add trailing character to remaining base
            // can also be written as textHash += ((txt[i + pat_len].charCodeAt(0) * Math.pow(base, 0)) % primeNoForMod);
            textHash = (textHash + (txt[i + pat_len].charCodeAt(0))) % primeNoForMod;

            // during subtraction, hash can become negative, make it positive
            if (textHash < 0) {
                textHash += primeNoForMod;
            }
        }
    }
    
    return ans;
}