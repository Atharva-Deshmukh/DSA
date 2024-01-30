/* Swap two numbers using XOR

_________________________
vaise JS me direct swap hota hai
_________________________

LOGIC: a ^ b ^ b is equal to a for any values of a and b. 

a = a ^ b: The XOR of a and b is stored in a.
b = a ^ b: --> (a ^ b) ^ b --> a
a = a ^ b: --> (a ^ b) ^ a --> b

a^b me dono stored hai, a me b daalna hai to a^b ka XOR a ke saath lo
*/

function swapUsingXor(a: number, b: number) {
    console.warn('XOR Swap input -> ' + a + b);
    a = a ^ b;
    b = a ^ b;
    a = a ^ b;

    return [a, b];
}

console.warn('XOR Swap output-> ', swapUsingXor(11,12));

function directSwapJS(a: number, b: number) {
    console.warn('Direct Swap input -> ' + a + b);
    [b, a] = [a, b];

    return [a, b];
}

console.warn('Direct Swap output-> ', directSwapJS(11,12));
