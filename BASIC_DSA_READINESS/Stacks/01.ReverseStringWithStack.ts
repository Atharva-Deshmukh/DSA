import { Stack } from "./Impementation/stack_using_class_number";

function revString(s: string): string {
    let n: number = s.length;

    if(n <= 1) return s;

    let reversedString: string = '';
    let stack = new Stack(n);
    s.split('').forEach((char) => stack.push(Number(char)));

    while(stack.currentSize > 0) {
        stack.pop();
        reversedString += stack.poppedElement;
    }

    return reversedString;
}

console.log(revString('1234')) // "4321" 