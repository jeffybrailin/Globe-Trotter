
import { useEffect, useState } from 'react';

// Generates random sakura petals
export const SakuraBackground = () => {
    const [petals, setPetals] = useState<number[]>([]);

    useEffect(() => {
        // Create 20 petals
        setPetals(Array.from({ length: 15 }, (_, i) => i));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Dot Pattern Overlay */}
            <div className="absolute inset-0 bg-anime-pattern opacity-30"></div>

            {/* Floating Petals */}
            {petals.map((i) => (
                <div
                    key={i}
                    className="absolute text-pink-200/60"
                    style={{
                        left: `${Math.random() * 100}vw`,
                        top: `-10vh`,
                        fontSize: `${Math.random() * 20 + 10}px`,
                        animation: `sakura-fall ${Math.random() * 10 + 10}s linear infinite`,
                        animationDelay: `${Math.random() * 10}s`
                    }}
                >
                    🌸
                </div>
            ))}
        </div>
    );
};
