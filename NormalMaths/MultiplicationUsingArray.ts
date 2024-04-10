/* let x = 10, n = 5189

In an array, we store 9815

9*10 = 90 + 0 (carry = 0 initially) -> 0815, carry=9
8*10 + 9 = 89                       -> 0915, carry=8
1*10 + 8 = 18                       -> 0985, carry=1
5*10 + 1 = 51                       -> 0981, carry=5
                -> 0981, carry=5    -> 09815
                REVERSE => 51890
 */

function Multiply(N: number, x: number): number[] {
    if(x === 0) return [0];
    let res: number[] = Array<number>();
    let carry: number = 0;

    while(N > 0) {
        res.push(N%10);
        N = Math.floor(N/10);
    }

    for(let i = 0; i < res.length; i++) {
        let product = (res[i] *  x) + carry;
        res[i] = product % 10;
        carry = Math.floor(product / 10);
    }

    if(carry > 0) res.push(carry);

    return res.reverse();
}

let x: number = 12; 
let N: number = 200;

console.log(Multiply(N, x));
