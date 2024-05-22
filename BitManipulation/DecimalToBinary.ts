/* Input : n = 10 Output : 1010
- keep dividing n by 2 & noting the remainder
- keep directly attaching that remainder to answer string
- stop when n is 1
- print in reverse order
- Do every operation in bit operators, so that execution is fast

TC: O(logn) since approx bits in a number is logn
SC: O(1)
*/

function decimalToBinary(n: number): string {
    let binary: string = '';

    while(n > 0) {
        binary = (n % 2) + binary; //automatically prints in reverse order
        n = n >> 1; // n = n/2
    }

    return binary;
}