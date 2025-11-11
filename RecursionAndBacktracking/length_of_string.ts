/*Given a string calculate length of the string using recursion. 
Input : str = "abcd"          Output :4
Input : str = "GEEKSFORGEEKS" Output :13

f("abcd", 0)   --> 4
    \
    f("bcd", 1)  --> 3
        \
        f("cd", 2)  --> 2
            \
            f("d", 3)  --> 1
                \
                f("", 4)  --> 0

*/

function strLenRec(s: string): number {
    if(s === "") return 0;

    //  If the starting index is greater than the length of the string, it will return an empty string "".
    return 1 + strLenRec(s.substring(1));
}

let str = "GEEKSFORGEEKS";
console.warn('length -> ', strLenRec(str));