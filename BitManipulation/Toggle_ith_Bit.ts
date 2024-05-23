/* N = 5, K = 2  Output: 7

5 => 0 1 0 1
and has its second bit 0, so toggling it will result in 0 1 1 1 => 7.

Logic: 
- Here, k means k absolute position, not k+1 th
- do 1 << (k) , let k = 4 and n = 100010
  1 0 0 0 1 0
  0 0 1 0 0 0

- now XOR, since for same bits XOR = 0 and for different bits XOR = 1
    1 0 0 0 1 0
  ^ 0 0 1 0 0 0
    -----------
    1 0 1 0 1 0  so kth bit toggled + 1s preserved

TC: O(1)
SC: O(1) */

function Toggle_ith_Bit(n: number, k: number): number {
    return (n ^ (1 << k-1));
}