const excludedWords: string[] = [
    "cabron",
    "joder",
    "coño",
    "pendejo",
    "gilipollas",
    "imbécil",
    "idiota",
  ];

export function containsExcludedWords(text: string): boolean {
    for (const word of excludedWords) {
        if (text.includes(word)) {
            return true;
        }
    }
    return false;
}
