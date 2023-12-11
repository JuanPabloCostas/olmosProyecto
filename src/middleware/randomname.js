// program to generate random strings

// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const generateName = (name) => {

    let extension = name.slice(name.lastIndexOf('.'))

    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < 23; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result + extension;
}

module.exports = generateName;