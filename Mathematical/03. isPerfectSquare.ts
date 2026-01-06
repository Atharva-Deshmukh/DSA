/* Input : n = 2500        Output : Yes
   Input : n = 2555        Output : No

Way 1:
- check if n is positive & get mathematical sqrt and check if sqrt * sqrt === n itself

TC: O(1) since it will be independent of n
SC: O(1)

Way 2: 
- if ceil(sqrt(n)) === floor(sqrt(n)), n is perf. square

TC: O(1)
SC: O(1)

Way 3: WITHOUT using sqrt(n)
- KNOW THAT: sum of odd numbers is a perfect square
- For 1,3,5,7,9,11
- 1 + 3 = 4                      Iterations = 2 = sqrt(4)
- 1 + 3 + 5 = 9                  Iterations = 3 = sqrt(9)
- 1 + 3 + 5 + 7 = 16 and so on,

- So, keep subtracting the odd numbers starting from 1 and check if n becomes 0,
- if(n === 0) then its a perfect square

TC: O(sqrt(n)) approx iterations
SC: O(1) */

function isPerfSquareUsingSqrt(n: number) {
    return (Math.ceil(Math.sqrt(n)) === Math.floor((Math.sqrt(n))));
}

function isPerfSquareWithoutUsingSqrt(n: number) {
    let odd: number = 1;
    while(n > 0) {
        n -= odd;
        odd +=2;
    }
    return n === 0;
}