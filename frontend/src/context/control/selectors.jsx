const contextSelectors = (state) => {
  return {
    isStartModalOpen: () => {
      return state.isStartModalOpen;
    },
    isSelectModalOpen: () => {
      return state.isSelectModalOpen;
    },
    isStartAllModalOpen: () => {
      return state.isStartAllModalOpen;
    },
  };
};

export default contextSelectors;
