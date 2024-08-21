/* n = 10 ==>  1010

TRICK:
ex: n = 10  
let binary = ""

 10 % 2 = 0  binary = 0

 5 % 2 = 1   binary = 10

 2 % 2 = 0   binary = 010

 1 % 2 = 1   binary = 1010

 0 --> STOP

- keep dividing n by 2 & noting the remainder
- keep directly attaching that remainder to answer string at the end
- stop when n is 0
- print in reverse order
- Do every operation in bit operators, so that execution is fast

TC: O(logn) since approx bits in a number is logn
SC: O(1) */

function decimalToBinary(n: number): string {
    let binary: string = '';

    while(n > 0) {
        binary = (n % 2) + binary; //automatically prints in reverse order
        n = n >> 1; // n = n/2
    }

    return binary;
}