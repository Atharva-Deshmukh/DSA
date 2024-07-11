/* You have n books, each with arr[i] a number of pages. m students need to be allocated contiguous books, 
with each student getting at least one book. Out of all the permutations, the goal is to find the permutation 
where the sum of the maximum number of pages in a book allotted to a student should be the minimum, out of all 
possible permutations.

Note: Return -1 if a valid assignment is not possible, and allotment should be in contiguous order 
(see the explanation for better understanding).

Input: n = 4, arr[] = [12, 34, 67, 90], m = 2           Output: 113
Allocation can be done in following ways:
{12} and {34, 67, 90} Maximum Pages = 191
{12, 34} and {67, 90} Maximum Pages = 157
{12, 34, 67} and {90} Maximum Pages = 113.
Therefore, the minimum of these cases is 113, which is selected as the output.

corner cases
Input: n = 3, arr[] = [15, 17, 20], m = 5               Output: -1
Allocation can not be done.

If there is only one student, all books will go to him

Expected Time Complexity: O(n logn)
Expected Auxilliary Space: O(1)

Logic:
- we are asked for max. pages that can be allocated to any student, and this should be minimum
- So, iterate for the Max allocated pages possible

let arr = [25, 46, 28, 49, 24] and m = 4

Now, if we iterate from 1 to INT_MAX, its unnecessary, let MAX = 1, I cannot allcoate any book to any student 
since all the books have greater number of pages

Now, if MAP (Max allocated pages) === Math.min(...arr) = 24, I cannot allocate any book after 24 to any student
So, start from Math.max(...arr) = 49, so that every student can be allocated atleast one book

So, low = Math.max(...arr) 
    high = Sum of all arr elements (case m === 1)

lets iterate and dry run now
MAP = 49:
     student 1 - 25  ((25 + 46) > MAP)
     student 2 - 46
     student 3 - 28
     student 4 - 49
     student 5 - 24

     We require 5 students to be able to distribute books with MAP = 49

.
.
.
.
MAP = 71:
    student 1 - 25, 46  ((71) >= MAP)
    student 2 - 28
    student 3 - 49
    student 4 - 24

    so, we can distribute MAP 71 among m = 4 and this is minumum

after 71, we can easily get more answers but 71 is MINIMUM

Since this pattern looks like below, we can think of BS
  X X X X ✓ ✓ ✓ ✓ ✓ 

But Try brute force as well

TC: O((INT_MAX) * books.length)
SC: O(1)
*/

// THIS FUNCTION IS JUST LIKE PROBLEM 17
function isMAP_Possible(books: number[], m: number, MAP: number): boolean {
    let index: number = 0;
    let n: number = books.length;

    // checking if this MAP is possible within given m
    while(m > 0) {
        let sum: number = 0;
        while((index < n) && ((books[index] + sum) <= MAP)) {
            sum = sum + books[index];
            index++;
        }
        m--;
    }

    // if I reached last index, then all books have been allocated within m students
    return (index === n);
}

function bookAllocationBruteForce(books: number[], m: number): number {
    let n: number = books.length;

    // students should be less than no. of books since each student is getting at least one book
    if(m > n) return -1;
    if((n === 1) && (m === 1)) return books[0];
    
    // if there is only one student, all books will go to him
    if(m === 1) return books.reduce((acc, ele) => {
        return acc + ele;
    }, 0);

    let low: number = Number.MAX_SAFE_INTEGER;
    let high: number = 0;

    // getting start and end in one iteration itself
    books.forEach((book) => {
        high = high + book;
        if(book <= low) low = book;
    });

    // MAP -> Maximum allocated pages
    for(let MAP = low; MAP < Number.MAX_SAFE_INTEGER; MAP++) {
        if(isMAP_Possible(books, m, MAP) === true) return MAP;
    }

    return -1;
}

// This can be optimised using BS
function bookAllocationBS(books: number[], m: number): number {
    let n: number = books.length;

    // students should be less than no. of books since each student is getting at least one book
    if(m > n) return -1;
    if((n === 1) && (m === 1)) return books[0];
    
    // if there is only one student, all books will go to him
    if(m === 1) return books.reduce((acc, ele) => {
        return acc + ele;
    }, 0);

    let low: number = Number.MAX_SAFE_INTEGER;
    let high: number = 0;
    let ans: number = Number.MAX_SAFE_INTEGER;

    // getting start and end in one iteration itself
    books.forEach((book) => {
        high = high + book;
        if(book <= low) low = book;
    });

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);
        
        if(isMAP_Possible(books, m, mid) === false) low = mid + 1;
        else {
            high = mid - 1;  //explore smaller possiblities
            ans = (mid < ans)? mid: ans;
        }
    }

    return (ans !== Number.MAX_SAFE_INTEGER)? ans: -1;
}