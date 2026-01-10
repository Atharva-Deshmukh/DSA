/* Input:  12 (1100)    Output: 8 (1000)
   Input:  7  (0111)    Output: 6 (0110)

            1 0 1 1 0 0
            0 0 0 1 0 0

Way 1: 
- shift 1 to left till u get rightmost set bit
- perform XOR

TC: O(logn) Worst case is, 1 is shifted to the MSB
SC: O(1) 

Way 2:
- there is an observation
- let n = 1 0 1 1 0 0
    n-1 = 1 0 1 0 1 1

- now AND both, rightmost bit is unset and bits left to it are unchanged

TC: O(1)
SC: O(1) */

function removeLastSetBit(n: number): number {
    if(n === 0) return 0;

    let i: number = 1;
    while((i & n) !== 1) i = i << 1;
    return (n ^ i);
}

function removeLastSetBit(n: number): number {
    return (n & (n-1));
}