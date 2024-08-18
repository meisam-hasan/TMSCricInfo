function extractShortCode(inputString) {
    const match = inputString.match(/\[([^\]]+)\]/);
    return match ? match[1] : inputString;
}

export { extractShortCode };
