/*
Input: a[] = [2, 3, 0, 3, 0, 3, 0], b[] = [3, 0, 3, 0] 
Output: [1, 3]
Explanation: The subarray a[1…4] = b[] and subarray a[3…6] = b[].


Input : a[] = [1, 2, 3, 4, 5], b[] = [2, 5, 6]
Output: []
Explanation: No subarray of a[] matches with b[].

Niave Approach:
- generate all subarrays of a[] and check if b === a when length is same, since
  generated subarrays will include different length arrays

                 0  1  2  3  4  5  6
                [2, 3, 0, 3, 0, 3, 0]
                    i     j

                len of subarray = (j - i + 1)
                let k to iterate [i --- j] in this subarray window
                k also iterate simultaneously in b[] form [0, b.len - 1]

                k = 1 in window = k - i = 1 - 1 = 0 in b[]
                k = 2 in window = k - i = 2 - 1 = 1 in b[]
                k = 3 in window = k - i = 3 - 1 = 2 in b[]

Time Complexity
Outer Loop: The first for loop runs O(na), where na is the length of array a.
Inner Loop: The second for loop runs O(na) for the worst-case scenario, iterating through all possible subarray end indices.
Inner Operations: Inside the nested loop:
The while loop runs for O(nb) in the worst case, where nb is the length of b.

Thus, the total time complexity is:
O(na^2 ⋅ nb)

Space Complexity
Space for Variables: Uses constant space O(1) for variables and O(k) for storing results in the array ans, where k is the number of matches.
Auxiliary Space: No additional auxiliary data structures are used.

Thus, the space complexity is:
O(k)

                
-------------------------------------------------------------------
MODIFY KMP algo for arrays


*/

function niaveSoultion(a: number[], b: number[]): number[] {
    let na: number = a.length;
    let nb: number = b.length;
    
    if(nb > na) return [];

    let ans: number[] = [];

    // generate all subarrays
    for(let i = 0; i < na; i++) {
        for(let j = i; j < na; j++) {

            // compare b and subarray only if their lengths are same and store the starting index
            // if subarray and b match fully
            let subArrayLen: number = (j - i + 1);
            if(subArrayLen === nb) {
                let k: number = i;
                let matchCount: number = 0;
                while((k <= j) && (b[k - i] === a[k])) {k++; matchCount++;}
                if(matchCount === nb) ans.push(i);
            }
        }
    }


    return ans;
}

///////////////////////////////////////////////////////////////////////

function calculateLPS_Array(pattern: number[]): number[] {
    let n: number = pattern.length;

    // Corner cases
    if(n === 0) return [];  // empty array
    if(n === 1) return [0]; // single element array

    let lps: number[] = Array(n).fill(0); // initialise the lps[] with 0 of same size, first element will be 0 to cover case => n === 1
    let len: number = 0;
    let i: number = 1;       // start from first index directly

    while(i < n) {
        // if there is match
        if(pattern[len] === pattern[i]) {
            len++;
            lps[i] = len;
            i++;
        }
        else {
            if(len === 0) {
                lps[i] = 0;
                i++;
            } else {
                // Update len to the previous lps value to avoid redundant comparisons
                len = lps[len - 1];
            }
        }
    }
    return lps;
}

function kmpAlgo(pat: number[], txt: number[]): number[] {
    let pat_len: number = pat.length;
    let txt_len: number = txt.length;

    // corner case
    if(txt_len < pat_len) return [];

    let i: number = 0;
    let j: number = 0;
    let ans: number[] = [];

    let lps: number[] = calculateLPS_Array(pat);

    while(i < txt_len) {
        // if there is a match, move both pointers forward
        if(txt[i] === pat[j]) {
            i++;
            j++;

            // if entire pattern is traversed and matched
            // store the starting index of the window
            if(j === pat_len) {
                ans.push(i - j);

                // using lps of previous index to skip redundant comparision
                j = lps[j - 1];
            }
        } 
        // if there is a mismatch 
        else {
            if(j === 0) i++;
            else j = lps[j - 1];
        }
    }

    return ans;
}
