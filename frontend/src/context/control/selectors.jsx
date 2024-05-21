const contextSelectors = (state) => {
  return {
    isStartModalOpen: () => {
      return state.isStartModalOpen;
    },
    isSelectModalOpen: () => {
      return state.isSelectModalOpen;
    },
  };
};

export default contextSelectors;
