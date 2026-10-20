/*
Input  : A computer science portal for geeks
Output : Longest word's length = 8 

Input  : I am an intern at geeksforgeeks
Output : Longest word's length = 13

Way-1: Using built-in functions
- Split(' ') and calculate length

TC: O(n)
SC: O(n) - split() creates new array for each input - adds upto O(n) space

Way-2: Avoid using built-in functions - Simple single pointer approach to memorize

TC: O(n)
SC: O(1)

*/

function longestWordLen(s: string) {
    let n = s.length;
    let res = 0, currLen = 0;

    for (let i = 0; i < n; i++) {
    
        // If current character is not a space,
        // it's part of the current word.
        if (s[i] !== ' ') {
            currLen++;
        } else {
        
            // End of word, update the result 
            // and reset current length.
            res = Math.max(res, currLen);
            currLen = 0;
        }
    }

    // Check last word since there's no space after it.
    return Math.max(res, currLen);
}

