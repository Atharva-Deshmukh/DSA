/* Input: N = 5, K = 1      Output: 4
5 => 0 1 0 1

and has its first bit 1, so clearing it will result in =>  0 1 0 0 => 4.

Logic: 
- here as per testcases of the question, k means that proper index only not k+1 in case of setting ith bit 
  so shift by k-1 since if k = 1, we don't need shift
- create a mask of 1111 with kth bit as 0, say k = 1 so mask = 1110
- this mask can be achieved by 
  shift 1 to the pos let k = 3 so 1 << 3 => 0 1 0 0
  now, negate this => ~(0 1 0 0) => 1 0 1 1

- now AND this mask with n => mask & n => 0 1 0 0


TC: O(1)
SC: O(1) */

function clear_ith_Bit(n: number, k: number): number {
    return (n & (~(1 << k-1)));
}