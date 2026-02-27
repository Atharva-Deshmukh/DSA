/* 394. Decode String

Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets 
is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces, 
square brackets are well-formed, etc. Furthermore, you may assume that the original data 
does not contain any digits and that digits are only for those repeat numbers, k. 

For example, there will not be input like 3a or 2[4].

The test cases are generated so that the length of the output will never exceed 10^5.

Input: s = "3[a]2[bc]"
Output: "aaabcbc"

Input: s = "3[a2[c]]"
Output: "accaccacc"

Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
 

Constraints:
    1 <= s.length <= 30
    s consists of lowercase English letters, digits, and square brackets '[]'.
    s is guaranteed to be a valid input.
    All the integers in s are in the range [1, 300].

                                                        Approach:
                                                        ---------

- we need to know the previous values like frequency, so we need to use stack here
- Now, push the elements in the stack until a ']' is encountered
- When a ']' is encountered
  => pop and store chars of stack in a string until a '[' is encountered
  => We are also sure that a number is always there before '[', hence pop() '[' and 
     do extractedString.repeat(s.top())
     pop() the number
  => push this result into the stack again and move ahead

  In the end, return the reversed stack

  DRY RUN:
  Input: s = "3[a2[c]]"
  Output: "accaccacc"

  i = 0:
    stack is empty so push
    st = ( 3

  i = 1:
    open bracket, push
    st = ( 3 [

  i = 2:
    char, push
    st = ( 3 [ a

  i = 3:
    number, push
    st = ( 3 [ a 2

  i = 4:
    open bracket, push
    st = ( 3 [ a 2 [

  i = 5:
    char, push
    st = ( 3 [ a 2 [ c

  i = 6:
    ] encountered
    pop and store chars until [ encountered

    extracted chars = c
    pop open bracket and now, st.top() = number
    extractedString.repeat(st.top())
    st.pop(2)

    st = ( 3 [ a

    st.push(extractedString)

    st = ( 3 [ a cc

i = 7: 
    ] encountered
    pop and store chars until [ encountered

    extracted string = cca
    pop() [
    extractedString.repeat(3)
    pop(3)

    st.push(ccaccacca)

    st = ( ccaccacca

Final answer = reverse the stack = accaccacc

*/

class myStack {
    public currentSize: number;
    private stack: string[];

    constructor() {
        this.currentSize = 0;
        this.stack = [];
    }

    push(element: string) {
        this.stack[this.currentSize] = element;
        this.currentSize++;
    }

    /* Just free the memory of the last element stored in the array */
    pop() {
        if (!this.isEmpty()) {
            this.currentSize--;
            this.stack.length = this.currentSize;
        }
    }

    display() {
        console.warn(this.stack);
    }

    top() {
        if (this.currentSize > 0) return this.stack[this.currentSize - 1];
    }

    isEmpty() {
        return (this.currentSize === 0) ? true : false;
    }
};

function decodeString(s: string): string {
    let res: string = "";
    const n: number = s.length;

    let st = new myStack();

    for(let i = 0; i < n; i++) {

        /* Push anything into the stack except closing brackets */
        if(s[i] !== ']') st.push(s[i]);

        /* When closing brackets encountered */
        if(s[i] === ']') {

            let poppedChars: string = "";
            /* Extract chars except [ */
            while((!st.isEmpty()) && (st.top() !== '[')) {
                poppedChars = st.top() + poppedChars;
                st.pop();
            }

            /* pop('[') */
            if(!st.isEmpty()) st.pop();

            /* Its guaranteed that the top of the stack is a number indicating the frequency 
               Note: in case of a non-single digit number, we need to extract whole number
               like 10[a], 100[ac]
            */
            let numStr: string = ""; // to store numbers like "100"
            while((!st.isEmpty()) && (Number.isNaN(st.top()) === false)) {
                numStr = st.top() + numStr;
            }
            
            poppedChars = poppedChars.repeat(Number(numStr));

            /* pop('number') */
            if(!st.isEmpty()) st.pop();

            /* pushed the concatenated result to the answer */
            st.push(poppedChars);
        }
    }

        /* Store the stack in reversed order, this is the decoded string */
    while(!st.isEmpty()) {
        res = st.top() + res;
        st.pop();
    }

    return res;
};