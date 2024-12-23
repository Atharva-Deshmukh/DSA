/* The Knuth-Morris-Pratt (KMP) algorithm is a string-searching algorithm which is used to find a  
pattern within large texts efficiently. 

Unlike naive pattern searching algorithm which starts from the beginning of the pattern after each 
mismatch, KMP uses the structure of the pattern to avoid redundant comparisons. It preprocesses the 
pattern string and creates an array called the Longest Prefix Suffix (lps) array which indicates
how much of the pattern can be reused after a mismatch.



/* KMP Algo:

Problem with niave algo: whenever there is a mismatch, we again shift back, j = 0 and i + j starts again from i, so redundant comparision


*/


