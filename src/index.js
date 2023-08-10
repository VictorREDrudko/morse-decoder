const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let exprArray = expr.split()
    
    let breakdownByTen = exprArray.map(el => {
        const test = s => s.match(/..........?/g).map(v => v.length == 1 ? v + '_' : v)
        return test(el)  
    })

    let numbersArray = breakdownByTen.flat()
      
    let substitutionForSymbol = numbersArray.map(pos => {
        if(pos === '**********') {return ' '}
        else {
            let replacementNumber = pos.replaceAll(/11/gi, '-').replaceAll(/10/gi, '.').replaceAll(/0/gi, '')
            return replacementNumber
        }
    })
    
    const dash = Object.keys(MORSE_TABLE)
    const letter = Object.values(MORSE_TABLE)

    let decoderWords = substitutionForSymbol.map((el, index) => {
        if(el !== ' ') {
                let indexDash = dash.indexOf(el)
                let indexLetter = letter[indexDash]
                return indexLetter
        } else {return ' '}
    })

    const words = decoderWords.join().replaceAll(/,/gi, '')
    
    return words
}

module.exports = {
    decode
}