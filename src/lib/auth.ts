'use client';

import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const adminLogin = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
export const adminLogout = () => signOut(auth);

export const listenAdmin = (cb: (user: User | null, isAdmin: boolean) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) return cb(null, false);
    const snap = await getDoc(doc(db, 'adminUsers', user.uid));
    cb(user, snap.exists());
  });
};
