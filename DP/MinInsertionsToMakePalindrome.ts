/* Minimum Insertion Steps to Make a String Palindrome

Solution is same for minimum deletions to make a string palindrome

Given a string s. In one step you can insert any character at any index of the string.
Return the minimum number of steps to make s palindrome.

 
Input: s = "zzazz"             Output: 0
Explanation: The string "zzazz" is already palindrome we do not need any insertions.

Input: s = "mbadm"             Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".


Logic: 
- a simple way to make a string a palindrome is just do str + str.rev(), this gives maximum operations 
  to do this question
- Else, A simple observation => note that the string already has some palindrome, for s = "mbadm", palindrome = "mam", 
  "mbm", "mdm"
- if I preserve this palindrome, I just need to add the remaining strings which are not palindrome in a way like 
  1st point
- so for s = mbadm, and preserved palindrome = mam, I need to look for b and d, either put bd and db between m and a 
  both sides or put db and bd between m and a both sides
- the preserved palindrome is nothing but the longest palindromic subsequence in the string. 
- we need to take the LPS so that we have to adjust the minimum remaining strings (minimum operations to make string 
    palindrome) so, minimum operations = length of string - length of LPS */

function LPS_spaceOptimised(s1: string, s2: string): number {
    let prevRow: number[] = Array(s1.length + 1).fill(0);
    let currRow: number[] = Array(s2.length + 1).fill(0);

    for(let i = 1; i <= s1.length; i++) {
        for(let j = 1; j <= s2.length; j++) {
            if(s1[i-1] === s2[j-1]) currRow[j] = 1 + prevRow[j-1];
            else {
                currRow[j] = Math.max(prevRow[j-1], currRow[j-1]);
            }
        }

        prevRow = [...currRow];
    }

    return currRow[currRow.length-1];
}

function minOps(s: string): number {
    return s.length - LPS_spaceOptimised(s, s.split("").reverse().join(""));
}

