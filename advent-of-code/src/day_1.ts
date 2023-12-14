import * as fs from 'fs';
import * as path from 'path';
import {log} from "util";

// Function to read the file and return an array of strings
function readListFromFile(filePath: string): string[] {
    try {
        // Read the file content
        const fileContent = fs.readFileSync(filePath, 'utf8');
        // Split the content by new lines to create an array
        return fileContent.split(/\r?\n/);
    } catch (err) {
        console.error('Error reading the file:', err);
        return [];
    }
}

export const trebuchet = () => {
    const filePath = path.join("/Users/d2153102/projects/advent-of-code/src/list.txt");
    const list = readListFromFile(filePath);
    // const list = ["one2asdf5threeight"]

    let total = 0
    let num = "";

    const numList = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]

    const numListIndexed: { [key: string]: string } = {
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9"
    }

    list.forEach(str => {
        let firstDigitNum = "";
        let firstDigitWord = "";
        let firstDigitWordIndex = -1
        let firstDigitNumIndex = -1

        let secondDigitNum = "";
        let secondDigitWord = "";
        let secondDigitWordIndex = -1
        let secondDigitNumIndex = -1

        console.log(str)

        let wordIndexArray = []
        let wordLastIndexArray = []
        for (let j = 0; j <= numList.length; ++j) {
            // firstDigitWordIndex = str.indexOf(numList[j]);
            wordIndexArray.push(str.indexOf(numList[j]))
            wordLastIndexArray.push(str.lastIndexOf(numList[j]))
        }

        let isFirstNonNegative = false
        for (let i = 0; i < wordIndexArray.length - 1; ++i) {
            if (wordIndexArray[i] !== -1 && !isFirstNonNegative) {
                isFirstNonNegative = true
                firstDigitWordIndex = i
            }

            if (wordIndexArray[i] !== -1 && wordIndexArray[i] < wordIndexArray[firstDigitWordIndex]) {
                firstDigitWordIndex = i
            }
        }

        let isFirstNonNegativeSecond = false
        for (let i = 0; i < wordLastIndexArray.length - 1; ++i) {
            if (wordLastIndexArray[i] !== -1 && !isFirstNonNegativeSecond) {
                isFirstNonNegativeSecond = true
                secondDigitWordIndex = i
            }

            if (wordLastIndexArray[i] !== -1 && wordLastIndexArray[i] > wordLastIndexArray[secondDigitWordIndex]) {
                secondDigitWordIndex = i
            }
        }


        if (firstDigitWordIndex !== -1) {
            firstDigitWord = numListIndexed[numList[firstDigitWordIndex]]
            secondDigitWord = numListIndexed[numList[secondDigitWordIndex]]
            if(wordIndexArray[firstDigitWordIndex] === wordLastIndexArray[secondDigitWordIndex]){
                secondDigitWordIndex = -1
            }
        }

        for (let i = 0; i <= str.length - 1; i++) {
            firstDigitNumIndex = i
            if (/\d/.test(str[i])) {
                firstDigitNum = str[i]
                break
            }
        }

        for (let i = str.length - 1; i >= 0; i--) {
            secondDigitNumIndex = i
            if (/\d/.test(str[i])) {
                if (secondDigitNumIndex === firstDigitNumIndex) {
                    secondDigitNumIndex = -1
                    break
                } else {
                    secondDigitNum = str[i]
                    break
                }
            }
        }

        let firstDigit = wordIndexArray[firstDigitWordIndex] < firstDigitNumIndex ? firstDigitWord : firstDigitNum
        let secondDigit = ""

        console.log(firstDigitWordIndex, firstDigitNumIndex, secondDigitWordIndex, secondDigitNumIndex)
        if(secondDigitNumIndex === -1 && secondDigitWordIndex === -1 && firstDigitWordIndex !== -1){
            secondDigit = firstDigitWord
        }else if(secondDigitNumIndex === -1 && secondDigitWordIndex !== -1){
            secondDigit = secondDigitWord
        }else if(secondDigitNumIndex !== -1 && secondDigitWordIndex === -1){
            secondDigit = secondDigitNum
        }else{
            secondDigit = wordLastIndexArray[secondDigitWordIndex] > secondDigitNumIndex ? secondDigitWord : secondDigitNum
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

        console.log(firstDigit, secondDigit)
        if (secondDigitNumIndex === -1 && secondDigitWordIndex === -1 && firstDigitWordIndex !== -1) {
            num = firstDigit + secondDigit
        }else if (secondDigitNumIndex === -1 && secondDigitWordIndex === -1) {
            num = firstDigit
        } else {
            num = firstDigit + secondDigit
        }
        console.log(num)
        total += Number(num)
    })

    console.log(total)
}