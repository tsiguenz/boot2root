// i 0
// s 1
// r 2
// v 3
// e 4
// a 5
// w 6 
// h 7 
// o 8
// b 9
// p 10
// n 11
// u 12
// t 13
// f 14
// g 15

// giants

String.prototype.fuckSubject = function () {
    if (this.length < 2) {
        return this;
    }
    const charArray = this.split('');

    const secondLastIndex = charArray.length - 2;
    const thirdLastIndex = secondLastIndex - 1;

    const temp = charArray[thirdLastIndex];
    charArray[thirdLastIndex] = charArray[secondLastIndex];
    charArray[secondLastIndex] = temp;

    return charArray.join('');
}

const giantsIndex = [/*15,*/ 0, 5, 11, 13, 1]
function generateWords(arrays, prefix = '', index = 0, result = []) {
    if (index === arrays.length) {
        result.push('o' + prefix)
        return;
    }

    arrays[index].forEach(char => generateWords(arrays, prefix + char, index + 1, result));
    return result
}

const start = 'a'.charCodeAt(0), end = 'z'.charCodeAt(0)
const words = ["1b214"/*, "2b755", "7b524"*/].map(pass3 => {
    let a = []
    let allPossibleChar = giantsIndex.map(c => {
        let allPossibleChar = []
        for (let index = start; index <= end; index++) {
            if ((index & 0xf) == c)
                allPossibleChar.push(String.fromCharCode(index))
        }
        return allPossibleChar
    })
    let myGiantsWord = generateWords(allPossibleChar)
    return myGiantsWord.map(word => ((`Public speaking is very easy.  1 2 6 24 120 720  ${pass3}  9  ${word}  4 2 6 3 1 5`).replace(/ /g, '')).fuckSubject())
}).flat()

words.forEach(word=>console.log(word))
