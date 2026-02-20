/* Use another stack */

/* If stack is just passed as an array
   Use: a second array and simply replace the original array
*/

function reverseStack(st: number[]) {
    let secondStack: number[] = [];

    while (st.length > 0) {
        const top: number = st.pop()!;
        secondStack.push(top);
    }

    st.push(...secondStack);
}

/* Using Recursion
   Here, we need to add the stored element of recusion at the bottom


   Recursion tree for insertAtBottom

 CALL PHASE (Going Down)

    
    Say, value is 4:

        [1,2,3] -> pop and store 3
            [1,2] -> pop and store 2
                [1] -> pop and store 1
                    [] -> push the value passed -> 4

  RETURN PHASE (Coming Up)

    []
    → [4]
    → [4,1]
    → [4,1,2]
    → [4,1,2,3]

*/

function insertAtBottom(st: number[], value: number): void {
    // If stack is empty, push the value passed
    if (st.length === 0) {
        st.push(value);
        return;
    }

    const temp = st.pop()!;
    insertAtBottom(st, value);
    st.push(temp);
}

/* Separate out the elements and insert at bottom */
function reverseStackRec(st: number[]): void {
    /* Base condition */
    if (st.length === 0) return;

    const temp = st.pop()!;
    reverseStackRec(st);
    insertAtBottom(st, temp);
}

/*
    TC: O(n^2) since we are reinserting the element at the bottom of the stack
    SC: O(n) for recursion
*/