import { Match } from "../Models/ISpelling";

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

export async function checkSpelling(text: string): Promise<string[]> {
    const response = await fetch(`https://api.languagetool.org/v2/check?text=${encodeURIComponent(text)}&language=es`, {
        method: 'POST'
    });

    const data = await response.json();
    const incorrectWords = data.matches.map((match: Match) => match.context.text);
    return incorrectWords;
}
