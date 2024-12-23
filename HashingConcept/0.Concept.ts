/* Hashing refers to the process of generating a fixed-size output from an input of variable size
   using the mathematical formulas known as hash functions.

   Rolling Hash:

   A rolling hash is a hash function that is used to efficiently compute a hash value for a sliding 
   window of data. It is commonly used in computer science and computational biology, where it can be 
   used to detect approximate string matches, find repeated substrings, and perform other operations 
   on sequences of data.

   The idea behind a rolling hash is to compute the hash value for a fixed-size window of data, and 
   then “roll” the window one position at a time and re-compute the hash value. By using a sliding window, 
   the rolling hash can avoid re-computing the hash value from scratch for each position, which can be 
   time-consuming for large data sets. Instead, the rolling hash only needs to update the hash value for 
   the new data that is added or removed from the window.

   The most commonly used algorithm for rolling hashes is the Rabin-Karp algorithm, which uses a polynomial hash 
   function to compute the hash value for the window of data. The polynomial hash function uses the coefficients 
   of a polynomial to represent the window of data, and the hash value is computed by evaluating the polynomial at 
   a fixed point in a finite field. The hash value can be efficiently updated by removing the first coefficient from 
   the polynomial and adding the next coefficient from the sliding window, which can be done in constant time.

   ex: abcd

   we will take a hash function which gives a = 1  // not 0 since 0 * n = 0 and uniqueness of hash can be affected due to this
                                            b = 2
                                            c = 3
                                            d = 4
                                            .
                                            .
                                            .
                                            z = 26

    choose any base P > 26, say p = 31

    hence hash(abcd) = (1 * (31^0)) + (2 * (31^1)) + (3 * (31^2)) + (4 * (31^3))

    we generally do mod so that we can deal with very large values like 31^100

    mod = 1e9 + 7

    this is the most common prime mod where chances of collision are very rare

    -------------------------------------------------------------------------------------------------

                                                AN IMPORTANT FORMULA

        hash[i...j] = (hash[0...j] - hash[0...(i-1)]) / P^i, P = base
*/