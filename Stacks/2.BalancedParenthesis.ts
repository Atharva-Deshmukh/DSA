/* A balanced expression is one where every opening bracket has a corresponding 
closing bracket in the correct order.

nput: s = “[{()}]”
Output: true
Explanation:  All the brackets are well-formed.


Input: s = “[()()]{}”
Output: true
Explanation: All the brackets are well-formed.


Input: s = “([]”
Output: false
Explanation: The expression is not balanced as there is a missing ‘)’ at the end.


Input:  s = “([{]})”
Output: false
Explanation: The expression is not balanced because there is a closing ‘]’ before the closing ‘}’.

Approach:
- Iterate the array and whenever we encounter a closed bracket, we must find the corresponding open bracket
  immediately to make the string balanced.
  We will use staor this since we need to know the last open bracket encountered.
- KISI CLOSING BRACKET KE CORRESPONDING AGAR OPEN BRACKET HAI NAHI STACK ME IMMEDIATELY, RETURN FALSE

  let stack = [] and s = "[{()}]"

  s[0] = '[':
    open bracket, push in stack
    stack = ['[']

  s[1] = '{':
    open bracket, push in stack
    stack = ['[', '{']

  s[2] = '{':
    open bracket, push in stack
    stack = ['[', '{', '(']

  s[3] = ')':
    closed bracket, so check if last open bracket encountered, see the stack.top(), 
    if its the corresponding bracket, then pop()
    '(' matches ')' --> pop()
    stack = ['[', '{']

  s[4] = '}':
    closed bracket, so check if last open bracket encountered, see the stack.top(), 
    if its the corresponding bracket, then pop()
    '{' matches '}' --> pop()
    stack = ['[']

  s[4] = ']':
    closed bracket, so check if last open bracket encountered, see the stack.top(), 
    if its the corresponding bracket, then pop()
    '[' matches ']' --> pop()
    stack = []

    if stack is empty at the end, then we must have encountered all open brackets for the closing brackets
    in the correct order, so the string is balanced

    TC: O(n)
    SC: O(n) when string only has open brackets */

import { Stack } from "./Impementation/stack_using_class_string";

function isStringBalanced(s: string) {
    let n: number = s.length;

    if(n === 0) return true;

    let stack = new Stack(n);
    let openBrackets: string = '({[';                                           
    let anyOpenBracketEncountered: boolean = false;  // for case: ')}]'

    for(let i = 0; i < n; i++) {
        if(openBrackets.includes(s[i])) { anyOpenBracketEncountered = true; stack.push(s[i]);}
        else {
            if((stack.top() === '(') && (s[i] === ')')) stack.pop();
            else if((stack.top() === '{') && (s[i] === '}')) stack.pop();
            else if((stack.top() === '[') && (s[i] === ']')) stack.pop();

            // KISI CLOSING BRACKET KE CORRESPONDING AGAR OPEN BRACKET HAI NAHI STACK ME IMMEDIATELY, RETURN FALSE
            else return false;  // Case: ")(){}"
        }
    }

    return ((anyOpenBracketEncountered) && (stack.currentSize === 0));
}