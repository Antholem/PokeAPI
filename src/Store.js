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

  shiny: localStorage.getItem('shiny') === 'true' || false,
  toggleShiny: () => {
    set((state) => {
      const newShiny = !state.shiny;
      localStorage.setItem('shiny', newShiny);
      return { shiny: newShiny };
    });
  },

  themeColor: localStorage.getItem('themeColor') || 'navy',
  setThemeColor: (color) => {
    set(() => {
      localStorage.setItem('themeColor', color);
      return { themeColor: color };
    });
  },

  sprites: localStorage.getItem('sprites') || 'default',
  setSprites: (sprites) => {
    localStorage.setItem('sprites', sprites);
    set({ sprites });
  },
}));

export default useStore;
