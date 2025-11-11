/* 
Input : 7      Output: 0111
Input :10      Output: 1010

Logic: repeateadly divide by 2 and see if remainder is even or odd
10/2 => 0 => even => 0
5/2  => 1 => odd  => 1
2/2  => 0 => even => 0
1/2  => 1 => odd =>  1

7/2 => 1 => odd =>  1
3/2 => 1 => odd =>  1
1/2 => 1 => odd =>  1


iterative  (using bit operators for efficient calculations)
n = Math.floor(n/2);  // else division will be in float if normal / is used
*/

function dec2bin_it(n: number): string {
   let binary: string = "";

   while(n > 0) {
      if(n%2 & 1) binary = '1' + binary;
      else binary = '0' + binary;
      n = n>>1;  // equivalent to n = Math.floor(n/2);
   }

   return binary;
}

/* Recursive

f(10)                    --> '1010'
   \
   f(5) + '0'            --> '1010'
      \
      f(2) + '1'         --> '101'
         \
         f(1) + '0'      --> '10'
             \ 
            f(0) + '1'   --> '1'

        
*/
function dec2bin_rec(n: number): string {
  if (n === 0) return "";

  if ((n % 2) & 1) return dec2bin_rec(n >> 1) + "1";
  return dec2bin_rec(n >> 1) + "0";
}

let num = 10;
console.warn(dec2bin_rec(num));