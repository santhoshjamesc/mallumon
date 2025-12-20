import { createContext, ReactNode, useContext, useState } from 'react';

export interface Sticker {
    id: string;
    name: string;
    emoji: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    caughtAt: Date;
    weather: string;
}

interface CollectionContextType {
    stickers: Sticker[];
    addSticker: (sticker: Omit<Sticker, 'id' | 'caughtAt'>) => void;
    totalCaught: number;
    streak: number;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

// Sample sticker pool for random spawns
export const STICKER_POOL = {
    common: [
        { name: 'Shadow Cat', emoji: '🐱' },
        { name: 'Leaf Sprite', emoji: '🍃' },
        { name: 'Stone Golem', emoji: '🪨' },
        { name: 'Wind Wisp', emoji: '💨' },
        { name: 'Dust Bunny', emoji: '🐰' },
    ],
    rare: [
        { name: 'Flame Spirit', emoji: '🔥' },
        { name: 'Ocean Wave', emoji: '🌊' },
        { name: 'Thunder Bolt', emoji: '⚡' },
        { name: 'Moon Rabbit', emoji: '🌙' },
        { name: 'Star Fish', emoji: '⭐' },
    ],
    epic: [
        { name: 'Crystal Gem', emoji: '💎' },
        { name: 'Dragon Egg', emoji: '🥚' },
        { name: 'Phoenix Feather', emoji: '🪶' },
        { name: 'Unicorn Horn', emoji: '🦄' },
        { name: 'Rainbow Serpent', emoji: '🌈' },
    ],
    legendary: [
        { name: 'Golden Dragon', emoji: '🐉' },
        { name: 'Celestial Phoenix', emoji: '🔮' },
        { name: 'Ancient Kraken', emoji: '🦑' },
        { name: 'Ethereal Unicorn', emoji: '✨' },
    ],
};

export function CollectionProvider({ children }: { children: ReactNode }) {
    const [stickers, setStickers] = useState<Sticker[]>([]);
    const [streak] = useState(5); // TODO: Implement streak logic

    const addSticker = (stickerData: Omit<Sticker, 'id' | 'caughtAt'>) => {
        const newSticker: Sticker = {
            ...stickerData,
            id: `sticker-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            caughtAt: new Date(),
        };
        setStickers(prev => [newSticker, ...prev]);
    };

    return (
        <CollectionContext.Provider
            value={{
                stickers,
                addSticker,
                totalCaught: stickers.length,
                streak,
            }}
        >
            {children}
        </CollectionContext.Provider>
    );
}

export function useCollection() {
    const context = useContext(CollectionContext);
    if (context === undefined) {
        throw new Error('useCollection must be used within a CollectionProvider');
    }
    return context;
}

export function getRandomSticker(rarity: 'common' | 'rare' | 'epic' | 'legendary') {
    const pool = STICKER_POOL[rarity];
    const randomIndex = Math.floor(Math.random() * pool.length);
    return { ...pool[randomIndex], rarity };
}
