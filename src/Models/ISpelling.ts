export interface Match {
    message: string;   // Mensaje sobre el error encontrado
    context: {
        text: string;  // El texto donde se encuentra el error
    };
}