/*
Input: s = "a*(b+c)/d"
Output: /*a+bcd
Explaination: The infix expression is a*(b+c)/d. First, inside the brackets, b + c becomes +bc.
 Now the expression looks like a*(+bc)/d. Next, multiply a with (+bc), so it becomes *a+bc. 
 Finally, divide this result by d, so it becomes /*a+bcd.

Input: s = "(a-b/c)*(a/k-l)"
Output: *-a/bc-/akl
Explaination: The infix expression is (a-b/c)*(a/k-l). First, inside the brackets, 
b/c becomes /bc and a/k becomes /ak.Now the expression looks like (a-/bc) * (/ak-l).
Next, handle the subtractions: a-/bc becomes -a/bc, and /ak-l becomes -/akl. 
Finally, multiply the two results: (-a/bc * -/akl) becomes *-a/bc-/akl.

Approach: 
- Reverse the infix string  because prefix is evaluated from right to left (opposite of postfix)
  [Note: we swap '(' with ')' to maintain the correct grouping of subexpressions ]. 
- infix -> postfix conversion
- Reverse the answer

Note: Prefix = reverse( postfix( reverse(infix) ) )

Ex: 
(A + B) * C - D + F -> F + D - C * ) B + A (
                       F + D - C * ( B + A ) -> Convert opening bracket to closing and vice versa

this bracket swapping because, when we reverse, associativity also gets reversed

Also keep another thing in mind:
- in normal infixToPostfix, we used -> !isRightAssociative(s[i])
  But now, associativity reversed, so use -> isRightAssociative(s[i])
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

function getPriority(operator) {
    if(operator === '^') return 3;
    else if((operator === '/') || (operator === '*')) return 2;
    else if((operator === '+') || (operator === '-')) return 1;
    else return -1;
}

function isOperand(char) {
    if(
        (char >= 'a') && (char <= 'z') ||
        (char >= 'A') && (char <= 'Z') ||
        (char >= '0') && (char <= '9')
    ) return true;
    else return false;
}

function isRightAssociative(op) {
    return op === '^';
}

function infixToPostfix(s) {
    const n = s.length;

    let st = new myStack();
    let ans = "";

    for (let i = 0; i < n; i++) {

        /* If operand, add to result */
        if (isOperand(s[i])) ans += s[i];

        /* If '(' push to stack */
        else if (s[i] === '(') st.push(s[i]);

        /* If ')', pop until '(' */
        else if (s[i] === ')') {
            while (!st.isEmpty() && st.top() !== '(') {
                ans += st.top();
                st.pop();
            }
            if (!st.isEmpty()) st.pop(); // remove '('
        }

        /* If operator, then work based on priority */
        else {
            while (
                !st.isEmpty() &&
                ( getPriority(s[i]) < getPriority(st.top()) ||
                    ( getPriority(s[i]) === getPriority(st.top()) && isRightAssociative(s[i]))
                )
            ) {
                ans += st.top();
                st.pop();
            }
            st.push(s[i]);
        }
    }

    /* Pop remaining operators */
    while (!st.isEmpty()) {
        ans += st.top();
        st.pop();
    }

    return ans;
}

function infixToPrefix(s) {
    const n = s.length;
    let s_rev = "";
    let ans = "";

    for(let i = (n - 1); i >= 0; i--) {
        if(s[i] === "(") s_rev += ")";
        else if(s[i] === ")") s_rev += "(";
        else s_rev += s[i];
    }

    const infixToPostFix = infixToPostfix(s_rev);

    for(let i = (infixToPostFix.length - 1); i >= 0; i--) {
        if(s[i] === "(") ans += ")";
        else if(s[i] === ")") ans += "(";
        else ans += infixToPostFix[i];
    }

    return ans;
}