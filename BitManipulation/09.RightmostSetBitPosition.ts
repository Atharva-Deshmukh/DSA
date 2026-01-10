/* CONCEPT:

- let n  = 1 0 1 0 0 1 0 0
    n-1  = 1 0 1 0 0 0 1 1   AND them both
    -------------------------
(n & n-1)= 1 0 1 0 0 0 0 0

    Now, XOR this with original number
     (n & n-1) = 1 0 1 0 0 0 0 0
           (n) = 1 0 1 0 0 1 0 0   XOR THEM BOTH
           ---------------------
    our ans    = 0 0 0 0 0 1 0 0

    So, right most set bit = n ^ (n & (n - 1))

    BUT, this is the bit which gets converted to a number in the output
    to get the bit position, use log2(n) */

    function getRightMostSetBitPosition(n: number): number {
        return Math.log2(n ^ (n & (n - 1)));
    }