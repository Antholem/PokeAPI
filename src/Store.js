import create from 'zustand';

const useStore = create((set) => ({
  // State for the color mode (light or dark)
  mode: localStorage.getItem('mode') || 'dark',
  // Function to toggle the color mode
  toggleColorMode: () => {
    set((state) => {
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', newMode);
      return { mode: newMode };
    });
  },

  // State for shiny flag
  shiny: localStorage.getItem('shiny') === 'true' || false,
  // Function to toggle the shiny flag
  toggleShiny: () => {
    set((state) => {
      const newShiny = !state.shiny;
      localStorage.setItem('shiny', newShiny);
      return { shiny: newShiny };
    });
  },

  // State for theme color
  themeColor: localStorage.getItem('themeColor') || 'navy',
  // Function to set the theme color
  setThemeColor: (color) => {
    set(() => {
      localStorage.setItem('themeColor', color);
      return { themeColor: color };
    });
  },

  // State for render pokemon
  renderPokemon: localStorage.getItem('renderPokemon') || 386,
  // Function to set the render pokemon
  setRenderPokemon: (renderPokemon) => {
    set(() => {
      localStorage.setItem('renderPokemon', renderPokemon);
      return { renderPokemon: renderPokemon };
    });
  },

  // State for render pokemon move
  renderMove: localStorage.getItem('renderMove') || 100,
  // Function to set the render pokemon move
  setRenderMove: (renderMove) => {
    set(() => {
      localStorage.setItem('renderMove', renderMove);
      return { renderMove: renderMove };
    });
  },

  // State for render pokemon ability
  renderAbility: localStorage.getItem('renderAbility') || 10,
  // Function to set the render pokemon ability
  setRenderAbility: (renderAbility) => {
    set(() => {
      localStorage.setItem('renderAbility', renderAbility);
      return { renderAbility: renderAbility };
    });
  },

  // State for render pokemon ability
  renderItem: localStorage.getItem('renderItem') || 100,
  // Function to set the render pokemon ability
  setRenderItem: (renderItem) => {
    set(() => {
      localStorage.setItem('renderItem', renderItem);
      return { renderItem: renderItem };
    });
  },

  // State for sprites
  sprites: localStorage.getItem('sprites') || 'default',
  // Function to set the sprites
  setSprites: (sprites) => {
    localStorage.setItem('sprites', sprites);
    set({ sprites });
  },

  // State and functions for different color settings
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

  powColor: localStorage.getItem('powColor') || 'cherry',
  setPowColor: (powColor) => {
    localStorage.setItem('powColor', powColor);
    set({ powColor });
  },

  ppColor: localStorage.getItem('ppColor') || 'emerald',
  setPpColor: (ppColor) => {
    localStorage.setItem('ppColor', ppColor);
    set({ ppColor });
  },

  accColor: localStorage.getItem('accColor') || 'indigo',
  setAccColor: (accColor) => {
    localStorage.setItem('accColor', accColor);
    set({ accColor });
  },
}));

export default useStore;
