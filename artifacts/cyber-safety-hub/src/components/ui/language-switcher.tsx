import { useTranslation } from "react-i18next";
import { Button } from "./button";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-xl border-white/10 text-white min-w-[120px] rounded-xl p-1">
        <DropdownMenuItem 
          onClick={() => changeLanguage("en")}
          className={`rounded-lg cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors py-2 px-3 flex items-center justify-between ${i18n.language === 'en' ? 'bg-white/5 text-primary' : ''}`}
        >
          <span>{t('nav.lang_en')}</span>
          {i18n.language === 'en' && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage("hi")}
          className={`rounded-lg cursor-pointer hover:bg-white/10 focus:bg-white/10 transition-colors py-2 px-3 flex items-center justify-between ${i18n.language === 'hi' ? 'bg-white/5 text-primary' : ''}`}
        >
          <span>{t('nav.lang_hi')}</span>
          {i18n.language === 'hi' && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
