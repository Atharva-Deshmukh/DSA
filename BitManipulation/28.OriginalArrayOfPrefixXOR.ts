/* 2433. Find The Original Array of Prefix Xor

You are given an integer pref[] of size n. 
Find and return the arr[] of size n that satisfies:

pref[i] = arr[0] ^ arr[1] ^ ... ^ arr[i].

It can be proven that the answer is unique.

Input: pref = [5,2,0,3,1]           Output: [5,7,2,3,2]
From the array [5,7,2,3,2] we have the following:
- pref[0] = 5.
- pref[1] = 5 ^ 7 = 2.
- pref[2] = 5 ^ 7 ^ 2 = 0.
- pref[3] = 5 ^ 7 ^ 2 ^ 3 = 3.
- pref[4] = 5 ^ 7 ^ 2 ^ 3 ^ 2 = 1.

Input: pref = [13]                  Output: [13]
Explanation: We have pref[0] = arr[0] = 13.

Logic:

- REMEMBER two propeties of XOR,
  Associativity: a ^ (b ^ c) = (a ^ b) ^ c
  Commutativity: (a ^ b) = (b ^ a)

- for given pref[] = [5, 2, 0, 3, 1] 
  we need    ans[] = [a, b, c, d, e]

  We can conclude: 5 = a
                   2 = a ^ b
                   0 = a ^ b ^ c
                   3 = a ^ b ^ c ^ d
                   1 = a ^ b ^ c ^ d ^ e

 ans[0] === pref[0] always.
 5 ^ 2 = a ^ (a ^ b) = (a ^ a) ^ b = b

 basically, every ans[i] = pref[i - 1] ^ pref[i] 

 TC: O(n)
 SC: O(n)  --> we are using extra ans[]

 to make SC = O(1), we need to modify the same array,

 so pref[i] = pref[i] ^ pref[i - 1], but we modified the pref[i] itself now in this iteration, 
 for next iteration, pref[i + 1] = pref[i] ^ pref[i + 1], we will get wrong ans since pref[i] is replaced.

 Solution, since we need prev value and the current value is being modified, instead of starting from 0th index,
 start from the last index and move till i = 1 only, since pref[0] == ans[0] already */

function solution(pref: number[]): number[] {
    let n = pref.length;

    if(n === 1) return pref;

    let ans = new Array(n);
    ans.push(pref[0]);

    for(let i = 1; i < n; i++) {
        ans.push((pref[i - 1] ^ pref[i]));
    }

    return ans;
}

function solutionSpaceEfficient(pref: number[]): number[] {
    let n = pref.length;

    if(n === 1) return pref;

    for(let i = n - 1; i >= 1; i--) {
        pref[i] = (pref[i] ^ pref[i - 1]);
    } 

    return pref;
}