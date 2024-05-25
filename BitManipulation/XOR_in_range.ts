import { XOR_1ton } from "./XOR_from_1toN";

/* 
Input: L = 4, R = 8                 Output: 8 
4 ^ 5 ^ 6 ^ 7 ^ 8 = 8

Input: L = 3, R = 7                 Output: 3  

Way 1:
- Initialize answer as zero, Traverse all numbers from L to R and perform XOR of the numbers 
  one by one with the answer. This would take O(N) time.

TC: O(R-L+1)
SC: O(1) 

Way 2: Utilise XOR from 1 to n since we get that in O(1)
- we can easily get XOR from 1 to N using a function done before.
- let L = 4, and R = 7
  (1 ^ 2 ^ 3) ^ (1 ^ 2 ^ 3 ^ 4 ^ 5 ^ 6 ^ 7), so 1, 2 and 3 gets cancelled since a ^ a = 0

  so XOR_1_n(L - R) = XOR_1_n(L - 1) ^ XOR_1_n(R)

TC: O(1)
SC: O(1)

*/

function XOR_L_R(L: number, R: number): number {
    return XOR_1ton(L-1) ^ XOR_1ton(R);    
}