import { Home, Globe, HelpCircle, MapPin, Activity, User } from 'lucide-react';
import { Link } from 'react-router';
import imgLogo from "@/assets/imgLogo.png";
import { t } from '../translations';

export default function Header() {
  return (
    <header className="bg-[#afb5e8] w-full">
      <div className="max-w-[1536px] mx-auto px-12">
        <div className="h-24 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={imgLogo}
              alt={t.header.logoAlt}
              className="h-16 w-auto"
            />
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t.header.searchPlaceholder}
                className="w-full px-4 py-2 pr-10 rounded-full border border-[#0c4c27] bg-white/50 text-[#0c4c27] placeholder:text-[#0c4c27]/70"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
                <svg className="w-4 h-4 text-[#0c4c27]" fill="none" viewBox="0 0 16 16">
                  <path d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6 bg-[#afb5e8] px-4 py-2 rounded-lg">
            <button className="flex flex-col items-center text-[#0c4c27] hover:opacity-80">
              <Globe className="w-5 h-5" />
              <span className="text-sm">{t.header.language}</span>
            </button>

            <button className="flex flex-col items-center text-[#0c4c27] hover:opacity-80">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm">{t.header.help}</span>
            </button>

            <button className="flex flex-col items-center text-[#0c4c27] hover:opacity-80">
              <MapPin className="w-5 h-5" />
              <span className="text-sm">{t.header.meetings}</span>
            </button>

            <button className="flex flex-col items-center text-[#0c4c27] hover:opacity-80">
              <Activity className="w-5 h-5" />
              <span className="text-sm">{t.header.activities}</span>
            </button>

            <button className="flex flex-col items-center text-[#0c4c27] hover:opacity-80">
              <User className="w-5 h-5" />
              <span className="text-sm">{t.header.signIn}</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#afb5e8] border-t border-[#2b6342]/10">
        <div className="max-w-[1536px] mx-auto px-12">
          <div className="h-14 flex items-center gap-2 text-[#2b6342]">
            <Link to="/" className="flex items-center gap-1 hover:opacity-80">
              <Home className="w-5 h-5" />
            </Link>
            <span>/</span>
            <span className="px-2 py-1">{t.header.breadcrumbHaveYourSay}</span>
            <span>/</span>
            <span className="px-2 py-1 font-medium">{t.header.breadcrumbForum}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
