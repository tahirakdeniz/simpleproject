"use client";
import { useState, useEffect, useRef } from "react";
import {
    db,
    doc,
    onSnapshot,
    updateDoc,
    increment,
} from "../../firebase";
import {
    FaStar,
    FaChartLine,
    FaFire,
    FaRocket,
    FaGem,
    FaGlobe,
} from "react-icons/fa";

export default function Home() {
    const [dislikeCount, setDislikeCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>(null);

    /* ───── Firebase listener ───── */
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "counts", "dislike"), (d) => {
            if (d.exists()) {
                setDislikeCount(d.data().count);
                setLoading(false);
            }
        });
        return () => unsub();
    }, []);

    const handleDislike = async () => {
        try {
            await updateDoc(doc(db, "counts", "dislike"), {
                count: increment(1),
            });
        } catch (e) {
            console.error("Update failed: ", e);
        }
    };

    function formatWithSpaces(n: number): string {
        return n
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    /* ───── Milestones & progress math ───── */
    const milestones = [
        { value: 1_000, label: "1K", Icon: FaStar },
        { value: 10_000, label: "10K", Icon: FaChartLine },
        { value: 50_000, label: "50K", Icon: FaFire },
        { value: 100_000, label: "100K", Icon: FaRocket },
        { value: 500_000, label: "500K", Icon: FaGem },
        { value: 1_000_000, label: "1M", Icon: FaGlobe },
    ];

    /** Convert dislikeCount to 0‒100 % based on milestone steps */
    function getProgressPct(count: number | null): number {
        if (count == null) return 0;

        // above the last milestone → 100 %
        if (count >= milestones[milestones.length - 1].value) return 100;

        // below the first milestone → 0 %
        if (count <= milestones[0].value) return 0;

        // find the surrounding milestone pair
        for (let i = 0; i < milestones.length - 1; i++) {
            const cur = milestones[i].value;
            const next = milestones[i + 1].value;

            if (count >= cur && count < next) {
                const slicePct = (count - cur) / (next - cur);     // 0‒1 within the step
                const basePct = (i / (milestones.length - 1)) * 100;
                const stepPct = (1 / (milestones.length - 1)) * 100;
                return basePct + slicePct * stepPct;
            }
        }
        return 0; // fallback
    }

    const progressPct = getProgressPct(dislikeCount);

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* ───── Loading overlay ───── */}
            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/75 z-10">
                    <div className="spinner" />
                    <p className="mt-4 text-lg font-bold text-red-600">Loading...</p>
                </div>
            )}

            {/* ───── Counter & button ───── */}
            <h1 className="text-3xl font-bold mb-4">Engin&apos;in AMK</h1>
            <p className="text-2xl mb-4 text-center">
                <span className="inline-block border-4 border-gray-200 rounded-lg px-1">
                    <span className="text-red-500 font-bold text-3xl tabular-nums">
                        {dislikeCount != null ? formatWithSpaces(dislikeCount) : "0"}
                    </span>
                </span>{" "}
                kez Engin&apos;e sövüldü. Sen de sövmek istiyorsan:
            </p>
            <button
                ref={buttonRef}
                onClick={handleDislike}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:scale-110 active:scale-90 transition mb-32"
            >
                Engin&apos;in AMK
            </button>

            {/* ───── Milestone timeline ───── */}
            <div className="absolute bottom-0 w-full px-8 py-6">
                <div className="relative mx-auto max-w-4xl">
                    {/* grey track */}
                    <div className="absolute inset-x-0 top-1/2 border-t-2 border-gray-300" />

                    {/* red progress segment */}
                    <div
                        className="absolute left-0 top-1/2 border-t-2 border-red-500"
                        style={{ width: `${progressPct}%` }}
                    />

                    {/* red progress dot */}
                    <div
                        className="absolute top-1/2 w-6 h-6 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${progressPct}%` }}
                    />

                    {/* milestones */}
                    <ul className="relative flex justify-between items-center">
                        {milestones.map(({ label, Icon }) => (
                            <li key={label} className="flex flex-col items-center">
                                <div className="bg-white p-2 rounded-full shadow-md hover:scale-110 transition">
                                    <Icon className="w-6 h-6 text-red-500" />
                                </div>
                                <span className="mt-2 text-sm font-medium">{label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
