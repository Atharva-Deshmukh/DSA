/*
Input: Hello World
Output: olleH dlroW

Input: Geeks for Geeks
Output: skeeG rof skeeG

Note: The string may contain leading or trailing spaces, or multiple spaces between two words. 
The returned string should only have a single space separating the words, and no extra spaces should be included.

Way-1: Use built-in functions

TC: O(n) + O(n) + O(n)
   regexp + for loop + join(' ')

SC: O(n) as we original string is never touched and new strings are returned by built-in functions
*/

function reverseIndividualWords(s: string): string {
    const words = s.match(/\S+/g);
    if (!words) return s;

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].split('').reverse().join('');
    }
    return words.join(' ');
}

/* Way-2: Without using any built-in function

TC: O(n)
SC: O(n) - for storing answer

*/

function reverseWordsOfSentence(s: string): string {
    const n: number = s.length;
    let result: string = "";
    let i: number = 0;
    
    while(i < n) {
        
        while((i < n) && (s[i] === ' ')) i++;
        if(i >= n) break;
        
        let word: string = "";
        while((i < n) && (s[i] !== ' ')) {
            word = s[i] + word;
            i++;
        }
        
        if(result.length > 0) result += " ";
        result += word;
        
    }
    
    return result;
}

console.log(reverseIndividualWords("hello  world")); // "olleh  dlrow"