type mapType = {
    [key: string]: any[];
};
type dictType = string[];

function runScript(phoneNumber: string) {
    //read / prepare mapping (start with provided samples)
    //Function to find list of all words possible by pressing given numbers.

    // NOTE: [@booya2nd] Move all static information outside of your heavy-duty function(s)
    // NOTE: [@booya2nd] this can be a simple Array  or dictType
    //    const MAPPING_NUM2CHAR: dictType = ['E','JNQ','RWX','DSY','FT','AM','CIV','BKU','LOP','GHZ'];
    //
    //    invert the array key/value relationship for lookups -> {E:0, J:1, N:1, Q:1 ... }
    //    const MAPPING_CHAR2NUM: mapType = Object.fromEntries(MAPPING_NUM2CHAR.flatMap((chars, num) => [...chars].map(chr => [chr,num])));
    let map: mapType = {
        0: ["e", "E"],
        1: ["J", "N", "Q", "j", "n", "q"],
        2: ["R", "W", "X", "r", "w", "x"],
        3: ["D", "S", "Y", "d", "s", "y"],
        4: ["F", "T", "f", "t"],
        5: ["A", "M", "a", "m"],
        6: ["C", "I", "V", "c", "i", "v"],
        7: ["B", "K", "U", "", "b", "k", "u"],
        8: ["L", "O", "P", "l", "o", "p"],
        9: ["G", "H", "Z", "g", "h", "z"]
    };

    const phone = phoneNumber.replace(/[^0-9]/g, "").split("");

    // NOTE: [@booya2nd] `const` over `let`. period.
    let result: any[] = [];

    let helper = function (index: any, perms: any) {
        if (perms.length === phone.length) {
            result.push([perms]);
            return;
        }

        let val = map[phone[index] as keyof mapType];
        for (let i = 0; i < val.length; i++) {
            helper(index + 1, perms + val[i]);
        }
    };

    helper(0, "");
    function encodePhoneNumber(phoneNumber: string) {
        // Create an array to hold all possible encodings
        // NOTE: [@booya2nd] Move all static information outside of your heavy-duty function(s)
        const dictionary: dictType = [
            "an",
            "blau",
            'Bo"',
            "Boot",
            'bo"s',
            "da",
            "Fee",
            "fern",
            "Fest",
            "fort",
            "je",
            "jemand",
            "mir",
            "Mix",
            "Mixer",
            "Name",
            "neu",
            'o"d',
            "Ort",
            "so",
            "Tor",
            "Torf",
            "Wasser"
        ];
        // NOTE: [@booya2nd] It would maybe make sense to >generate< another lookup object to have the numbers that correspond with each word(incl. umlauts) (and maybe vice-versa)
        //       use MAPPING_CHAR2NUM from above for that ;)
        //          but I am not really sure yet whether this will help in the end, but I feel like it would give you a ramp up on how to lookup things super fast (the task stated that we should hold mappings in main memory, so it may be viable ... )
        //       const DICT2NUM: object  -> { 'an': 51, 'blau': 7857, 'Bo"': 78, 'Boot': 7884 ,... }
        //          and vice versa (not yet sure if that will help us later)
        //       NUM2DICT: mapType  -> { 51: ['an'], 7857: ['blau'], 78: ['Bo"'], ..., 562: ['mir', 'Mix'] }

        function findWord(letters: string[], dict: string[]) {
            let encodings: any[] = [];

            // Clone the array for manipulation
            let curLetters = letters.slice(0),
                listStrings = curLetters.join("");

            for (let i = 0; i < dict.length; i++) {
                let word = dict[i];
                let letters = word.replace(/[^a-zA-Z]/g, ""); // remove dashes and double quotes

                // If the word matches the current number, add it to the current encoding and recursively call the function with the remaining

                if (listStrings.startsWith(letters)) {
                    0&&console.log({
                        list: listStrings,
                        startWith: letters,
                        r: listStrings.startsWith(letters)
                    });
                    encodings.push(word);
                }
            }

            return encodings;
        }

        // // Print all possible encodings
        // for (let i = 0; i < encodings.length; i++) {
        //   console.log(phoneNumber + ": " + encodings[i]);
        // }

        0&&console.log(
            phoneNumber + ": " + findWord(phoneNumber.split(""), dictionary)
        );
    }

    //return result; //encodePhoneNumber(phoneNumber);
   return result
}

const perms = runScript('11');

console.log(perms.length);
// Output: 5624-82: mir Tor
// 5624-82: Mix Tor
