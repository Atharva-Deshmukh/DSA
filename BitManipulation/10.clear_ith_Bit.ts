/* Input: N = 5, K = 1      Output: 4

here positon is absolute!, i.e k = 1 means first position itself unlike 0-based indexing

5 => 0 1 0 1
4 => 0 1 0 0

ORIGIN = right

Logic: 
- Corner case: k should not be greater than no of bits in N
  
- create a mask of 1s with kth bit = 0, say k = 1 so mask = 1110
- this mask can be achieved by 
  shift 1 to the pos let k = 3 so 1 << 3 => 0 1 0 0
  now, negate this => ~(0 1 0 0) => 1 0 1 1

- now do (mask & n)

Ex: 

5            =>  0 1 0 1
mask         =>  1 1 1 0
5 & mask = 4 =>  0 1 0 0


TC: O(1)
SC: O(1) */

function clear_ith_Bit(n: number, k: number): number {
  if(k > Math.log2(n)) return -1;
    return (n & (~(1 << (k-1))));
}