/* 

Input: st[] = [41, 3, 32, 2, 11]
Output: [41, 32, 11, 3, 2]
Explanation: After sorting, the smallest element (2) is at the bottom and the 
largest element (41) is at the top.

*/

function sortedInsert(st, x) {

    // If stack is empty or 
    // top element is smaller, push x
    // we need smaller elements at bottom and larger ones at top
    if (st.length === 0 || st[st.length - 1] <= x) {
        st.push(x);
        return;
    }

    let top = st.pop();

    // Recursively insert x in sorted order
    sortedInsert(st, x);

    st.push(top);
}

/* Keep separating the elements and put them in their correct places - like insert at bottom function */
function sortStack(st) {
    if (st.length === 0) return;

    let top = st.pop();

    /* Recursively sort the remaining stack */
    sortStack(st);
    sortedInsert(st, top);
}