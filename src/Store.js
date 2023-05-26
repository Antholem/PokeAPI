import create from 'zustand';

const useStore = create((set) => ({
  mode: localStorage.getItem('mode') || 'dark',
  toggleColorMode: () => {
    set((state) => {
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', newMode);
      return { mode: newMode };
    });
  },
}));

export default useStore;
