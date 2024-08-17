/* N = 10  K = 2            Output: 14

10 => 1 0 1 0
4  => 1 1 1 0

ORIGIN = left

Logic: 
- Corner case: k should not be greater than no of bits in N

- Since we know the pos to set, create mask = 1 and shift left by k
- Also, 1 is already at 0th pos from right, so by shifting 1 << k, net shift = k + 1 = required shift from left
- n OR mask since we should not loose the set bis in N.

TC: O(1)
SC: O(1) */

function set_ith_Bit(n: number, k: number) {
    if(k > Math.log2(n)) return -1;
    return ((1 << k) | n);
}