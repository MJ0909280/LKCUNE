import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs,
  orderBy, query, serverTimestamp, setDoc, updateDoc, where
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

export const listCollection = async <T>(name: string, sort = 'createdAt') => {
  const q = query(collection(db, name), orderBy(sort, 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
};

export const getBySlug = async <T>(slug: string) => {
  const q = query(collection(db, 'pages'), where('slug', '==', slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...(d.data() as T) };
};

export const upsertDoc = async (name: string, id: string, payload: Record<string, unknown>) =>
  setDoc(doc(db, name, id), { ...payload, updatedAt: serverTimestamp(), createdAt: serverTimestamp() }, { merge: true });

export const createDoc = async (name: string, payload: Record<string, unknown>) =>
  addDoc(collection(db, name), { ...payload, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });

export const patchDoc = async (name: string, id: string, payload: Record<string, unknown>) =>
  updateDoc(doc(db, name, id), { ...payload, updatedAt: serverTimestamp() });

export const removeDoc = async (name: string, id: string) => deleteDoc(doc(db, name, id));

export const uploadImage = async (file: File, folder: string) => {
  const imageRef = ref(storage, `${folder}/${Date.now()}-${file.name}`);
  await uploadBytes(imageRef, file);
  return getDownloadURL(imageRef);
};

export const deleteImageByUrl = async (url: string) => {
  const imageRef = ref(storage, url);
  await deleteObject(imageRef);
};
