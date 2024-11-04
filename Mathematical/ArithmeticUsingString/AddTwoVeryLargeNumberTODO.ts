/*
a = "34"
b = "28"

sum = 0;
carry = 0;

i = 1:    
    sum = ((((8 + 4) + carry) % 10)) + sum;          sum = 2
    carry = ((8 + 4) + carry) / 10;                  carry = 1

i = 0:
    sum = ((((3 + 2) + carry) % 10) + sum;          sum = 62
    carry = ((3 + 3) + carry) / 10;                 carry = 0

after loop ends
if(carry > 0) sum = carry + sum;

 */

function sumOfLargeNumbers(a: string, b: string): string {
    let sum: string = "";
    let carry: number = 0;

    let n1: number = a.length;
    let n2: number = b.length;

    // corner case: If any one is null, or 0, return the other
    if(n1 === 0) return b;
    if(n2 === 0) return a;

    let i: number = n1-1;
    let j: number = n2-1;

    while((i > 0) && (j > 0)) {
        let d1: number = Number(a[i]);
        let d2: number = Number(b[j]);

        sum = String(((d1 + d2) + carry) % 10) + sum;
        carry = (((d1 + d2) + carry) / 10);

        i--;
        j--;
    }

    // if n1 > n2, n2 will be exhausted and n1 remains
    while(i > 0) {
        let d1: number = Number(a[i]);

        sum = String((d1 + carry) % 10) + sum;
        carry = ((d1 + carry) / 10);

        i--;
    }

    // if n2 > n1, n1 will be exhausted and n2 remains
        while(j > 0) {
        let d2: number = Number(b[j]);

        sum = String((d2 + carry) % 10) + sum;
        carry = ((d2 + carry) / 10);

        j--;
    }

    // if carry remains in last, add it to the sum itself at the beginning
    if(carry > 0) sum = Number(carry) + sum;

    return sum;
}

console.log(sumOfLargeNumbers('12', '12'))



  