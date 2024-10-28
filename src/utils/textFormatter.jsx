// src/utils/textFormatter.js

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
