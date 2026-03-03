'use client';
import CollectionView from '@/components/CollectionView';
export default function BranchesPage(){return <CollectionView title="Branches" collectionName="branches" fields={["name","address","timings"]} />}
