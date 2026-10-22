import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useAuth } from '../AuthContext';

interface Post {
  id: string;
  content: string;
  platform: string;
  status: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const user = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, `users/${user.uid}/posts`), orderBy('scheduledAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Post));
      setPosts(postsData);
    });

    return unsubscribe;
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mt-8">
      <h2 className="text-lg font-semibold mb-4">Upcoming Posts</h2>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id} className="p-4 border border-slate-100 rounded-md">
            <p className="font-medium">{post.content}</p>
            <p className="text-sm text-slate-500">Platform: {post.platform} | Status: {post.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
