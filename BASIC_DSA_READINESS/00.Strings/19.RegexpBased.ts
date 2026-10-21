/* Questions and brief solution approaches:
   ----------------------------------------

Remove special characters:
    Regex: s.replace(/[^a-zA-Z0-9]/g, ''). 
    Manual: keep a char only if it is a letter or digit (check char codes).

Remove all white spaces:
    Regex: s.replace(/\s/g, ''). 
    Manual: build a new string skipping ' '. 

CONCEPT:
    \s matches any whitespace character, not just the space character. 
    That includes tabs (\t), newlines (\n)..

Replace spaces with %20:
    Regex: s.replace(/ /g, '%20'). 
    In-place (URLify): count spaces, then fill from the back with two pointers. 

Remove a specific character:
    s.split(c).join(''), replaceAll(c, ''), or a loop that skips c. 

Extract numbers from a string:
    Regex: s.match(/\d+/g). 
    Manual: scan, build a number while digits continue, push it when a non-digit appears. 
    
Count vowels/consonants/digits/special:
    One pass with if/else: vowel (aeiouAEIOU), letter and not vowel, digit, else special. 

*/