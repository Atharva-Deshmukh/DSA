/* Delete Mid of a Stack

Given a stack s, delete the middle element of the stack without using any additional data structure.

Middle element:- floor((size_of_stack+1)/2) (1-based indexing) from the bottom of the stack.

Note: The output shown by the compiler is the stack from top to bottom.

Examples:

Input: s = [10, 20, 30, 40, 50]
Output: [50, 40, 20, 10]
Explanation: The bottom-most element will be 10 and the top-most element will be 50. 
Middle element will be element at index 3 from bottom, which is 30. Deleting 30, 
stack will look like {10 20 40 50}.

Input: s = [10, 20, 30, 40]
Output: [40, 30, 10]
Explanation: The bottom-most element will be 10 and the top-most element will be 40. 
Middle element will be element at index 2 from bottom, which is 20. Deleting 20, stack will look like {10 30 40}.

Input: s = [5, 8, 6, 7, 6, 6, 5, 10, 12, 9]
Output: [9, 12, 10, 5, 6, 7, 6, 8, 5]

Constraints:
- 2 ≤ element of stack ≤ 10^5
- 2 ≤ s.size() ≤ 10^4

                                                Brute Force:
                                                ------------

- Use extra stack
- Transfer all stack elements into another stack and while transfer, if we get the middle element
  don't transfer it into second stack, skip it
- Transfer all the elements back to original stack

We can also use linked list here as extra data structure

TC: O(n)
SC: O(n)


                                        Without Using Extra data structure:
                                        -----------------------------------

- Use Recursion to hold the data temporarily

we need to pop element number = (size + 1)/2 -> this is 1 based indexing
in 0 based indexing for arrays - its (size / 2)

Recursion tree for helper below
- Note all recursive functions share same global stack

    k = (5/2) = 2

    helper(2) || temp = 50, st = [10, 20, 30, 40         -> push 50 while returning -> st = [10 20 40 50
        \
        helper(1) || temp = 40, st = [10, 20, 30         -> push 40 while returning -> st = [10 20 40
            \
            helper(0) -> pop() and simply return  || st = [10, 20
    
*/

function deleteMiddleElementOfStack(st: number[]): void {
    const n = st.length;
    if (n === 0) return;

    const middleIndexFromTop = Math.floor(n / 2);

    /* K will be of range [0 -- middleIndex] */
    function helper(k: number) {
        if (k === 0) {
            st.pop(); /* Don't store this element, simply pop it and return */
            return;
        }

        const temp = st.pop()!;
        helper(k - 1);
        st.push(temp);
    }

    helper(middleIndexFromTop);
}

/* TC: O(n)
   SC: O(n) recursive stack

*/