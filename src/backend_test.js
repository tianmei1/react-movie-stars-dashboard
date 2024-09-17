// String Manipulation
// Solve the problem in https://chartmetric.notion.site/Coding-Exercise-JS-String-Manipulation-72ff40777e50498c89a6194fe5c6ebe2

function trimAndCondenseSpaces(str) {
    // trim space in the string left and right and condense middle space to single white space 
    return str.trim().replace(/\s+/g, ' ');
}

function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function convertToTitleCase(str) {
    return str
        .split(' ')
        .map(capitalizeWord)
        .join(' ');
}

function chartMetricStringManipulation(arr) {
    return arr
        .map(str => convertToTitleCase(trimAndCondenseSpaces(str))) // Step 1: Trim, condense, and title case each string
        .sort(); // Step 2: Sort the array in ascending order
}

// Example Test Cases
console.log(chartMetricStringManipulation(['  nice', 'hey there     ', '   woah       man '])); 
// Expected output: ['Hey There', 'Nice', 'Woah Man']

console.log(chartMetricStringManipulation(['hi']));
// Expected output: ['Hi']

console.log(chartMetricStringManipulation([]));
// Expected output: []

console.log(chartMetricStringManipulation(['hey', '    hey', 'hey   ']));
// Expected output: ['Hey', 'Hey', 'Hey']