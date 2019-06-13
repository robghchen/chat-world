import { cookies } from "../utils/cookies";

const apiKey = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;

export const googleTranslate = require("google-translate")(apiKey);

export const translate = str => {
  googleTranslate.detectLanguage(str, function(err, detection) {
    if (detection.language !== cookies.get("language")) {
      googleTranslate.translate(str, cookies.get("language"), function(
        err,
        translation
      ) {
        str = translation.translatedText;
      });
    }
    translating(str);
  });

  const translating = str => {
    this.setState({ str });
  };
};

export const compDidUp = (str, translating) => {
  googleTranslate.detectLanguage(str, function(err, detection) {
    if (detection.language !== cookies.get("language")) {
      googleTranslate.translate(str, cookies.get("language"), function(
        err,
        translation
      ) {
        str = translation.translatedText;
        translating(str);
      });
    }
  });
};
