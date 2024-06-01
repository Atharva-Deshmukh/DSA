class Solution {
    lowerBoundIndexInLIS(LIS, key){
    let n = LIS.length;
    if(n === 0) return -1;
    if(n === 1 && LIS[0] >= key) return 0;

    let low = 0;
    let high = n - 1;
    let ans = n;  //hypothetical initially

    while(low <= high) {
        let mid = low + Math.floor((high - low)/2);
        if(key <= LIS[mid]) {
            ans = (mid < ans)? mid: ans;
            high = mid - 1;
        }
        else if(key > LIS[mid]) low = mid + 1;
    }

    return ans;
}
    maxLength(str)
    {
            let LIS = "";
    
            str.split('').forEach((ele) => {
    
            // if the array is empty, push the current element
            if(LIS === "") LIS = LIS + ele;
    
            // get lower bound index in the LIS[]
            let lbIndex = this.lowerBoundIndexInLIS(LIS, ele);
            if(lbIndex >= LIS.length) LIS = LIS + ele  // if there is no element in the LIS[] to be replaced, simply add this element in the LIS[]
            else LIS = LIS.substring(0, lbIndex) + ele + LIS.substring(lbIndex+1);
            });

           return LIS.length;
    }
}