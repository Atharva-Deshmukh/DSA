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

                                            Way-1: Brute Force
                                            ------------------

Thought proces:
- Seeing the language of the problem, it seems that the brute force will be to try out every possible 
  combinations and then find which student has min maximum pages.
- But how we will determine if this combination HAS min max pages, we will have to keep track of every sum then

- Better way is to try out every Max Allocated Pages (MAP) rather than trying out every combination

- Now we don't need to iterate MAP = [1 --- INT_MAX]
  MAP = 1 --> no student can get any book if array has all elements > 1
  MAP = INT_MAX --> max case is, if a single student has all the books -> sum of all pages --> Its NOT INT_MAX

let arr = [5, 10, 20, 30] and m = 3

our low should be max(pages[])
    high should be sum(pages[])

low = max(pages[])
------------------
- no student will ever receive a book with 29 pages, a full book is to be given to any student
  student-1: 5, 10
  student-2: 20
  student-3: 30

MAP cannot go below 30 = max(...pages[])

high = sum(pages[])
-------------------
- this is obvious that at max, a single student would be allocated all the books = sum(pages[])

MAP will go on increasing by +1 til sum(pages[])

We will get to a MAP which will be minimum max MAP and all m's will get atleast one book in some combination

After this MAP, all MAPs will be greater, we need minimum, hence this pattern looks like below
  
                                        X X X X ✓ ✓ ✓ ✓ ✓ 
                                                |
                                               min

Brute force --> iterate from [max(...pages[]) --- INT_MAX] fully

                                            Way-2: Binary Search Approach
                                            -----------------------------

Binary Search Approach --> [max(...pages[]) --- sum(pages[])]
                           we can clearly see that after some point, all answers will be greater than min
                           use BS directly

                                while(low <= high) {
                                    
                                   if(isThisMAPValid() === true) {
                                        ans = mid;
                                        high = mid - 1 // explore minimum possibilities
                                   } 
                                   else low = mid + 1

                                }

    We now need to figure out this isThisMAPValid()
    for a MAP to be valid:
    - low <= MAP <= high
    - all m's should be consumed (each student should get some book)

    We will use greedy approach here:

    let pages = [5, 10, 20, 30], m = 3

    let MAP = 30
    let index = 0 // we will use index to traverse pages[] rather than loop - just like capacity to ship packages problem

    Don't use a for() inside while() to traverse pages[], it becomes very complicated, 
    Instead, use index/some pointer variable to traverse the array.

    while (m > 0) {
            let pagesPerStudent = 0;

            while((index <= pages.length) && (pagesPerStudent + pages[index]) <= currentMAP) {
                pagesPerStudent += pages[index];
                index++;
            }
                
            m--;  // sum exceeds, then this student cannot be allocated more books, move to next
    }

    return (index === n); // all books are distributed for this MAP among m students

TC: O(n) + O(n log(sum))
     |
getting low and high     

SC: O(1)
*/

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

function bookAllocationBS(books: number[], m: number): number {
    let n: number = books.length;

    // students should be less than no. of books since each student is getting at least one book
    if(m > n) return -1;
    if((n === 1) && (m === 1)) return books[0];
    
    // if there is only one student, all books will go to him
    if(m === 1) return books.reduce((acc, ele) => acc + ele);

    let low: number = Number.MAX_SAFE_INTEGER;
    let high: number = 0;
    let ans: number = Number.MAX_SAFE_INTEGER;

    // getting low and high in one iteration itself
    books.forEach((book) => {
        high = high + book;
        if(book <= low) low = book;
    });

    while(low <= high) {
        let mid: number = low + Math.floor((high - low) / 2);
        
        if(isMAP_Possible(books, m, mid) === true) {
            ans = (mid < ans)? mid: ans;
            high = mid - 1;  //explore smaller possiblities
        }
        else low = mid + 1;
    }

    return (ans !== Number.MAX_SAFE_INTEGER)? ans: -1;
}