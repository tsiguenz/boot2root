─[parrot@parrot]─[~]
└──╼ $node
Welcome to Node.js v12.22.12.
Type ".help" for more information.
> [{v: 0xfd, i: 1}, {v:0x2d5,i:2},{v:0x12d,i:3},{v:0x3e5,i:4},{v:0xd4,i:5},{v:0x1b0,i:6}].sort((a,b) => b.v-a.v) 
[
  { v: 997, i: 4 },
  { v: 725, i: 2 },
  { v: 432, i: 6 },
  { v: 301, i: 3 },
  { v: 253, i: 1 },
  { v: 212, i: 5 }
]
> ["1b214","2b755","7b524"].forEach(v => console.log(`Public speaking is very easy.1 2 6 24 120 720${v}9opekma4 2 6 3 1 5`.replaceAll(' ',''))
... )
Uncaught TypeError: v.replaceAll is not a function
    at REPL26:1:122
    at Array.forEach (<anonymous>)
> ["1b214","2b755","7b524"].map(v => (`Public speaking is very easy.1 2 6 24 120 720${v}9opekma4 2 6 3 1 5`))
[
  'Public speaking is very easy.1 2 6 24 120 7201b2149opekma4 2 6 3 1 5',
  'Public speaking is very easy.1 2 6 24 120 7202b7559opekma4 2 6 3 1 5',
  'Public speaking is very easy.1 2 6 24 120 7207b5249opekma4 2 6 3 1 5'
]
> ["1b214","2b755","7b524"].map(v => (`Public speaking is very easy.1 2 6 24 120 720${v}9opekma4 2 6 3 1 5`).replace(' ', ''))
[
  'Publicspeaking is very easy.1 2 6 24 120 7201b2149opekma4 2 6 3 1 5',
  'Publicspeaking is very easy.1 2 6 24 120 7202b7559opekma4 2 6 3 1 5',
  'Publicspeaking is very easy.1 2 6 24 120 7207b5249opekma4 2 6 3 1 5'
]
> ["1b214","2b755","7b524"].map(v => (`Public speaking is very easy.1 2 6 24 120 720${v}9opekma4 2 6 3 1 5`).replace(/ /g, ''))
[
  'Publicspeakingisveryeasy.126241207201b2149opekma426315',
  'Publicspeakingisveryeasy.126241207202b7559opekma426315',
  'Publicspeakingisveryeasy.126241207207b5249opekma426315'
]
> ["1b214","2b755","7b524"].map(v => (`Public speaking is very easy.1 2 6 24 120 720${v}9OPEKMA4 2 6 3 1 5`).replace(/ /g, ''))
[
  'Publicspeakingisveryeasy.126241207201b2149OPEKMA426315',
  'Publicspeakingisveryeasy.126241207202b7559OPEKMA426315',
  'Publicspeakingisveryeasy.126241207207b5249OPEKMA426315'
]
> 
(To exit, press ^C again or ^D or type .exit)
> Array(255).map((_, i)=>String.fromCharCode(i))
[ <255 empty items> ]
> Array(255).map((i, _)=>String.fromCharCode(i))
[ <255 empty items> ]
> Array(255).map((_, _, i)=>String.fromCharCode(i))
Array(255).map((_, _, i)=>String.fromCharCode(i))
                   ^

