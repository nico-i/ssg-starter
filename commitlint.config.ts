module.exports = {
  extends: [`@commitlint/config-conventional`],
  rules: {
    "require-spent": [2, `always`],
  },
  plugins: [
    {
      rules: {
        "require-spent": ({ raw }: { raw: string }) => {
          const commitMessage = raw.trim();

          const msgSplit = commitMessage.split(`\n`);
          if (msgSplit.length < 3)
            return [
              false,
              `'/spent' directive must be in new line separated by another new line`,
            ]; // ensure that commit message has more than 1 line

          if (msgSplit[1] !== ``)
            return [
              false,
              `'/spent' directive must be separated by another new line`,
            ]; // ensure that commit message has more than 1 line

          const spentSplit = msgSplit[msgSplit.length - 1].split(` `);
          const isCorrectCommand =
            spentSplit[0] === `/spent` || spentSplit[0] === `/spend`;
          if (spentSplit.length < 2 || !isCorrectCommand)
            return [
              false,
              `the last line of a commit must be a '/spent' directive`,
            ]; // ensure that commit message ends with '/spent'

          const spentTimeValue = spentSplit[spentSplit.length - 1].trim();
          const regex = /^(\d|[1-5]\d)m|(([1-9]|[1-4]\d)h(\d|[1-5]\d)?m?)$/; // 1h30, 30m, 1h, 1h30m, 1h30, 1h30m
          const matches = regex.exec(spentTimeValue);

          if (!matches || matches[0].length !== spentTimeValue.length) {
            // ensure that spent time value is valid
            return [
              false,
              `Commit message must end with a valid spent time with the format '/spent 1h30' or '/spent 30m' or '/spent 1h'`,
            ];
          }
          return [true];
        },
      },
    },
  ],
};
