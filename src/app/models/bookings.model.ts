export interface Booking {
    id: string;
    userId: string; // Référence à un utilisateur dans `users`.
    carId: string;  // Référence à une voiture dans `cars`.
    date: string;   // Format ISO 8601 (YYYY-MM-DD).
    status: 'confirmed' | 'pending'; // État de la réservation.
  }
  