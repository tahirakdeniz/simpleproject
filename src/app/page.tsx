"use client";
import { useState, useEffect, useRef } from "react";
import { db, doc, getDoc, setDoc, onSnapshot, runTransaction, increment, updateDoc} from "../../firebase";

export default function Home() {
    const [dislikeCount, setDislikeCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [fontSize, setFontSize] = useState<string>("75px");

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "counts", "dislike"), (doc) => {
            if (doc.exists()) {
                setDislikeCount(doc.data().count);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (dislikeCount !== null) {
            const numDigits = dislikeCount.toString().length;
            const newSize = 75 / numDigits;
            setFontSize(`${newSize}px`);
        }
    }, [dislikeCount]);

    const handleDislike = async () => {
        const docRef = doc(db, "counts", "dislike");

        try {
            await updateDoc(docRef, { count: increment(1) });
        } catch (e) {
            console.error("Update failed: ", e);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 z-10 blur-bg">
                <div className="spinner"></div>
                <p className="mt-4 text-lg font-bold text-red-600">Loading...</p>
            </div>
            )}
            <h1 className="text-3xl font-bold mb-4">Engin&apos;in AMK</h1>
            <p className="text-2xl mb-4 text-center">
                <span className="inline-block border-4 border-gray-200 rounded-lg transform transition-transform duration-200 hover:scale-110 px-[0.5]">
                <span 
                    className={`text-red-500 font-bold text-center inline-block text-3xl`}
                    style={{ width: `${dislikeCount?.toString().length}ch` }}>
                        {dislikeCount}
                </span></span> kez Engin&apos;e sövüldü. Sen de sövmek istiyorsan:
            </p>
            <button
                ref={buttonRef}
                onClick={handleDislike}
                className="px-4 py-2 bg-red-500 text-white rounded-lg transform transition-transform duration-200 hover:scale-110 active:scale-90"
            >
                Engin&apos;in AMK
            </button>
        </div>
    );
}
