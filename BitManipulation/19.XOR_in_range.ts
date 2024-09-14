import { XOR_1ton } from "./18.XOR_from_1toN";

/*  Input: L = 4, R = 8                 Output: 8 
4 ^ 5 ^ 6 ^ 7 ^ 8 = 8

Input: L = 3, R = 7                 Output: 3  

Way 1:
- Initialize answer as zero, Traverse all numbers from L to R and perform XOR of the numbers 
  one by one with the answer. This would take O(N) time.

TC: O(R-L+1)
SC: O(1) 

Way 2: Utilise XOR from 1 to n since we get that in O(1)
- we can easily get XOR_1ton() done before.
- let L = 4, and R = 7
  (1 ^ 2 ^ 3) ^ (1 ^ 2 ^ 3 ^ 4 ^ 5 ^ 6 ^ 7), so 1, 2 and 3 gets cancelled since a ^ a = 0

  so XOR_1_n(L - R) = XOR_1_n(L - 1) ^ XOR_1_n(R)

TC: O(1)
SC: O(1) */

function XOR_L_R(L: number, R: number): number {
    return XOR_1ton(L-1) ^ XOR_1ton(R);    
}

/* ---------QUERY BASED ADDITION LEETCODE

1310. XOR Queries of a Subarray
You are given an array arr of positive integers. You are also given the array queries 
where queries[i] = [lefti, righti].
For each query i compute the XOR of elements from lefti to righti 
(that is, arr[lefti] XOR arr[lefti + 1] XOR ... XOR arr[righti] ).

Return an array answer where answer[i] is the answer to the ith query.

Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
Output: [2,7,14,8] 

Explanation: 
The binary representation of the elements in the array are:
1 = 0001 
3 = 0011 
4 = 0100 
8 = 1000 
The XOR values for queries are:
[0,1] = 1 xor 3 = 2 
[1,2] = 3 xor 4 = 7 
[0,3] = 1 xor 3 xor 4 xor 8 = 14 
[3,3] = 8

Input: arr = [4,8,2,10], queries = [[2,3],[1,3],[0,0],[0,3]]
Output: [8,0,4,4]

Brute force:
- Iterate the query array and for each query, iterate the array and get xor
TC  O(query.length * arr.length)
SC: O(1)

Optimisation:
- corner case, if(query[i][0] === query[i][1]) return arr[i];
- Instead of recalculating xor every time, we can precompute xor in a prefix[] and then return the response directly


                                      How to get xor in range now?
                                      ----------------------------

              0  1   2   3   4       2    3
let arr[] = [a1, a2, a3, a4, a5] , (a3 ^ a4) ?

(a3 ^ a4) = (a1 ^ a2 ^ a3 ^ a4) ^ (a1 ^ a2)

=> xor[2, 3] = xor[0, 3] ^ xor[0, (2 - 1)]

ex: Input: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]
Output: [2,7,14,8] 

[0] 1 = 0001       0001 = 1
[1] 3 = 0011       0010 = 2
[2] 4 = 0100       0110 = 6 
[3] 8 = 1000       1110 = 14

[0,1] = 2 
[1,2] = 7 
[0,3] = 14 
[3,3] = 8

let prefix[]: prefix[i] = xor(arr[0]..arr[i]);

xor[1, 2] = (xor[0,0] ^ xor[0, 2]) = (0110 ^ 0001) = 0111 = 7
                       
TC: O(query.length) 
SC: O(arr.length) // for case when every query is like [i, i] and (0 <= i <= arr.length) */

function xorQueries(a: number[], q: number[][]): number[] {
  let l: number = a.length;
  let ql: number = q.length;

  let ans: number[] = [];
  let prefix: number[] = [];
  prefix.push(a[0]); // prefix[0] === a[0] always

  // prefill the prefix array
  for(let i = 1; i < l; i++) prefix[i] = (a[i] ^ prefix[i - 1]);

  q.forEach(([left, right]) => {

    // corner cases
    if(left === right) ans.push(a[left]);
    else if(left === 0) ans.push(prefix[right]);

    else ans.push(prefix[left - 1] ^ prefix[right])
  });

  return ans;
}