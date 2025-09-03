import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Lang = "es" | "en";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const LanguageContext = createContext<Ctx | undefined>(undefined);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return ctx;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    return saved === "en" || saved === "es" ? saved : "es";
  });

  const setLang = (l: Lang) => setLangState(l);

  useEffect(() => {
    try { localStorage.setItem("lang", lang); } catch {}
    // Opcional: actualizar atributo lang del html
    try { document?.documentElement?.setAttribute("lang", lang); } catch {}
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

