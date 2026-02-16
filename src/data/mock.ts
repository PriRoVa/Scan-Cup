import type { Card, User } from '../types';

export const mockUser: User = {
    id: "8821",
    name: "Carlos Montalvo",
    email: "carlos@scancup.com",
    avatarUrl: "https://images.unsplash.com/photo-1546519638-68e109498ee3?q=80&w=2670&auto=format&fit=crop",
    level: 12,
    points: 4500,
    rank: 42,
    collectionCount: 13
};

export const mockCards: Card[] = [
    {
        id: "MES-10",
        name: "Lionel Messi",
        description: "El capitán legendario, maestro del regate y la visión.",
        imageUrl: "https://images.unsplash.com/photo-1621977717297-c60f49298d07?q=80&w=2670&auto=format&fit=crop",
        isCollected: true,
        country: "Argentina",
        position: "DEL",
        stats: { speed: 85, shooting: 96, power: 80 },
        rarity: 'legendary'
    },
    {
        id: "CR7-07",
        name: "Cristiano Ronaldo",
        description: "Potencia física y capacidad goleadora sin igual.",
        imageUrl: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=2892&auto=format&fit=crop",
        isCollected: false,
        country: "Portugal",
        position: "DEL",
        stats: { speed: 88, shooting: 95, power: 90 },
        rarity: 'legendary'
    },
    {
        id: "MBP-09",
        name: "Kylian Mbappé",
        description: "Velocidad explosiva y definición letal.",
        imageUrl: "https://images.unsplash.com/photo-1560933566-f44697955c4d?q=80&w=2670&auto=format&fit=crop",
        isCollected: true,
        country: "Francia",
        position: "EXT",
        stats: { speed: 97, shooting: 92, power: 88 },
        rarity: 'common'
    },
    {
        id: "NEY-11",
        name: "Neymar Jr",
        description: "Magia brasileña, creatividad y alegría en el campo.",
        imageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d6dbd?q=80&w=2670&auto=format&fit=crop",
        isCollected: false,
        country: "Brasil",
        position: "EXT",
        stats: { speed: 91, shooting: 85, power: 78 },
        rarity: 'rare'
    },
    {
        id: "MOD-10",
        name: "Luka Modrić",
        description: "El motor del mediocampo, elegancia y precisión.",
        imageUrl: "https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=2564&auto=format&fit=crop",
        isCollected: true,
        country: "Croacia",
        position: "MC",
        stats: { speed: 75, shooting: 82, power: 70 },
        rarity: 'common'
    }
];
