function replaceSubstrings(str, replacements) {
    let result = str;
  
    // Перебираем каждую подстроку и заменяем её на указанную замену
    for (const [substring, replacement] of Object.entries(replacements)) {
      const regex = new RegExp(substring, 'g'); // Используем регулярное выражение для замены всех вхождений
      result = result.replace(regex, replacement);
    }
  
    return result;
  }

  // Пример использования:
// const inputString = "Hello, this is a bold and italic text";
// const replacements = {
//   "bold": "strong_word",
//   "italic": "emphasized_word"
// };

  export default replaceSubstrings;