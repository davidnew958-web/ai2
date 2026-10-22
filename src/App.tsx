/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useAuth } from './AuthContext';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from './firebase';
import PostEditor from './components/PostEditor';
import PostList from './components/PostList';

export default function App() {
  const user = useAuth();

  const handleSignIn = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <button 
          onClick={handleSignIn}
          className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">SocialSync AI Dashboard</h1>
        <button onClick={() => signOut(auth)} className="text-sm text-slate-600 hover:text-slate-900">Sign Out</button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PostEditor onPostCreated={() => {}} />
        <PostList />
      </div>
    </div>
  );
}
