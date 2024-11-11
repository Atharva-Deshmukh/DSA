/* 
Input : str1 = "11443333311111111100", 
        str2 =     "1144422222221111"       Output : 11442188888888889989

Input :str1 = "122387876566565674",         Output : 122356441111911120
       str2 =     "31435454654554"

Note that in subtraction, if second no. > first no., borrow cannot be used
ex:     4
      - 8              We cannot borrow 10 and make 4 = 14 and then 14 - 8, 
      ----
      - 4   

So, larger number needs to be the first number essentially.

We will need identifyLargerNum()

Scenarios of subtraction:

                      EQUAL LENGTH NUMS
                      -----------------

                        29
                      - 18      Normal and Easy subtraction


                        27
                      - 18     Borrow will end lastly



                      Different LENGTH NUMS
                      ---------------------

                       127
                      - 38 

TC: O(n1 + n2)
SC:  O(max(n1, n2))  While storing larger and smaller number of two inputs  */

/**
 * Returns 1 if s1 is larger or equal
 * Returns 2 if s2 is larger
 * @param s1 
 * @param s2 
 */
function identifyLargerNum(s1: string, s2: string): number {
    let n1: number = s1.length;
    let n2: number = s2.length;

    // Sure shot cases where no comparision needed
    if(n1 > n2) return 1; 
    if(n1 < n2) return 2;

    /* Here we need comparision of just the first digits of both
                299
                300

       So, if first digit is greater, anyhow that whole number is greater */
    if(n1 === n2) {
        return (Number(s1[0]) >= Number(s2[0])) ? 1: 2;
    }

    return -1;
}

function subtractLargeNumbers(s1: string, s2: string): string {
    let difference: string = "";
    let isBorrowTaken: boolean = false;

    let largerNumResp: number = identifyLargerNum(s1, s2);
    
    let largerNum: string ;
    let smallerNum: string;

    if(largerNumResp === 1) {
      largerNum = s1;
      smallerNum = s2;
    } else {
      largerNum = s2;
      smallerNum = s1;
    }

    let n1: number = largerNum.length;
    let n2: number = smallerNum.length;

    // Iterating from end to save reverse overhead
    let i: number = n1 - 1;
    let j: number = n2 - 1;

    // traversing both at once 
    while((i >= 0) && (j >= 0)) {

        let d1: number = Number(largerNum[i]);
        let d2: number = Number(smallerNum[j]);

        if(isBorrowTaken === true) d1 = d1 - 1;    // common in both if and else, hence here

        if(d1 < d2) {                              // After digit--, if num1 < num2, add carry else directly subtract
            d1 = 10 + d1;
            isBorrowTaken = true;
            difference = (d1 - d2) + difference;  // automatically typecasts into string
        } else {
            isBorrowTaken = false;
            difference = (d1 - d2) + difference;
        }

        i--;
        j--;
    }

    // Case when second number is exhausted, we are guaranteed that second num is always
    // less than first num

    while((j <= 0) && (i >= 0)) {
      let d1: number = Number(largerNum[i]);

      if(isBorrowTaken === true) {
        d1 = d1 - 1;
        isBorrowTaken = false;
      }

      difference = d1 + difference;
      i--;
    }

    // remove trailing zeros, reusing existing variable
    i = 0;
    let count: number = 0;
    while(i < difference.length) {
      if(difference[i] === '0') count++;
      i++;
    }

    if(count > 0) difference = difference.substring(count - 1, difference.length);

    return difference;
}