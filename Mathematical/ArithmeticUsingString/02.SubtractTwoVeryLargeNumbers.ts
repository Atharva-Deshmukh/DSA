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

/* Assume a > b */
function subtractTwoLargeNumbers(a: string, b: string): string {
    let res: string = "";
    
    const n1: number = a.length;
    const n2: number = b.length;
    
    // corner cases
    if((n2 === 0) && (n1 !== 0)) return a;
    
    let i: number = n1 - 1;
    let j: number = n2 - 1;
    let borrow: number = 0;
    let isBorrowTaken: boolean = false;
    
    while((i >= 0) && (j >= 0)) {
        let d1: number = Number(a[i]);
        let d2: number = Number(b[j]);
        
        // if due to previous operation, borrow was taken, reduce d1 by 1
        // but if d1 is 0, then we make it 9
        if(isBorrowTaken === true) {
            if(d1 === 0) d1 = 9;
            else {
                d1 = d1 - 1;
                isBorrowTaken = false;      // borrow had been consumed
            }
        }
         
        if(d1 < d2) {
            d1 = 10 + d1;
            isBorrowTaken = true;
        }
        
        const difference: number = d1 - d2;
        const digitToPlace: number = difference;
        
        res = digitToPlace + res;
        
        i--;
        j--;
    }
    
    while(i >= 0) {
        let d1: number = Number(a[i]);
        
        // if due to previous operation, borrow was taken, reduce d1 by 1
        // but if d1 is 0, then we make it 9
        if(isBorrowTaken === true) {
            if(d1 === 0) d1 = 9;
            else {
                d1 = d1 - 1;
                isBorrowTaken = false;      // borrow had been consumed
            }
        }
        
        const difference: number = d1;
        const digitToPlace: number = difference;
        
        res = digitToPlace + res;
        
        i--;
    }
  

    return res;
}