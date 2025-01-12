/* We have been given a string in lowercase alphabets. We need to print substrings that contain all 
the vowels at least one time and there are no consonants (non-vowel characters) present in the substrings.

Input : str = aeoibddaeoiud
Output : aeoiu

Input : str = aeoibsddaeiouudb
Output : aeiou, aeiouu

Naive Approach: (a simple two pointer approach), this is the only possible approach!
- Generate all substrings and when length >= 5
- check if it has all the vowels only or not using a hash
- this will take O(n ^ 3) => O(n ^ 2) for generating all possible substrings and O(n) to verify all vowels

- We can slightly optmise it to O(n ^ 2): have two loops i and j, adding char to substring only if it is a vowel
- i will denote starting character of substring and j will keep adding char to substring generated ONLY 
  if it is a vowel
- when vowel count = 5, print/push that substring
- when we encounter consonant, just i++ to change the start of substring. 
  Now we will see other substring combinations with the new start

TC: O(n ^ 2)
SC: O(1) */

// Helper function to check if a character is a vowel
function isVowel(char: string): boolean {
    return ['a', 'e', 'i', 'o', 'u'].includes(char);
}

function findAllVowelSubstringNaiveApproach(s: string): string[] {
    let n: number = s.length;

    // corner case
    if(n < 5) return [];

    let ans: string[] = [];

    for(let i = 0; i < n; i++) {

        // keep generating a new hash for every substring
        let vowelHash: Map<string, number> = new Map<string, number>();
        let vowelSubstring: string = "";

        for(let j = i; j < n; j++) {
            if(isVowel(s[j]) === true) {
                vowelSubstring += s[j];
                if(!vowelHash.has(s[j])) vowelHash.set(s[j], 1);
                else vowelHash.set(s[j], vowelHash.get(s[j])!+1)

                // whenever map size reaches 5, push that substring
                if(vowelHash.size === 5) ans.push(vowelSubstring);
            } else {
                break;  // break inner loop if we encounter a consonant, i++ automatically occurs
            }
        }
    }

    return ans;
}
