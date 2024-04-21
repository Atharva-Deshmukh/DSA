/* calculating the nth number in the Fibonacci sequence 

Here, we go from bottom (subproblems) to up (actual problems) and get the new solution for the 
problem from the subproblems. */

function Nth_Fibonacci_Tabulation(n: number): number {
    let table: number[] = [];

    table[0] = 0;
    table[1] = 1;

    if(n < 2) return table[n-1];

    for(let i = 2; i < n; i++) {
        table[i] = table[i-1] + table[i-2];
    }

    return table[table.length - 1];
}

let n: number = 3; // 0, 1, 1, 2, 3, 5, 8
console.warn(Nth_Fibonacci_Tabulation(n));