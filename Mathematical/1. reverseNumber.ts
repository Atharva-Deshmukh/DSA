/* Input : num = 12345   Output: 54321

   Input : num = 87600   Output: 678
   Trailing zeros should be handle like this

Logic:
- let res;
- ignore the trailing zeros first using a while loop since there can be many zeros
- separate out digits of num and keep doing res*10 + digit except for the first digit

TC: O(log10(N)) since no. of digits in a number are Math.floor(log10(N)) + 1
SC: O(1) */

function revNum(n: number): number {
    if(n === 0) return 0;
    let res: number = 0;

    // ignore trailing zero till the first non-zero digit is obtained
    while(n%10 === 0) {
        n = Math.floor(n/10);
    }

    // start reversing as soon as the first non-zero digit is obtained
    while(n) {
        let digit: number = n%10;
        res = res*10 + digit;
        n = Math.floor(n/10);
    }

    return res;
}