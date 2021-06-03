const { Translate } = require("@google-cloud/translate").v2;
const trans = new Translate({
  projectId: process.env.GOOGLE_TRANSLATE_PROJECT_ID,
  KeyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const translateMessage = async (textToTranslate, fromLanguage, toLanguages) => {
  const translations = await Promise.all(
    toLanguages.map(async (language) => {
      const result = await trans.translate(textToTranslate, {
        from: fromLanguage,
        to: language,
      });
      return { language, translation: result[0] };
    })
  ).catch((err) => {
    res.status(500).json({ error: err });
    throw new Error("translation error");
  });

  return translations;
};

module.exports = translateMessage;
