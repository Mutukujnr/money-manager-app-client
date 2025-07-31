import React from 'react'

export const addThousandsSeparator = (num) => {
 if(num === null || isNaN(num)) return "";

 const numStr = num.toString();
 const parts = numStr.split('.');


 let integerPart = parts[0];
 let fractionalPart = parts[1];

 
}

