/* Simply use 2 pointer approach in recursive way */

function isStringAPalindrome(str: string, start: number, end: number): boolean {
   if(start > end) return true;
   else {
    if(str.charAt(start) === str.charAt(end)) return isStringAPalindrome(str, start + 1, end - 1);
    else return false;
   }
}

console.log(isStringAPalindrome("abba", 0, 3));
console.log(isStringAPalindrome("abcd", 0, 3));