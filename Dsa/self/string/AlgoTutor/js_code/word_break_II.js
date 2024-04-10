function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = {};

    function backtrack(start) {
        if (start === s.length) {
            return [[]];
        }

        if (memo[start] !== undefined) {
            return memo[start];
        }

        const sentences = [];
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            if (wordSet.has(word)) {
                const nextSentences = backtrack(end);
                for (let sentence of nextSentences) {
                    sentences.push([word, ...sentence]);
                }
            }
        }
        memo[start] = sentences;
        return sentences;
    }
    const result = backtrack(0);
    return result.map(words => words.join(' '));
}
// Test cases
console.log(wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]));
// Output: ["cats and dog", "cat sand dog"]

console.log(wordBreak("pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]));
// Output: ["pine apple pen apple", "pine applepen apple", "pineapple pen apple"]
