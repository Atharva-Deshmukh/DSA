/* A string contains patterns of the form 1(0+)1 where (0+) represents any non-empty consecutive sequence
 of 0’s. Count all such patterns. The patterns are allowed to overlap.

Note : It contains digits and lowercase characters only. The string is not necessarily a binary. 
100201 is not a valid pattern. 

Examples: 

Input : 1101001
Output : 2 (101) and (1001)

Input : 100001abc101
Output : 2 (100001) and (101)

Approach-1: Directly use Regex
- but this code doesn't account for overlapping pattersn like 101001
- regex in JS do not directly support this
- but due to slicing, it can take O(n^2) worst case

TC: O(n^2)
SC: O(1)

Approach-2: Iterate Directly using two pointers
- Better understand through code :)

TC: O(n)
SC: O(1) */

function regexSolution(str: string): number {
// Regular expression for the pattern
const regex = /10+1/;
  
// Counter
let counter = 0;

// Start index for searching
let startIndex = 0;

// Loop to find overlapping matches
while (startIndex < str.length) {
  const match = regex.exec(str.slice(startIndex));
  if (match) {
    counter++;
    // Move the startIndex by one to find overlapping matches
    startIndex += match.index + 1;
  } else {
    break;
  }
}

return counter;
}

function twoPointerSolution(str: string): number {
    let n: number = str.length;

    if(n < 3) return 0;
    let count: number = 0;
    let start: number = 0;

    while((start < n)) {

        /*  | |                            | |
            1 1 0 0          OR            1 a 0 0 
            
            then

              ||                             ||
            1 1 0 0          OR            1 a 0 0 
        */
        if(((start + 1) < n) && (str[start + 1] !== "0")) {
            start++;
        }
        else {  // if next character is 000... and current char is 1
            if(str[start] === '1') {
                let end = start + 1;  // since start = 1 and we want to iterate 0s
                while((end < n) && (str[end] === '0')) end++;
                if(str[end] === '1') count++;  // 1000...1 ends with 1
                start = end;  // 1000...1 or 100...a  any case, we need to bring iterator on current end
            }
        }
    }
    return count;
}