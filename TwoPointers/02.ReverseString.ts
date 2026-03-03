/* Reverse String

You are given an array of characters which represents a string s. 
Write a function which reverses a string.

You must do this by modifying the input array in-place with O(1) 
extra memory.


Input: s = ["n","e","e","t"]
Output: ["t","e","e","n"]

Input: s = ["r","a","c","e","c","a","r"]
Output: ["r","a","c","e","c","a","r"]

*/

function reverseString(a) {
    const n = a.length;

    let l = 0, r = (n - 1);

    while (l < r) {
        [a[l], a[r]] = [a[r], a[l]];

        l++;
        r--;
    }

    return a;
}