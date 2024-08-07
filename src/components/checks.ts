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

// Función que verifica si un texto contiene alguna palabra de una lista de palabras prohibidas
export function containsExcludedWords(text: string): boolean {
    // Itera sobre cada palabra en la lista de palabras prohibidas
    for (const word of excludedWords) {
        if (text.includes(word)) { // Si el texto contiene la palabra actual de la lista prohibida
            return true; // Devuelve true indicando que se encontró una palabra prohibida
        }
    }
    return false; // Si no se encontró ninguna palabra prohibida en el texto, devuelve false
}
// Función asíncrona que verifica la ortografía de un texto usando la API de LanguageTool
export async function checkSpelling(text: string): Promise<string[]> {
    // Realiza una solicitud POST a la API de LanguageTool con el texto a verificar y el idioma configurado a español
    const response = await fetch(`https://api.languagetool.org/v2/check?text=${encodeURIComponent(text)}&language=es`, {
        method: 'POST'
    });

    const data = await response.json(); // Convierte la respuesta de la API a un objeto JSON
    // Mapea los errores ortográficos encontrados en el texto, extrayendo el texto incorrecto de cada coincidencia
    const incorrectWords = data.matches.map((match: Match) => match.context.text); 
    return incorrectWords; // Devuelve un arreglo con las palabras incorrectas encontradas
}
