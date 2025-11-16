/* 17. Letter Combinations of a Phone Number

Given a string containing digits from 2-9 inclusive, return all possible 
letter combinations that the number could represent. Return the answer 
in any order.

A mapping of digits to letters (just like on the telephone buttons) is 
given below. Note that 1 does not map to any letters.

Need a hashmap to store the letters corresponding to digits
       
        ┌──────┬───────┬───────┐
        │ 1 ○○ │ 2 abc │ 3 def │
        ├──────┼───────┼───────┤
        │ 4 ghi│ 5 jkl │ 6 mno │
        ├──────┼───────┼───────┤
        │ 7 pqrs│ 8 tuv│ 9 wxyz│
        ├──────┼───────┼───────┤
        │ * +  │ 0 ⎵   │ ⇧  #  │
        └──────┴───────┴───────┘

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Input: digits = "2"
Output: ["a","b","c"]
 

TIME COMPLEXITY

Let:

n = digits.length (up to 4 digits, as per constraints)

Each digit maps to ~3 or 4 letters (max = 4 for '7' and '9')

Worst-case scenario:

If all digits map to 4 letters ("79" etc.), total combinations = 4^n

If all map to 3 letters, total combinations = 3^n

Each recursive path:

Builds a string of length n

Uses currCombo + ch (string concatenation = O(n) per path in JS)

So:
Total combinations = O(3^n to 4^n)
Per combination = O(n)

✅ Final Time Complexity:
Time = O(N × B^N)


Where:

N = length of digits

B = max number of letters per digit (3 or 4)

Worst case: O(n × 4^n)

🧠 SPACE COMPLEXITY
1. Recursive call stack:

Depth = n (one level per digit)

Space = O(n)

2. Output array:

Stores up to B^n combinations

Each of length n

So:

Output space = O(B^n × n)

✅ Final Space Complexity:
Space = O(n + B^n × n)
      = O(n × B^n)
*/

function letterCombinations(digits: string): string[] {
    const output: string[] = [];

    if (!digits.length) return output;

    const charMap: Map<string, string> = new Map([
        ['2', "abc"],
        ['3', "def"],
        ['4', "ghi"],
        ['5', "jkl"],
        ['6', "mno"],
        ['7', "pqrs"],
        ['8', "tuv"],
        ['9', "wxyz"],
    ]);

    function backtrack(currCombo: string, index: number) {
        if (index === digits.length) {
            output.push(currCombo);
            return;
        }

        const letters = charMap.get(digits[index]) || "";
        for (let ch of letters) {
            backtrack(currCombo + ch, index + 1);
        }
    }

    backtrack("", 0);
    return output;
};