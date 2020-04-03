import resolve from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  output: [
    {
      dir: "public",
      format: "es"
    }
  ],
  plugins: [resolve()]
};
