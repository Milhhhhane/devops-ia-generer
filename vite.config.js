import { resolve } from "path";

export default {
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "gestion-quiz": resolve(__dirname, "gestion-quiz.html"),
      },
    },
  },
  publicDir: "public",
};
