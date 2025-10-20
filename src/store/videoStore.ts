import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
export interface Video {
  id: string;
  prompt: string;
  url: string;
  createdAt: string;
}
interface VideoState {
  videos: Video[];
  isLoading: boolean;
  error: string | null;
  addVideo: (video: Video) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
export const useVideoStore = create<VideoState>()(
  persist(
    (set) => ({
      videos: [],
      isLoading: false,
      error: null,
      addVideo: (video) => set((state) => ({ videos: [video, ...state.videos] })),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error: error }),
    }),
    {
      name: 'stellarframe-video-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);