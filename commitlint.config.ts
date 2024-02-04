module.exports = {
  extends: [`@commitlint/config-conventional`],
  rules: {
    spend: [2, `always`],
  },
  plugins: [`commitlint-plugin-spend`],
};
