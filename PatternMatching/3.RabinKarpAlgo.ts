/*

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
Choose prime = 1e9 + 7




*/

function rabinKarpAlgo(pattern: string, txt: string): number[] {
    let pat_len: number = pattern.length;
    let txt_len: number = pattern.length;
    
    if(txt_len < pat_len) return [];
    
    let ans: number[] = [];
    let base: number = 266;
    let hash: number = 0;
    let patternHash: number = 0;
    let primeNoForMod: number = 1e9 + 7;

    
    /* calculate the hash for the first window and pattern at the same time since window size = pattern size */
    for(let i = 0; i < pat_len; i++) {
        patternHash += ((pattern[i].charCodeAt(0) * Math.pow(base, pat_len - i - 1)) % primeNoForMod);
       hash += ((txt[i].charCodeAt(0) * Math.pow(base, pat_len - i - 1)) % primeNoForMod);
    }

    // final mod of the sum
    patternHash = (patternHash % primeNoForMod);
    hash = (hash % primeNoForMod);
    
    
    
    return ans;
}