Uncaught SyntaxError: Duplicate parameter name not allowed in this context
> Array(255).fill(null).map((_, i)=>String.fromCharCode(i)&0xf)
[
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
  ... 155 more items
]
> Array(255).fill(null).map((_, i)=>String.fromCharCode(i & 0xf))
[
  '\u0000', '\u0001', '\u0002', '\u0003', '\u0004', '\u0005', '\u0006',
  '\u0007', '\b',     '\t',     '\n',     '\u000b', '\f',     '\r',
  '\u000e', '\u000f', '\u0000', '\u0001', '\u0002', '\u0003', '\u0004',
  '\u0005', '\u0006', '\u0007', '\b',     '\t',     '\n',     '\u000b',
  '\f',     '\r',     '\u000e', '\u000f', '\u0000', '\u0001', '\u0002',
  '\u0003', '\u0004', '\u0005', '\u0006', '\u0007', '\b',     '\t',
  '\n',     '\u000b', '\f',     '\r',     '\u000e', '\u000f', '\u0000',
  '\u0001', '\u0002', '\u0003', '\u0004', '\u0005', '\u0006', '\u0007',
  '\b',     '\t',     '\n',     '\u000b', '\f',     '\r',     '\u000e',
  '\u000f', '\u0000', '\u0001', '\u0002', '\u0003', '\u0004', '\u0005',
  '\u0006', '\u0007', '\b',     '\t',     '\n',     '\u000b', '\f',
  '\r',     '\u000e', '\u000f', '\u0000', '\u0001', '\u0002', '\u0003',
  '\u0004', '\u0005', '\u0006', '\u0007', '\b',     '\t',     '\n',
  '\u000b', '\f',     '\r',     '\u000e', '\u000f', '\u0000', '\u0001',
  '\u0002', '\u0003',
  ... 155 more items
]
> Array(255).fill(null).map((_, i)=>String.fromCharCode(i ))
[
  '\u0000', '\u0001', '\u0002', '\u0003', '\u0004', '\u0005', '\u0006',
  '\u0007', '\b',     '\t',     '\n',     '\u000b', '\f',     '\r',
  '\u000e', '\u000f', '\u0010', '\u0011', '\u0012', '\u0013', '\u0014',
  '\u0015', '\u0016', '\u0017', '\u0018', '\u0019', '\u001a', '\u001b',
  '\u001c', '\u001d', '\u001e', '\u001f', ' ',      '!',      '"',
  '#',      '$',      '%',      '&',      "'",      '(',      ')',
  '*',      '+',      ',',      '-',      '.',      '/',      '0',
  '1',      '2',      '3',      '4',      '5',      '6',      '7',
  '8',      '9',      ':',      ';',      '<',      '=',      '>',
  '?',      '@',      'A',      'B',      'C',      'D',      'E',
  'F',      'G',      'H',      'I',      'J',      'K',      'L',
  'M',      'N',      'O',      'P',      'Q',      'R',      'S',
  'T',      'U',      'V',      'W',      'X',      'Y',      'Z',
  '[',      '\\',     ']',      '^',      '_',      '`',      'a',
  'b',      'c',
  ... 155 more items
]
> Array(255).fill(null).forEach((_, i)=>{String.})
[1]+  Stopped                 node
┌─[✗]─[parrot@parrot]─[~]
└──╼ $fg
node
> Array(255).fill(null).map((_, i)=>  (i & 0xf) == 0 ? String.fromCharCode(i): false).filter(Boolean)
[ '\u0000', '\u0010', ' ', '0', '@', 'P', '`', 'p', '', '
  '\u0000', '\u0010', ' ',
  '0',      '@',      'P',
  '`',      'p',      '',
  ',       ' ',      '°',
  'À',      'Ð',      'à',
  'ð'
]
> let possible = Array(255).fill(null).map((_, i)=>  (i & 0xf) == 0 ? String.fromCharCode(i): false).filter(Boolean)
undefined
> possible.map(p => ["1b214","2b755","7b524"].map(v => (`Public speaking is very easy.1 2 6 24 120 720${v}9o${p}ekma4 2 6 3 1 5`).replace(/ /g, ''))).flatMap()
Uncaught TypeError: flatMap mapper function is not callable
    at Array.flatMap (<anonymous>)
