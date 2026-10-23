/*

Input: str = "aabababa";
Output: Second most frequent character is 'b'
Input: str = "geeksforgeeks";
Output: Second most frequent character is 'g'   

Input: str = "abcd"
Output: No second most frequent character (all counts are equal)

 Approach: frequency map + track top two DISTINCT counts in one pass

   "Second most frequent" means the character with the second highest distinct count:
        "geeksforgeeks" -> e=4 (first), then g/k/s=2 (second)  -> any of them is valid
        "abcd"          -> every count is 1, there is only one distinct count -> no answer

   1. Count every character with a Map                        -> O(n)
   2. Walk the map once, keeping the best two distinct counts:
        - count > first count  : old first becomes second, current becomes first
        - second < count < first : current becomes second
        - count == first count : ignore (ties with the top are not "second")
   3. If no second was found, return null.

   Why not sort? Sorting the entries is O(k log k). One pass over the k distinct
   characters is O(k), so the whole solution is O(n).

   Time:  O(n)
   Space: O(k), k = number of distinct characters (at most 256 for ASCII -> O(1))
*/

/* Dry run: str = "bbbaacc"

   Step 1: freq map (insertion order) = { b: 3, a: 2, c: 2 }

   Step 2: start with first = null (0), second = null (0)

   | char | count | check                                   | first   | second  |
   |------|-------|-----------------------------------------|---------|---------|
   | b    | 3     | 3 > 0 (firstCount)  -> new first        | b (3)   | null    |
   | a    | 2     | 2 < 3 and 2 > 0     -> new second       | b (3)   | a (2)   |
   | c    | 2     | 2 < 3 but 2 > 2 is false -> ignore      | b (3)   | a (2)   |

   Result: second = 'a'  (c also has count 2, so 'c' would be equally valid)

   Another quick one: "abcd" -> freq {a:1, b:1, c:1, d:1}
   a(1) becomes first; b, c, d have count == firstCount, so none qualifies
   -> second stays null -> "No second most frequent character"
*/
function secondMostFrequentChar(str: string): string | null {
    const freq: Map<string, number> = new Map();

    for(const ch of str) {
        freq.set(ch, (freq.get(ch) ?? 0) + 1);
    }

    let firstChar: string | null = null;
    let secondChar: string | null = null;
    let firstCount: number = 0;
    let secondCount: number = 0;

    for(const [char, count] of freq) {
        if(count > firstCount) {
            secondChar = firstChar;    /* old firstChar becomes secondChar */
            firstChar = char;          /* CurrentChar becomes firstChar */
            secondCount = firstCount;  /* old first count becomes second count */
            firstCount = count;        /* Current count becomes firstCount */
        }

        /* secondCount < count < firstCount
           meaning: this character is not the top, but it beats my current second place
           Without this, any smaller character would overwrite a better second place. 
        */
        else if(count < firstCount && count > secondCount) {
            secondChar = char;
            secondCount = count;
        }

        /* anything else viz. tie with first, or not good enough - Ignore */
    }

    
    return secondChar;
}