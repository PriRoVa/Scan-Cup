export interface Card {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    isCollected?: boolean;
    // New fields for design
    country?: string; // e.g. "Argentina"
    position?: string; // e.g. "FW"
    stats?: {
        speed: number;
        shooting: number;
        power: number;
    };
    rarity?: 'common' | 'rare' | 'legendary';
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    level: number;
    points: number;
    // New fields
    rank?: number;
    collectionCount?: number;
}
