import { useSelector } from 'react-redux';
import translations from '../translations';

const useTranslation = () => {
  const language = useSelector((state) => state.language.currentLanguage);
  return translations[language] || translations.en; // Default to English if language is missing
};

export default useTranslation;
