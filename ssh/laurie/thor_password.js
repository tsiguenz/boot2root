/*
// > [{v: 0xfd, i: 1}, {v:0x2d5,i:2},{v:0x12d,i:3},{v:0x3e5,i:4},{v:0xd4,i:5},{v:0x1b0,i:6}].sort((a,b) => b.v-a.v) 
[
    { v: 997, i: 4 },
    { v: 725, i: 2 },
    { v: 432, i: 6 },
    { v: 301, i: 3 },
    { v: 253, i: 1 },
    { v: 212, i: 5 }
]
// > ["1b214","2b755","7b524"].map(v => (`Public speaking is very easy.1 2 6 24 120 720${v}9opekma4 2 6 3 1 5`).replace(/ /g, ''))
[
    'Publicspeakingisveryeasy.126241207201b2149opekma426315',
    'Publicspeakingisveryeasy.126241207202b7559opekma426315',
    'Publicspeakingisveryeasy.126241207207b5249opekma426315'
]
// > let possible = Array(128).fill(null).map((_, i)=>  (i & 0xf) == 0 ? String.fromCharCode(i): false).filter(Boolean)
['\u0000', '\u0010', ' ', '0', '@', 'P', '`', 'p']
// > possible.map(p => ["1b214","2b755","7b524"].map(v => (`Public speaking is very easy.1 2 6 24 120 720${v}9o${p}ekma4 2 6 3 1 5`).replace(/ /g, ''))).flat()
[
    'Publicspeakingisveryeasy.126241207201b2149o\u0000ekma426315',
    'Publicspeakingisveryeasy.126241207202b7559o\u0000ekma426315',
    'Publicspeakingisveryeasy.126241207207b5249o\u0000ekma426315',
    'Publicspeakingisveryeasy.126241207201b2149o\u0010ekma426315',
    'Publicspeakingisveryeasy.126241207202b7559o\u0010ekma426315',
    'Publicspeakingisveryeasy.126241207207b5249o\u0010ekma426315',
    'Publicspeakingisveryeasy.126241207201b2149oekma426315',
    'Publicspeakingisveryeasy.126241207202b7559oekma426315',
    'Publicspeakingisveryeasy.126241207207b5249oekma426315',
    'Publicspeakingisveryeasy.126241207201b2149o0ekma426315',
    'Publicspeakingisveryeasy.126241207202b7559o0ekma426315',
    'Publicspeakingisveryeasy.126241207207b5249o0ekma426315',
    'Publicspeakingisveryeasy.126241207201b2149o@ekma426315',
    'Publicspeakingisveryeasy.126241207202b7559o@ekma426315',
    'Publicspeakingisveryeasy.126241207207b5249o@ekma426315',
    'Publicspeakingisveryeasy.126241207201b2149oPekma426315',
    'Publicspeakingisveryeasy.126241207202b7559oPekma426315',
    'Publicspeakingisveryeasy.126241207207b5249oPekma426315',
    'Publicspeakingisveryeasy.126241207201b2149o`ekma426315',
    'Publicspeakingisveryeasy.126241207202b7559o`ekma426315',
    'Publicspeakingisveryeasy.126241207207b5249o`ekma426315',
    'Publicspeakingisveryeasy.126241207201b2149opekma426315',
    'Publicspeakingisveryeasy.126241207202b7559opekma426315',
    'Publicspeakingisveryeasy.126241207207b5249opekma426315'
]
*/
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


const giantsIndex = [/*15,*/ 0, 5, 11, 13, 1]
function generateWords(arrays, prefix = '', index = 0, result = []) {
    if (index === arrays.length) {
        result.push('o'+prefix)
        return;
    }

    arrays[index].forEach(char => generateWords(arrays, prefix + char, index + 1, result));
    return result
}

const start = 'A'.charCodeAt(0), end = 'z'.charCodeAt(0)
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
    return myGiantsWord.map(word => ((`Public speaking is very easy.1 2 6 24 120 720${pass3}9${word}4 2 6 3 1 5`).replace(/ /g, '')))
}).flat()

words.forEach(word=>console.log(word))
