function lengthCheck(currentLine, length) {
  return currentLine.length <= length;
}

lengthCheck('Привет, я JavaScript', 20);

function isPolindromCheck(string) {
  const normalString = string.toLowerCase().replaceAll(' ', '');
  let newString = '';

  for (let i = normalString.length - 1; i >= 0; i--) {
    newString += normalString.at(i);
  }
  return newString === normalString;
}

isPolindromCheck('Лёша на полке клопа нашёл ');


