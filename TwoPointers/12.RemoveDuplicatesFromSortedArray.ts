/* 26. Remove Duplicates from Sorted Array

You are given a sorted array arr[] containing positive integers. 
Your task is to remove all duplicate elements from this array such that each element appears only once. 
Return an array containing these distinct elements in the same order as they appeared.

Input: arr[] = [2, 2, 2, 2, 2]
Output: [2]
Explanation: After removing all the duplicates only one instance of 2 will remain i.e. [2] so modified array will contains 2 at first position and you should return array containing [2] after modifying the array.

Input: arr[] = [1, 2, 4]
Output: [1, 2, 4]
Explation:  As the array does not contain any duplicates so you should return [1, 2, 4].

Constraints:
    1 ≤ arr.size() ≤ 10^5
    1 ≤ arr[i] ≤ 10^6


                                                BRUTE FORCE
                                                -----------

- Iterate the array and keep storing everything in a set
- Finally, iterate the set and return all unique elements that are stored in it

TC: O(n)
SC: O(1)


                                              BETTER APPROACH
                                              ---------------
                                    
- Since array is sorted, duplicates will be consequtive, we can use 2 pointers to detect duplicates

i = 0:
j = 0:
     0  1  2  3  4  5
    [2, 2, 3, 3, 3, 4]
     i
     j

Iterate j until some other unique element is found, push a[i] in ans and move i to j

     0  1  2  3  4  5
    [2, 2, 3, 3, 3, 4]
     i     j

     ans = [2]

     0  1  2  3  4  5
    [2, 2, 3, 3, 3, 4]
           i
           j

     0  1  2  3  4  5
    [2, 2, 3, 3, 3, 4]
           i        j

    ans = [2, 3]

     0  1  2  3  4  5
    [2, 2, 3, 3, 3, 4]
                    i
                    j

    ans = [2, 3, 4]
*/

function removeDuplicates(a: number[]): number[] {
    const n = a.length;

    let ans: number[] = [];
    let i = 0, j = 0;

    while (i < n) {

        j = i;

        while (j < n && a[j] === a[i]) j++;

        ans.push(a[i]);

        i = j;
    }

    return ans;
};

/* LC Submission: They expect submitting the index before which there are unique elements

Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
                   0 1 2
Explanation: Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
                   0 1 2 3 4 5

There is a Technique to do this:
- Start with idx = 1 
  (idx is going to hold the index of the next distinct item. Since there is nothing before the 
   first item, we consider it as the first distinct item and begin idx with 1.)
- Loop through the array for i = 0 to n-1.
- At each index i, if (arr[i] !== arr[i-1]) --> arr[idx] = arr[i] and idx++
- After the loop, arr[] contains the unique elements in the first idx positions.

TC: O(n)
SC: O(1) */

function removeDuplicates(a: number[]): number {
    const n = a.length;

    if(n === 1) return 1; /* means till 0th index, we can accomodate unique elements */

    let idx = 1;

    for(let i = 1; i < n; i++) {
        if(a[i] !== a[i - 1]) {
            a[idx] = a[i];
            idx++;
        }
    }

    return idx;
};