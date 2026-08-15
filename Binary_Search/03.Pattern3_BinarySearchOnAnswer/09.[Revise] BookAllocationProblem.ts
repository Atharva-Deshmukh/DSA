/* You have an arr[] of n books, each with arr[i] number of pages. 
m students need to be allocated contiguous books, with each student getting at least one book. 
Out of all the permutations, the goal is to find the permutation 
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
- Don't try out every possible combination of allocation here, that will be very complex
- Better way is to try out every Max Allocated Pages (MAP)

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
                           
                           We will use greedy approach here

NOTE: to get max(...pages[]), we to O(n)
This is acceptable as BS is done on search space, not books[]
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