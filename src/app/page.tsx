'use client'
import { useState, useEffect } from 'react';
import { db, doc, getDoc, setDoc, onSnapshot } from '../../firebase';

export default function Home() {
  const [dislikeCount, setDislikeCount] = useState(0);
  const [animateCount, setAnimateCount] = useState(false);

  const startAnimation = () => {
    setAnimateCount(true);
    setTimeout(() => setAnimateCount(false), 100);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "counts", "dislike"), (doc) => {
      if (doc.exists()) {
        setDislikeCount(doc.data().count);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    startAnimation();
  }, [dislikeCount]);

  const handleDislike = async () => {
    console.log("dislike");
    const docRef = doc(db, "counts", "dislike");
    const docSnap = await getDoc(docRef);
    console.log("dislike");
    if (docSnap.exists()) {
      await setDoc(docRef, { count: docSnap.data().count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Enginin AMK</h1>
      <p className={`text-2xl mb-4 ${animateCount ? 'fadeIn' : ''}`}>
        {dislikeCount} kez Engine sövüldü. Sen de sövmek istiyorsan:
      </p>
      <button
        onClick={handleDislike}
        className="px-4 py-2 bg-red-500 text-white rounded-lg transform transition-transform duration-200 hover:scale-110 active:scale-90 bounce"
      >
        Enginin AMK
      </button>
    </div>
  );
}
