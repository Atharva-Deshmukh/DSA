/* 75. Sort Colors

Given an array nums with n objects colored red, white, or blue, 
sort them in-place so that objects of the same color are adjacent, 
with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

This problem is the same as the famous "Dutch National Flag problem". It was proposed by Edsger Dijkstra. 

The problem is as follows:
Given n balls of colour red, white or blue arranged in a line in random order. 
You have to arrange all the balls such that the balls with the same colours are adjacent with the 
order of the balls, with the order of the colours being red, white and blue 
(i.e., all red coloured balls come first then the white coloured balls and then the blue coloured balls). 

Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Input: nums = [2,0,1]
Output: [0,1,2]
 

Constraints:
    n == nums.length
    1 <= n <= 300
    nums[i] is either 0, 1, or 2.


Way-1: Simple Array.sort()
       Its not allowed :)

Way-2: Count 0s, 1s and 2s and print them in order - Counting sort 
       But its double pass solution

Way-3: Dutch National Flag algorithm - Its O(n) single pass solution
       initialise 3 pointers
       l = 0
       m = l = 0
       h - (n - 1)

       while(m <= h)
              if(a[m] === 0) 
                     swap(a[l], a[mid])  // 0 needs to be brought leftwards
                     l++
                     m++
              else if(a[m] === 1)
                     m++ // 1 is already at correct location
              else 
                     swap(a[m], a[h])   // 2 needs to be brought rightwards
                     h--;
    

*/

function sort012(a) {
    const n = a.length;

    let l = 0, m = 0, h = (n - 1);

    while(m <= h) {
       if(a[m] === 0) {
              [a[l], a[m]] = [a[m], a[l]];
              l++;
              m++; 
       }
       else if(a[m] === 1) m++;
       else if(a[m] === 2) {
              [a[m], a[h]] = [a[h], a[m]];
              h--;
       }
    }
}

/* Same logic for segregating array with 0s ana 1s

Input: arr[] = [0, 0, 1, 1, 0]
Output: [0, 0, 0, 1, 1]

*/
function segregate0and1(a) {
       const n = a.length;

       let l = 0, m = 0, h = (n - 1);

       while (m <= h) {
              if (a[m] === 0) {
                     [a[l], a[m]] = [a[m], a[l]];
                     l++;
                     m++;
              }
              else if (a[m] === 1) {
                     [a[m], a[h]] = [a[h], a[m]];
                     h--;
              }
       }

}