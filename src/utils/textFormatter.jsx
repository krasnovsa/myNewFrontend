// src/utils/textFormatter.js
import React from "react";

/**
 * Function to decode HTML entities.
 * @param {string} text - The text with HTML entities.
 * @returns {string} - The decoded text.
 */
const decodeHtmlEntities = (text) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

/**
 * Function to format text with custom <fgcolor> tags.
 * @param {string} text - The text to format.
 * @returns {Array} - An array of React elements.
 */
export const formatTextWithColor = (text) => {
  const decodedText = decodeHtmlEntities(text);
  const regex = /<fgcolor=([a-fA-F0-9]{6})>(.*?)<\/fgcolor>/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(decodedText)) !== null) {
    const [fullMatch, color, content] = match;
    const startIndex = match.index;
    const endIndex = regex.lastIndex;

    // Add text before the tag
    if (startIndex > lastIndex) {
      parts.push(decodedText.substring(lastIndex, startIndex));
    }

    // Add text inside the tag
    parts.push(
      <span key={startIndex} style={{ color: `#${color}` }}>
        {content}
      </span>
    );

    lastIndex = endIndex;
  }

  // Add remaining text
  if (lastIndex < decodedText.length) {
    parts.push(decodedText.substring(lastIndex));
  }

  return parts;
};

/**
 * Function to replace semicolons with line breaks.
 * @param {Array} reactElements - The array of React elements.
 * @returns {Array} - An array of React elements with semicolons replaced by line breaks.
 */
export const replaceSemicolonsWithLineBreaks = (reactElements) => {
  // Проверяем, является ли входной параметр массивом
  if (!Array.isArray(reactElements)) {
    throw new Error("Input should be an array of React elements");
  }

  // Обрабатываем каждый элемент массива
  return reactElements
    .map((element, index) => {
      // Проверяем, является ли элемент строкой
      if (typeof element === "string") {
        // Сначала форматируем текст с цветом
        const formattedText = formatTextWithColor(element);

        // Затем заменяем точки с запятой на разрывы строк
        return formattedText.map((part, i) =>
          typeof part === "string"
            ? part.split(";").map((subPart, j) => (
                <React.Fragment key={`${index}-${i}-${j}`}>
                  {subPart}
                  {j < part.split(";").length - 1 && <br />}
                </React.Fragment>
              ))
            : part
        );
      }

      // Если элемент не является строкой, возвращаем его без изменений
      return element;
    })
    .flat();
};
