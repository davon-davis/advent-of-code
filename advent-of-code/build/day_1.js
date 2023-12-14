"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trebuchet = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
// Function to read the file and return an array of strings
function readListFromFile(filePath) {
    try {
        // Read the file content
        var fileContent = fs.readFileSync(filePath, 'utf8');
        // Split the content by new lines to create an array
        return fileContent.split(/\r?\n/);
    }
    catch (err) {
        console.error('Error reading the file:', err);
        return [];
    }
}
var trebuchet = function () {
    var filePath = path.join("/Users/d2153102/projects/advent-of-code/src/list.txt");
    var list = readListFromFile(filePath);
    // const list = ["one2asdf5threeight"]
    var total = 0;
    var num = "";
    var numList = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    var numListIndexed = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9"
    };
    list.forEach(function (str) {
        var firstDigitNum = "";
        var firstDigitWord = "";
        var firstDigitWordIndex = -1;
        var firstDigitNumIndex = -1;
        var secondDigitNum = "";
        var secondDigitWord = "";
        var secondDigitWordIndex = -1;
        var secondDigitNumIndex = -1;
        console.log(str);
        var wordIndexArray = [];
        var wordLastIndexArray = [];
        for (var j = 0; j <= numList.length; ++j) {
            // firstDigitWordIndex = str.indexOf(numList[j]);
            wordIndexArray.push(str.indexOf(numList[j]));
            wordLastIndexArray.push(str.lastIndexOf(numList[j]));
        }
        var isFirstNonNegative = false;
        for (var i = 0; i < wordIndexArray.length - 1; ++i) {
            if (wordIndexArray[i] !== -1 && !isFirstNonNegative) {
                isFirstNonNegative = true;
                firstDigitWordIndex = i;
            }
            if (wordIndexArray[i] !== -1 && wordIndexArray[i] < wordIndexArray[firstDigitWordIndex]) {
                firstDigitWordIndex = i;
            }
        }
        var isFirstNonNegativeSecond = false;
        for (var i = 0; i < wordLastIndexArray.length - 1; ++i) {
            if (wordLastIndexArray[i] !== -1 && !isFirstNonNegativeSecond) {
                isFirstNonNegativeSecond = true;
                secondDigitWordIndex = i;
            }
            if (wordLastIndexArray[i] !== -1 && wordLastIndexArray[i] > wordLastIndexArray[secondDigitWordIndex]) {
                secondDigitWordIndex = i;
            }
        }
        if (firstDigitWordIndex !== -1) {
            firstDigitWord = numListIndexed[numList[firstDigitWordIndex]];
            secondDigitWord = numListIndexed[numList[secondDigitWordIndex]];
            if (wordIndexArray[firstDigitWordIndex] === wordLastIndexArray[secondDigitWordIndex]) {
                secondDigitWordIndex = -1;
            }
        }
        for (var i = 0; i <= str.length - 1; i++) {
            firstDigitNumIndex = i;
            if (/\d/.test(str[i])) {
                firstDigitNum = str[i];
                break;
            }
        }
        for (var i = str.length - 1; i >= 0; i--) {
            secondDigitNumIndex = i;
            if (/\d/.test(str[i])) {
                if (secondDigitNumIndex === firstDigitNumIndex) {
                    secondDigitNumIndex = -1;
                    break;
                }
                else {
                    secondDigitNum = str[i];
                    break;
                }
            }
        }
        var firstDigit = wordIndexArray[firstDigitWordIndex] < firstDigitNumIndex ? firstDigitWord : firstDigitNum;
        var secondDigit = "";
        console.log(firstDigitWordIndex, firstDigitNumIndex, secondDigitWordIndex, secondDigitNumIndex);
        if (secondDigitNumIndex === -1 && secondDigitWordIndex === -1 && firstDigitWordIndex !== -1) {
            secondDigit = firstDigitWord;
        }
        else if (secondDigitNumIndex === -1 && secondDigitWordIndex !== -1) {
            secondDigit = secondDigitWord;
        }
        else if (secondDigitNumIndex !== -1 && secondDigitWordIndex === -1) {
            secondDigit = secondDigitNum;
        }
        else {
            secondDigit = wordLastIndexArray[secondDigitWordIndex] > secondDigitNumIndex ? secondDigitWord : secondDigitNum;
        }
        // let lowestIndex = -1
        // let highestIndex = -1
        //
        // for(let i = 0;  i < numAndIndex.length; i++){
        //     if(numAndIndex[i]< lowestIndex){
        //         lowestIndex = i
        //     }
        //
        //     if(numAndIndex[i] > highestIndex){
        //         highestIndex = i
        //     }
        // }
        console.log(firstDigit, secondDigit);
        if (secondDigitNumIndex === -1 && secondDigitWordIndex === -1 && firstDigitWordIndex !== -1) {
            num = firstDigit + secondDigit;
        }
        else if (secondDigitNumIndex === -1 && secondDigitWordIndex === -1) {
            num = firstDigit;
        }
        else {
            num = firstDigit + secondDigit;
        }
        console.log(num);
        total += Number(num);
    });
    console.log(total);
};
exports.trebuchet = trebuchet;
