import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../AuthContext';

export default function PostEditor({ onPostCreated }: { onPostCreated: () => void }) {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const user = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(collection(db, `users/${user.uid}/posts`), {
        userId: user.uid,
        content,
        platform,
        scheduledAt: serverTimestamp(),
        status: 'scheduled',
      });
      setContent('');
      onPostCreated();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Create New Post</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border border-slate-300 rounded-md mb-4"
        placeholder="Enter your post content (max 280 chars)"
        maxLength={280}
        required
      />
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
        className="w-full p-2 border border-slate-300 rounded-md mb-4"
      >
        <option value="instagram">Instagram</option>
        <option value="linkedin">LinkedIn</option>
        <option value="twitter">X (Twitter)</option>
        <option value="facebook">Facebook</option>
        <option value="pinterest">Pinterest</option>
        <option value="tiktok">TikTok</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800">
        Schedule Post
      </button>
    </form>
  );
}
