/* Internally, it is implemented as an array only
We can use Array.pop() to take out the last element and Array.push() to add element to the last
But then, it wouldn't be a data structure.

Similarly, for a queue, we can use Array.unshift() to add element in the beginning and 
Array.pop() to pop element from the end.
*/
let stack: number[] = [];
let currentSize = stack.length;

function push(element: number) {
    stack[currentSize] = element; // ensures we always add element to the last index only
    currentSize++;
}

function pop() {

    if(currentSize === 0) alert('Stack is EMPTY');

    currentSize--;
    stack.length = currentSize; // free the memory of last element
}

push(1);
push(2);
push(3);
push(4);
push(5);
pop();

console.warn(stack);

