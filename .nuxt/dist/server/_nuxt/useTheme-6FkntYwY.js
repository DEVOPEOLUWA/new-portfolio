import { computed } from "vue";
import { a as useState } from "../server.mjs";
const useColorMode = () => {
  return useState("color-mode").value;
};
function useTheme() {
  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === "dark");
  const toggleTheme = () => {
    colorMode.preference = isDark.value ? "light" : "dark";
  };
  return {
    isDark,
    toggleTheme,
    colorMode
  };
}
export {
  useTheme as u
};
//# sourceMappingURL=useTheme-6FkntYwY.js.map
