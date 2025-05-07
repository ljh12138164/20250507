'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType>({
  locale: 'en',
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState('en');

  useEffect(() => {
    // 初始化时，检查本地存储中是否有语言设置
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      setLocaleState(savedLocale);
    } else {
      // 如果没有，则检查浏览器语言设置
      const browserLocale = navigator.language.split('-')[0];
      if (browserLocale === 'zh') {
        setLocaleState('zh');
      }
    }
  }, []);

  const setLocale = (newLocale: string) => {
    localStorage.setItem('locale', newLocale);
    setLocaleState(newLocale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
