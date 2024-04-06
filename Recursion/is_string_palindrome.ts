/*  Iterative: simply use 2 pointer
Input : malayalam Output : Yes  

Since an empty string reads the same forward and backward, it is a palindrome.*/

function isPalindrome_it(s: string): boolean {
    if(s.length <= 1) return true;
    let start = 0; 
    let end = s.length - 1; 

    while(start <= end) {
        if(s[start] !== s[end]) return false;
        start++;
        end--;
    }
    return true;
 }
 
 /* Recursive
 
 f(aba 0,2) 
      \ 
    f(aba 1,1)         
 */
 function isPalindrome_rec(s: string, start: number, end: number): boolean {
   if(s.length <= 1) return true;

   if(s[start] !== s[end]) return false;

   if(start <= end) isPalindrome_rec(s, start + 1, end - 1);

   return true;
 }
 
 let str: string = 'abccba'
//  console.warn(isPalindrome_it(str));
 console.warn(isPalindrome_rec(str, 0 , str.length -1));