/* CONCEPT:

- let n  = 1 0 1 0 0 1 0 0
    n-1  = 1 0 1 0 0 0 1 1   AND them both
    -------------------------
(n & n-1)= 1 0 1 0 0 0 0 0

    Now, XOR this with original number
     (n & n-1) = 1 0 1 0 0 0 0 0
           (n) = 1 0 1 0 0 1 0 0   XOR THEM BOTH
           ---------------------
    our ans    = 0 0 0 0 0 1 0 0

*/