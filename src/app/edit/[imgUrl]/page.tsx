'use client';

import { useParams } from 'next/navigation';
import ImageCanvas from '@/component/ImageCanvas';

export default function EditPage() {
  const params = useParams();
  const imgUrl = params.imgUrl ? decodeURIComponent(params.imgUrl as string) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 via-pink-100 to-blue-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold font-comic text-purple-700 mb-6">
        Edit Your Image
      </h1>
      {imgUrl ? (
        <div className="bg-white p-6 rounded-2xl shadow-lg border-4 border-yellow-300">
          <ImageCanvas imgUrl={imgUrl} />
        </div>
      ) : (
        <p className="text-xl font-comic text-red-500">
          No image selected. Go back and choose an image!
        </p>
      )}
    </div>
  );
}