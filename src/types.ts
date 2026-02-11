export interface Card {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    isCollected?: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
    level: number;
    points: number;
}
