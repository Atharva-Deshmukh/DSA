/* N = 10  K = 2            Output: 14

10 => 1 0 1 0

Thus 2nd bit from right is 0. The number after changing
this bit to 1 is: 14(1 1 1 0).

Logic: 
- here by k, we mean k+1 th bit,but since we shift 1, so that extra 1 is compensated, 
  hence we need to left shift 1 by k ONLY
- let i = 1; and 1 << k
- OR it with the number and that position bit is set automatically

TC: O(1)
SC: O(1) */

function set_ith_Bit(n: number, k: number) {
    return ((1 << k) | n);
}