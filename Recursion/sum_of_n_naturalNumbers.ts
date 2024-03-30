/* Input : 3   Output : 6
Explanation : 1 + 2 + 3 = 6

Input : 5      Output : 15
Explanation : 1 + 2 + 3 + 4 + 5 = 15


f(3)
 \ 
 3 + f(2)      --> 6
      \
      2 + f (1)  --> 3

*/

function sumOfNRec(n: number): number {
    if(n <= 1) return n;

    return n + sumOfNRec(n-1);
}

console.warn('Sum -> ', sumOfNRec(5))