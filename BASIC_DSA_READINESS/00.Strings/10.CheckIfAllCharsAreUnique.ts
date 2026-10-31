/* 
Input : abcd10jk
Output : true

Input : hutg9mnd!nk9
Output : false

Approach-1:
- Store everything in a map and check for freq = 1 for every key in the map

TC: O(n) + O(uniqueChars)
SC: O(uniqueChars)

Approach-2:
- No need of map, simply use a set
- If current char already exists in set -> return false, as no point in further computations,
  We don't have unique chars 

TC: O(n)
SC: O(uniqueChars)

Approach-3: Follow-up --> Don't use any extra data structure!
- Declare Array(256).fill(false) | 256 - All ASCII char size
- Iterate the array and if arr[i] = false, turn it true
- If arr[i] = true -> char already exists, hence return false, no point in further progress

TC: O(n)
SC: O(256)
*/

function way3(s: string): boolean {
    const n: number = s.length;
    const MAX_CHARS: number = 256;

    if(n === 0) return true;

    let arrayMap: boolean[] = new Array(MAX_CHARS).fill(false);

    for(let i = 0; i < n; i++) {
        const currentChar: string = s[i];
        const charCode: number = currentChar.charCodeAt(0);

        if(arrayMap[charCode] === false) arrayMap[charCode] = true;
        else return false;
    }

    return true; /* It means till now all unique chars were encountered */
}