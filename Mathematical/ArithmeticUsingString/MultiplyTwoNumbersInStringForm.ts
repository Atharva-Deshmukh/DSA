/* Leetcode 43

RELATED: Karatsuba algorithm (Do when there is time)

Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, 
also represented as a string.
Note: You must not use any built-in BigInteger library or convert the inputs to integer directly.

Input: num1 = "2", num2 = "3"
Output: "6"

Input: num1 = "123", num2 = "456"
Output: "56088"


                  1 1
                1 1 1                      1 1 1  -> Multiplication is same (a * b) = (b * a)
                -----                    1 1 1       unlike subtraction, were 4 - 8 !== 8 - 4 by borrow taking
                  1 1
                1 1
              1 1
 

Constraints:
- 1 <= num1.length, num2.length <= 200
- num1 and num2 consist of digits only.
- Both num1 and num2 do not contain any leading zero, except the number 0 itself.

                            -----------------------------------------------

BRUTE FORCE I can think of:
- Store ((digit of second number) * (full first number)) in an array
- Now iterate this array and use AddTwoStrings() done before.
- While iterating, note that index of array = required shift in the product
- Each individual digit of second number is multiplied, hence the product array stores O(len of second number)

Approx TC: O((len of second number) * (max(two array elements each time)))
Approx SC: O(len of second number)
 

Another Method:

                                Some observations to make before dry run:

- we basically multiply every digit of second number to whole first number starting from last


                                            1 1 1
                                            1 1 1
                                           -------
                                            1 1 1    -- shifted by 0 => since we multiplied with 1 at pos = 0
                                          1 1 1 x    -- shifted by 1 => since we multiplied with 1 at pos = 1
                                        1 1 1 x x    -- shifted by 2 => since we multiplied with 1 at pos = 2
                                        -----------
                                        1 2 3 2 1


                                             9 9
                                             9 9
                                           -------
                                            8 9 1    -- shifted by 0
                                          8 9 1 x    -- shifted by 1
                                        -----------
                                          9 8 0 1


- We will store the product directly in a single array. 
- But what will be the size of that product[]

                                            Some Observations: 

                                            4 1 1
                                              2 1
                                           -------
                                            4 1 1
                                          8 2 2 x
                                          --------
                                          8 6 3 1                                          

                                            9 9
                                          * 9 9
                                          -----
                                          9 8 0 1 

                                          9 9 9 9
                                          * 9 9 9                 So, length of product[] <= (n1 + n2)
                                          -----
                                        9 9 8 9 0 0 1

 
  DRY RUN:

  let a = 9 8    product[] = [_, _, _, _]   max_size = (a + b)
      b = 7 6    taken these a and b to make sure every digit is unique

      let productCarry = 0;     We will need two carries to track product and to perform addition while
      let additionCarry = 0;    adding in the array

  - Initialise product[] of size (n1 + n2)
  - Now, iterate second number from last (units place)
  - keep calculating the product and productCarry of each digit with every digit of first number but while
    storing the product in the array, the element in the array must be <= 9.
  - add the product to existing element in the array + additionCarry if any
  - from this number now, the carry and digit to store are calculated.


  Iterate second number from last and multiply each digit of second number with whole first number
  i = 1: 
        (6 * 8) + productCarry(0)  = 48
        digitToStore = 8
        productCarry = 4
        product[] = [8, _, _, _]

        (6 * 9) + productCarry(4)  = 58
        digitToStore = 8
        productCarry = 5
        product[] = [8, 8, _, _]

        productCarry remaining, so place in the end
        product[] = [8, 8, 5, _]

  i = 0: 
        multiply b[i] with every digit of a and store it in array by adding it to the existing array elements
        Start from second element in product[], remember, in multiplication, we shift by 1 for every digit in b

        (7 * 8) + productCarry(0)  = 56
        digitToStore = 6
        productCarry = 5
        product[] = [8, 8, 5, _]
                      + 6
                      -----
                       1 4

        digitToStore = 4
        additionCarry = 1
        product[] = [8, 4, 5, _]
        

        (7 * 9) + productCarry(5)  = 68
        digitToStore = 8
        productCarry = 6
        product[] = [8, 4, 5, _]
                         + 8
                         + 1  additionCarry
                         -----
                         1 4

        digitToStore = 4
        additionCarry = 1
        product[] = [8, 4, 4, 1]

        additionCarry and productCarry still remaining, so add them in last => 1 + 6 = 7

        product[] = [8, 4, 4, 7]

*/

function multiplyTwoStrings(a: string, b: string): string {
  let res: string = "";

  // Edge case
  if (a === "0" || b === "0") return "0";

  let n1: number = a.length;
  let n2: number = b.length;
  let product: number[] = new Array(n1 + n2).fill(0);

  // Iterate b from last
  for(let i = n2 - 1; i >= 0; i--) {

      // shift = index distance between any digit of b and last digit of b
      let shift: number = (n2 - 1) - i;

      // Each product with current digit of b needs separate carries to avoid addition with previous carries
      let additionCarry: number = 0;
      let productCarry: number = 0;

      // Iterate a from last
      for(let j = n1 - 1; j >= 0; j--) {

          let prod: number = (Number(b[i]) * Number(a[j])) + productCarry;
          let productDigit: number = prod % 10;
          productCarry = Math.floor(prod / 10);

          // product[] is to be filled in reverse order, hence convert the index
          // also we need to modify the existing digit in the array 
          //                                            existing digit + productDigit + carry due to addition
          let totalSumAfterAdditionInArray: number = product[(n1 - 1 - j) + shift] + productDigit + additionCarry;
          let digitToStoreInArray: number = totalSumAfterAdditionInArray % 10;
          additionCarry = Math.floor(totalSumAfterAdditionInArray / 10);
          product[(n1 - 1 - j) + shift] = digitToStoreInArray;

      }

      // if any carry remains, push it in the end
      product[n1 + shift] = product[n1 + shift] + additionCarry + productCarry;

  }

  product.forEach((digit) => {
      res = digit + res;  // elements automatically typecasts since they are added to a string
  });

  // Remove leading zeros, if any
  return res.replace(/^0+/, "");

}