> possible.map(p => ["1b214","2b755","7b524"].map(v => (`Public speaking is very easy.1 2 6 24 120 720${v}9o${p}ekma4 2 6 3 1 5`).replace(/ /g, '')))
[
  [
    'Publicspeakingisveryeasy.126241207201b2149o\u0000ekma426315',
    'Publicspeakingisveryeasy.126241207202b7559o\u0000ekma426315',
    'Publicspeakingisveryeasy.126241207207b5249o\u0000ekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149o\u0010ekma426315',
    'Publicspeakingisveryeasy.126241207202b7559o\u0010ekma426315',
    'Publicspeakingisveryeasy.126241207207b5249o\u0010ekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149oekma426315',
    'Publicspeakingisveryeasy.126241207202b7559oekma426315',
    'Publicspeakingisveryeasy.126241207207b5249oekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149o0ekma426315',
    'Publicspeakingisveryeasy.126241207202b7559o0ekma426315',
    'Publicspeakingisveryeasy.126241207207b5249o0ekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149o@ekma426315',
    'Publicspeakingisveryeasy.126241207202b7559o@ekma426315',
    'Publicspeakingisveryeasy.126241207207b5249o@ekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149oPekma426315',
    'Publicspeakingisveryeasy.126241207202b7559oPekma426315',
    'Publicspeakingisveryeasy.126241207207b5249oPekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149o`ekma426315',
    'Publicspeakingisveryeasy.126241207202b7559o`ekma426315',
    'Publicspeakingisveryeasy.126241207207b5249o`ekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149opekma426315',
    'Publicspeakingisveryeasy.126241207202b7559opekma426315',
    'Publicspeakingisveryeasy.126241207207b5249opekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149oekma426315',
    'Publicspeakingisveryeasy.126241207202b7559oekma426315',
    'Publicspeakingisveryeasy.126241207207b5249oekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149o,
    'Publicspeakingisveryeasy.126241207202b7559o,
    'Publicspeakingisveryeasy.126241207207b5249o
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149o ekma426315',
    'Publicspeakingisveryeasy.126241207202b7559o ekma426315',
    'Publicspeakingisveryeasy.126241207207b5249o ekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149o°ekma426315',
    'Publicspeakingisveryeasy.126241207202b7559o°ekma426315',
    'Publicspeakingisveryeasy.126241207207b5249o°ekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149oÀekma426315',
    'Publicspeakingisveryeasy.126241207202b7559oÀekma426315',
    'Publicspeakingisveryeasy.126241207207b5249oÀekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149oÐekma426315',
    'Publicspeakingisveryeasy.126241207202b7559oÐekma426315',
    'Publicspeakingisveryeasy.126241207207b5249oÐekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149oàekma426315',
    'Publicspeakingisveryeasy.126241207202b7559oàekma426315',
    'Publicspeakingisveryeasy.126241207207b5249oàekma426315'
  ],
  [
    'Publicspeakingisveryeasy.126241207201b2149oðekma426315',
    'Publicspeakingisveryeasy.126241207202b7559oðekma426315',
    'Publicspeakingisveryeasy.126241207207b5249oðekma426315'
  ]
]
> possible.map(p => ["1b214","2b755","7b524"].map(v => (`Public speaking is very easy.1 2 6 24 120 720${v}9o${p}ekma4 2 6 3 1 5`).replace(/ /g, ''))).flat()
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
  'Publicspeakingisveryeasy.126241207207b5249opekma426315',
  'Publicspeakingisveryeasy.126241207201b2149oekma426315',
  'Publicspeakingisveryeasy.126241207202b7559oekma426315',
  'Publicspeakingisveryeasy.126241207207b5249oekma426315',
  'Publicspeakingisveryeasy.126241207201b2149o,
  'Publicspeakingisveryeasy.126241207202b7559o,
  'Publicspeakingisveryeasy.126241207207b5249o,
  'Publicspeakingisveryeasy.126241207201b2149o ekma426315',
  'Publicspeakingisveryeasy.126241207202b7559o ekma426315',
  'Publicspeakingisveryeasy.126241207207b5249o ekma426315',
  'Publicspeakingisveryeasy.126241207201b2149o°ekma426315',
  'Publicspeakingisveryeasy.126241207202b7559o°ekma426315',
  'Publicspeakingisveryeasy.126241207207b5249o°ekma426315',
  'Publicspeakingisveryeasy.126241207201b2149oÀekma426315',
  'Publicspeakingisveryeasy.126241207202b7559oÀekma426315',
  'Publicspeakingisveryeasy.126241207207b5249oÀekma426315',
  'Publicspeakingisveryeasy.126241207201b2149oÐekma426315',
  'Publicspeakingisveryeasy.126241207202b7559oÐekma426315',
  'Publicspeakingisveryeasy.126241207207b5249oÐekma426315',
  'Publicspeakingisveryeasy.126241207201b2149oàekma426315',
  'Publicspeakingisveryeasy.126241207202b7559oàekma426315',
  'Publicspeakingisveryeasy.126241207207b5249oàekma426315',
  'Publicspeakingisveryeasy.126241207201b2149oðekma426315',
  'Publicspeakingisveryeasy.126241207202b7559oðekma426315',
  'Publicspeakingisveryeasy.126241207207b5249oðekma426315'
]
> Array(128).fill(null).map((_, i)=>  (i & 0xf) == 0 ? String.fromCharCode(i): false).filter(Boolean)
[ '\u0000', '\u0010', ' ', '0', '@', 'P', '`', 'p' ]
> possible.map(p => ["1b214","2b755","7b524"].map(v => (`Public speaking is very easy.1 2 6 24 120 720${v}9o${p}ekma4 2 6 3 1 5`).replace(/ /g, ''))).flat()
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
  'Publicspeakingisveryeasy.126241207207b5249opekma426315',
  'Publicspeakingisveryeasy.126241207201b2149oekma426315',
  'Publicspeakingisveryeasy.126241207202b7559oekma426315',
  'Publicspeakingisveryeasy.126241207207b5249oekma426315',
  'Publicspeakingisveryeasy.126241207201b2149o,
  'Publicspeakingisveryeasy.126241207202b7559o,
  'Publicspeakingisveryeasy.126241207207b5249o,
  'Publicspeakingisveryeasy.126241207201b2149o ekma426315',
  'Publicspeakingisveryeasy.126241207202b7559o ekma426315',
  'Publicspeakingisveryeasy.126241207207b5249o ekma426315',
  'Publicspeakingisveryeasy.126241207201b2149o°ekma426315',
  'Publicspeakingisveryeasy.126241207202b7559o°ekma426315',
  'Publicspeakingisveryeasy.126241207207b5249o°ekma426315',
  'Publicspeakingisveryeasy.126241207201b2149oÀekma426315',
  'Publicspeakingisveryeasy.126241207202b7559oÀekma426315',
  'Publicspeakingisveryeasy.126241207207b5249oÀekma426315',
  'Publicspeakingisveryeasy.126241207201b2149oÐekma426315',
  'Publicspeakingisveryeasy.126241207202b7559oÐekma426315',
  'Publicspeakingisveryeasy.126241207207b5249oÐekma426315',
  'Publicspeakingisveryeasy.126241207201b2149oàekma426315',
  'Publicspeakingisveryeasy.126241207202b7559oàekma426315',
  'Publicspeakingisveryeasy.126241207207b5249oàekma426315',
  'Publicspeakingisveryeasy.126241207201b2149oðekma426315',
  'Publicspeakingisveryeasy.126241207202b7559oðekma426315',
  'Publicspeakingisveryeasy.126241207207b5249oðekma426315'
]
> possible = Array(128).fill(null).map((_, i)=>  (i & 0xf) == 0 ? String.fromCharCode(i): false).filter(Boolean)
[ '\u0000', '\u0010', ' ', '0', '@', 'P', '`', 'p' ]
> possible.map(p => ["1b214","2b755","7b524"].map(v => (`Public speaking is very easy.1 2 6 24 120 720${v}9o${p}ekma4 2 6 3 1 5`).replace(/ /g, ''))).flat()
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
> 
