/* N = 5, K = 2  Output: 7

Here, k = 2 means actual 2nd position. 

5 => 0 1 0 1
7 => 0 1 1 1

ORIGIN = right.

Logic: 
- do 1 << (k-1) since k is absolute pos and 1 is already at pos = 1 

  let k = 4 and n = 100010
  1 0 0 0 1 0
  0 0 1 0 0 0

- now XOR, since for same bits XOR = 0 and for different bits XOR = 1
    1 0 0 0 1 0
  ^ 0 0 1 0 0 0
    -----------
    1 0 1 0 1 0  so kth bit toggled + rest of the 1s preserved

TC: O(1)
SC: O(1) */

function Toggle_ith_Bit_FromRight(n: number, k: number): number {
    return (n ^ (1 << (k-1)));
}