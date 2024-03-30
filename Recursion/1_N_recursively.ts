/* Print 1 to n without using loops
You are given an integer N. Print numbers from 1 to N without the help of loops.
Input: N = 5
Output: 1 2 3 4 5

f(5) --> print(5)
   \ 
   f(4) --> print(4)
     \
     f(3)  --> print(3)
       \
       f(2)  --> print(2)
         \
         f(1)  --> print(1)
        
print starts from bottom up
*/
let N = parseInt(prompt("Till what number u want to print -> ", "5 (say)"));

function printSeries(n: number) {
  if (n > 0) {
    printSeries(n - 1);
    console.warn(n);
  }
  return;
}

printSeries(N);