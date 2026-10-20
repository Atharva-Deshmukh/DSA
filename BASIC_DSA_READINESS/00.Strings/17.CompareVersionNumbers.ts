/* 165. Compare Version Numbers

-------------------------------------------------------------------------------------------------------------
                                                CONCEPT

Software version format --> Major.Minor.Patch (e.g., 1.4.2)

• Major (1.x.x): breaking changes, not backward compatible.
• Minor (x.4.x): new features, backward compatible.
• Patch (x.x.2): bug fixes only, no behavior change.

How to Compare Version Numbers

• Compare left to right: major → minor → patch. The first difference decides which is newer.
• Missing parts count as 0: 1.2 is treated as 1.2.0, so 1.2.1 is newer.

-------------------------------------------------------------------------------------------------------------

Given two version strings, version1 and version2, compare them. 
A version string consists of revisions separated by dots '.'. 
The value of the revision is its integer conversion ignoring leading zeros.

To compare version strings, compare their revision values in left-to-right order. 
If one of the version strings has fewer revisions, treat the missing revision values as 0.

Return the following:
    If version1 < version2, return -1.
    If version1 > version2, return 1.
    Otherwise, return 0.
 

Input: version1 = "1.2", version2 = "1.10"
Output: -1
2 < 10, so version1 < version2.

Input: version1 = "1.01", version2 = "1.001"
Output: 0
Ignoring leading zeroes, both "01" and "001" represent the same integer "1".

Input: version1 = "1.0", version2 = "1.0.0.0"
Output: 0
version1 has less revisions, which means every missing revision are treated as "0".


Constraints:
    1 <= version1.length, version2.length <= 500
    version1 and version2 only contain digits and '.'.
    version1 and version2 are valid version numbers.
    All the given revisions in version1 and version2 can be stored in a 32-bit integer.

48 is the ASCII code of the character '0'. Digits '0' to '9' have codes 48 to 57, 
so subtracting 48 turns a digit character into its numeric value.

'0' → 48 - 48 = 0
'1' → 49 - 48 = 1
'7' → 55 - 48 = 7

Use two pointers approach and iterate both versions simultaneously

*/

function versionCompare(v1: string, v2: string)
{
    let i = 0, j = 0;
    let n = v1.length, m = v2.length;

    while (i < n || j < m)
    {
        let num1 = 0, num2 = 0;

        // Extract number from v1
        while (i < n && v1[i] != '.')
        {
            num1 = num1 * 10 + (v1.charCodeAt(i) - '0'.charCodeAt(0));
            i++;
        }

        // Extract number from v2
        while (j < m && v2[j] != '.')
        {
            num2 = num2 * 10 + (v2.charCodeAt(j) - '0'.charCodeAt(0));
            j++;
        }

        // Compare corresponding parts
        if (num1 < num2)
            return -1;
        if (num1 > num2)
            return 1;

        // Move past '.' in V1 and V2
        i++;
        j++;
    }

    return 0;
}

// Driver code
let v1 = "1.0.1";
let v2 = "1";
console.log(versionCompare(v1, v2));