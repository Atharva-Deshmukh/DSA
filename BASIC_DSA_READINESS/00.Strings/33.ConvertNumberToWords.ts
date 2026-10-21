/*

Input: n = 0
Output: "Zero"

Input: n = 123
Output: "One Hundred Twenty Three"

Input: n = 10245
Output: "Ten Thousand Two Hundred Forty Five"

Input: n = 2147483647
Output: "Two Billion One Hundred Forty Seven Million Four Hundred Eighty Three Thousand Six Hundred Forty Seven"

*/

/* Approach: break the number into groups of 3 digits

   English reads numbers in blocks of three digits, each followed by a scale word:
        2,147,483,647 -> [2]Billion [147]Million [483]Thousand [647]

   1. Special case: 0 -> "Zero" (otherwise the loop would produce an empty string).
   2. Take the last 3 digits using n % 1000, then drop them using Math.floor(n / 1000).
      This yields groups from the least significant to the most significant,
      and the scale word is picked by the group index: "", Thousand, Million, Billion.
   3. Convert one group (1..999) to words:
        - hundreds digit  -> units[v / 100] + "Hundred"
        - remainder >= 20 -> tens[r / 10], then units[r % 10]
        - remainder < 20  -> units[r] directly (10..19 have unique names)
   4. Skip groups equal to 0, so 1,000,010 doesn't print "Thousand" with nothing before it.
   5. Groups come out in reverse order, so reverse them at the end and join with " ".
      Collecting words in an array and joining avoids trailing / double space handling.

   Time:  O(d) where d = number of digits (at most 4 groups for 32-bit ints) -> effectively O(1)
   Space: O(1) (fixed lookup tables + small output)
*/
const UNITS: string[] = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
];

const TENS: string[] = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const SCALES: string[] = ["", "Thousand", "Million", "Billion"];

function convertToWords(n: number): string {
    if(n === 0) return "Zero";

    const words: string[] = [];
    let group: number = 0;

    while(n > 0) {
        let value: number = n % 1000;

        if(value > 0) {
            const part: string[] = [];

            if(value >= 100) {
                part.push(UNITS[Math.floor(value / 100)], "Hundred");
                value = value % 100;
            }

            if(value >= 20) {
                part.push(TENS[Math.floor(value / 10)]);
                value = value % 10;
            }

            if(value > 0) part.push(UNITS[value]);

            if(group > 0) part.push(SCALES[group]);

            // groups are produced right-to-left, so store reversed and flip once at the end
            words.push(part.join(" "));
        }

        n = Math.floor(n / 1000);
        group++;
    }

    return words.reverse().join(" ");
}

console.log(convertToWords(0));          // Zero
console.log(convertToWords(123));        // One Hundred Twenty Three
console.log(convertToWords(10245));      // Ten Thousand Two Hundred Forty Five
console.log(convertToWords(1000010));    // One Million Ten
console.log(convertToWords(2147483647)); // Two Billion One Hundred Forty Seven Million Four Hundred Eighty Three Thousand Six Hundred Forty Seven