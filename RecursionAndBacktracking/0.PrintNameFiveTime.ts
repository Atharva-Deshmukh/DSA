function printNameN_Times(n: number): void {

    if(n <= 0) return;

    console.log('AD');

    printNameN_Times(n-1);

    console.log(`F(${n})`);

}

printNameN_Times(5);

/* TREE

       F(5) -> AD
         \ 
         F(4)  -> AD
           \
           F(3)  -> AD
             \
             F(2)  -> AD
               \
               F(1)  -> AD
                 \
                 F(0) -> return

LOG: 
    AD
    AD
    AD
    AD
    AD
    F(1) -> It called F(0) -> loggs F(1)
    F(2) -> It called F(1) -> loggs F(2)
    F(3) -> It called F(2) -> loggs F(3)
    F(4) -> It called F(3) -> loggs F(4)
    F(5) -> It called F(4) -> loggs F(5)
 
*/