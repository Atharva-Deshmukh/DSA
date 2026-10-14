/* Check Consonants and Vowels

You are given a string s, containing only lowercase letters. 
Count the number of vowels and the number of consonants.

    If vowel count > consonant count then print - “Yes”(without quotes).
    If vowel count < consonant count then print - “No”(without quotes).
    If vowel count = consonant count then print - “Same”(without quotes).

Input: s = thequickbrownfoxjumpsoverthelazydog
Output: No

Input: s = aaaaaa
Output: Yes

Input: s = abab
Output: Same

Constraints:
    1 ≤ |s| ≤ 100
    Where, |s| is the size of string.


Approach:
- Store all vowels in a set
- Simply iterate the string and check if the current char belongs to the set
- if yes, vowelCount++ else consonantCount++

TC: O(n)
SC: O(1) -> constant space set is used
*/

function vowelConsonant(s: string): void {

    const n: number = s.length;

    // Map constructor takes one iterable argument, not variadic pairs - Set is also simpler since we never use the value
    const vowelSet: Set<string> = new Set<string>(['a', 'e', 'i', 'o', 'u']);

    let vowelCount: number = 0, consoCount: number = 0;

    for (let i = 0; i < n; i++) {
        if (vowelSet.has(s[i])) vowelCount++;
        else consoCount++;
    }

    if (vowelCount > consoCount) console.log("Yes");
    else if (vowelCount < consoCount) console.log("No");
    else console.log("Same");
}