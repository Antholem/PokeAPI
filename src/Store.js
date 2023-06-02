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

  hpColor: localStorage.getItem('hpColor') || 'cherry',
  setHpColor: (hpColor) => {
    localStorage.setItem('hpColor', hpColor);
    set({ hpColor });
  },

  atkColor: localStorage.getItem('atkColor') || 'apricot',
  setAtkColor: (atkColor) => {
    localStorage.setItem('atkColor', atkColor);
    set({ atkColor });
  },

  defColor: localStorage.getItem('defColor') || 'amber',
  setDefColor: (defColor) => {
    localStorage.setItem('defColor', defColor);
    set({ defColor });
  },

  sAtkColor: localStorage.getItem('sAtkColor') || 'emerald',
  setSAtkColor: (sAtkColor) => {
    localStorage.setItem('sAtkColor', sAtkColor);
    set({ sAtkColor });
  },
  
  sDefColor: localStorage.getItem('sDefColor') || 'navy',
  setSDefColor: (sDefColor) => {
    localStorage.setItem('sDefColor', sDefColor);
    set({ sDefColor });
  },

  speedColor: localStorage.getItem('speedColor') || 'indigo',
  setSpeedColor: (speedColor) => {
    localStorage.setItem('speedColor', speedColor);
    set({ speedColor });
  },

  totalColor: localStorage.getItem('totalColor') || 'lavender',
  setTotalColor: (totalColor) => {
    localStorage.setItem('totalColor', totalColor);
    set({ totalColor });
  },

  favorite: localStorage.getItem('favorite') === 'true' || false,
  toggleFavorite: () => {
    set((state) => {
      const newFavorite = !state.favorite;
      localStorage.setItem('favorite', newFavorite.toString());
      return { favorite: newFavorite };
    });
  },

}));

export default useStore;
