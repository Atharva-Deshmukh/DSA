/*Find position of the only set bit

it must be power of two so verify if its a power of two
and keep left shifting 1 till u get the first set bit from right
*/
function isPowOf2(n) {
    return ((n > 0) && ((n & (n - 1)) === 0));
}
function findSetBitPos(n) {
    let pos = 1, mask = 1;
    if (isPowOf2(n) === true) {
        while ((mask & n) === 0) {
            pos++;
            mask = mask << 1;
        }
    }
    return pos;
}
console.warn('bit position from right', findSetBitPos(8));
