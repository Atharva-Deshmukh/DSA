/* let x = 10, n = 5189

In an array, we store 9815

9*10 = 90 + 0 (carry = 0 initially) -> 0815, carry=9
8*10 + 9 = 89                       -> 0915, carry=8
1*10 + 8 = 18                       -> 0985, carry=1
5*10 + 1 = 51                       -> 0981, carry=5
                -> 0981, carry=5    -> 09815
                REVERSE => 51890
 */

function numRev(n: number, x: number): number[] {
  if (x === 0) return [0];

  let revNum: number[] = [];
  let carry: number = 0;

  // filling the res[] in reverse order
  while (n > 0) {
    revNum.push(n % 10);
    n = Math.floor(n / 10);
  }

  if (x === 1) revNum.reverse();

  // multiplication logic
  for (let i = 0; i < revNum.length; i++) {
    let prod = revNum[i] * x + carry;
    revNum[i] = prod % 10;
    carry = Math.floor(prod / 10);
  }

  // append the carry to the number, carry can have >= 2 digits sometimes, hence break it
  while (carry) {
    revNum.push(carry % 10);
    carry = Math.floor(carry / 10);
  }

  return revNum.reverse();
}

console.log(numRev(12, 200));

let x: number = 12;
let N: number = 200;

console.log(numRev(N, x));
