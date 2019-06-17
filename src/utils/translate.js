import { config } from "../../config";

export const apiKey = config.GOOGLE_TRANSLATE_API_KEY;

export const langCodes = [
  { language: "ar", name: "Arabic" },
  { language: "zh", name: "Chinese" },
  { language: "en", name: "English" },
  { language: "tl", name: "Filipino" },
  { language: "fr", name: "French" },
  { language: "de", name: "German" },
  { language: "iw", name: "Hebrew" },
  { language: "hi", name: "Hindi" },
  { language: "ga", name: "Irish" },
  { language: "it", name: "Italian" },
  { language: "ja", name: "Japanese" },
  { language: "ko", name: "Korean" },
  { language: "ms", name: "Malay" },
  { language: "pt", name: "Portuguese" },
  { language: "ro", name: "Romanian" },
  { language: "ru", name: "Russian" },
  { language: "so", name: "Somali" },
  { language: "es", name: "Spanish" },
  { language: "th", name: "Thai" },
  { language: "vi", name: "Vietnamese" }
]