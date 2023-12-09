/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    let arrStr = str.split('');
    let count = 0;
    for(let i = 0; i<arrStr.length; i++){
      if(arrStr[i] ==='a'||arrStr[i] ==='e'||arrStr[i] === 'i'||arrStr[i] === 'o'||arrStr[i] ==='u'||arrStr[i] ==='A'||arrStr[i] ==='E'||arrStr[i] === 'I'||arrStr[i] === 'O'||arrStr[i] ==='U' ){
        count++;
      }
    }
    return count;
}
module.exports = countVowels;