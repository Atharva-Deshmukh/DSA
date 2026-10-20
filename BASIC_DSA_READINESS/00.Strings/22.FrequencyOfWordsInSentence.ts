/*
Input: str = "learning to code is learning to create and innovate" 
Output: 
    and 1 
    code 1 
    create 1 
    innovate 1 
    is 1 
    learning 2 
    to 2 


Way-1: Built-in functions
- Use regexp to extract words from sentence - store them in array
- Iterate words[] and store each words[i] - freq in a map
- Printout the map

TC: O(n) + O(words.length) + O(uniqueWords in map iteration)
SC: O(uniqueWords) + O(words.length)

Way-2: Without built-in functions
- Use two pointer appoach to iterate string and extract words
- We will need map anyways

TC: O(n) + O(uniqueWords)
SC: O(uniqueWords)
*/

function frequencyOfWords(s: string): void {
    const n = s.length;

    let map = new Map();
    let i = 0;

    while(i < n) {

        // skip leading / repeated spaces
        while (i < n && s[i] === ' ') i++;
        if (i === n) break;
        
        let wordExtracted = "";
        while((i < n) && (s[i] !== ' ')) {
            wordExtracted += s[i];
            i++;
        }

        if(!map.has(wordExtracted)) map.set(wordExtracted, 1);
        else map.set(wordExtracted, map.get(wordExtracted)! + 1);

        /* Current i is on space (' ') - nudge ahead */
        if(s[i] === ' ') i++;
    }

    for(const [key, value] of map) {
        console.log(key + ' -> ' + value);
    }
}