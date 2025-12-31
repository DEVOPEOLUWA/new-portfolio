export const usePageNavigation = () => {
  const currentPage = useState("currentPage", () => 0);
  const totalPages = 6;
  const nextPage = () => {
    if (currentPage.value < totalPages - 1) {
      currentPage.value++;
    }
  };

  const prevPage = () => {
    if (currentPage.value > 0) {
      currentPage.value--;
    }
  };

  const goToPage = (index: number) => {
    if (index >= 0 && index < totalPages) {
      currentPage.value = index;
    }
  };

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  };
};
