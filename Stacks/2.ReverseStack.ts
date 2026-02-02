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