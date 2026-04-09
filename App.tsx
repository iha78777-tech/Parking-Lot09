/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { MapPin, ExternalLink, Info, Globe, Palette } from 'lucide-react';
import { useState } from 'react';

type ThemeType = 'modern' | 'forest';

interface ThemeConfig {
  name: string;
  bg: string;
  header: string;
  card: string;
  cardBorder: string;
  text: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  navBtn: string;
  navBtnHover: string;
  footer: string;
}

const THEMES: Record<ThemeType, ThemeConfig> = {
  modern: {
    name: 'Modern (標準)',
    bg: 'bg-gray-50',
    header: 'bg-white/80 backdrop-blur-md border-gray-100',
    card: 'bg-white',
    cardBorder: 'border-gray-100 hover:border-orange-200',
    text: 'text-gray-900',
    textMuted: 'text-gray-400',
    accent: 'bg-orange-500',
    accentHover: 'hover:bg-orange-600',
    navBtn: 'bg-gray-900',
    navBtnHover: 'hover:bg-orange-600',
    footer: 'border-gray-100 text-gray-400',
  },
  forest: {
    name: 'Forest (公園)',
    bg: 'bg-emerald-50/30',
    header: 'bg-emerald-900 text-white border-emerald-800',
    card: 'bg-white',
    cardBorder: 'border-emerald-100 hover:border-emerald-300',
    text: 'text-emerald-950',
    textMuted: 'text-emerald-600',
    accent: 'bg-emerald-600',
    accentHover: 'hover:bg-emerald-700',
    navBtn: 'bg-emerald-800',
    navBtnHover: 'hover:bg-emerald-700',
    footer: 'border-emerald-100 text-emerald-400',
  },
};

interface ParkingInfo {
  id: string;
  name: { jp: string; en: string };
  url: string;
  capacity: { jp: string; en: string };
  color: string;
}

const PARKING_LOTS: ParkingInfo[] = [
  {
    id: 'P1',
    name: { jp: '大宮第三公園 駐車場', en: 'Omiya Third Park Parking' },
    url: 'https://www.google.com/maps/dir/?api=1&destination=大宮第三公園+駐車場',
    capacity: { jp: '約150台', en: 'Approx. 150 spaces' },
    color: 'bg-blue-500',
  },
  {
    id: 'P2',
    name: { jp: '大宮第二公園 駐車場', en: 'Omiya Second Park Parking' },
    url: 'https://www.google.com/maps/dir/?api=1&destination=大宮第二公園+駐車場',
    capacity: { jp: '約300台', en: 'Approx. 300 spaces' },
    color: 'bg-cyan-500',
  },
  {
    id: 'P3',
    name: { jp: '北側駐車場', en: 'North Parking' },
    url: 'https://www.google.com/maps/dir/?api=1&destination=北側駐車場',
    capacity: { jp: '約200台', en: 'Approx. 200 spaces' },
    color: 'bg-sky-500',
  },
];

const CONTENT = {
  title: { jp: '大宮第3公園 駐車場案内', en: 'Omiya Third Park Parking Guide' },
  subtitle: { jp: '大宮公園エリア', en: 'Omiya Park Area' },
  mapAlt: { jp: '駐車場マップ', en: 'Parking Map' },
  navButton: { jp: 'Googleマップで開く', en: 'Open in Google Maps' },
  notice: { jp: '※満車の場合は近隣の有料駐車場をご利用ください。', en: '*If full, please use nearby paid parking lots.' },
};

export default function App() {
  const [theme, setTheme] = useState<ThemeType>('modern');
  const currentTheme = THEMES[theme];

  return (
    <div className={`min-h-screen ${currentTheme.bg} font-sans ${currentTheme.text} transition-colors duration-500 selection:bg-orange-100`}>
      <header className={`sticky top-0 z-50 ${currentTheme.header} border-b px-4 py-3 transition-all duration-500`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className={`text-xl font-bold tracking-tight flex flex-col sm:flex-row sm:gap-3`}>
              <span>{CONTENT.title.jp}</span>
              <span className={`${theme === 'midnight' || theme === 'forest' || theme === 'vibrant' ? 'text-white/30' : 'text-gray-400'} font-medium hidden sm:inline`}>|</span>
              <span className={`text-xl sm:text-2xl ${theme === 'modern' || theme === 'elegant' ? 'text-gray-500' : 'text-white/80'} sm:${theme === 'modern' || theme === 'elegant' ? 'text-gray-900' : 'text-white'}`}>{CONTENT.title.en}</span>
            </h1>
            <p className={`text-sm ${theme === 'modern' || theme === 'elegant' ? 'text-gray-400' : 'text-white/60'} font-medium uppercase tracking-wider mt-0.5`}>
              {CONTENT.subtitle.jp} / {CONTENT.subtitle.en}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative group">
              <button className={`p-2 rounded-full ${theme === 'modern' || theme === 'elegant' ? 'bg-gray-100 text-gray-600' : 'bg-white/10 text-white'} hover:scale-110 transition-all`}>
                <Palette className="w-5 h-5" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] p-2">
                {(Object.keys(THEMES) as ThemeType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`w-full text-left px-4 py-2 rounded-xl text-sm font-bold transition-colors ${theme === t ? 'bg-orange-500 text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {THEMES[t].name}
                  </button>
                ))}
              </div>
            </div>
            <Globe className={`w-5 h-5 ${theme === 'modern' || theme === 'elegant' ? 'text-gray-300' : 'text-white/30'}`} />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Visual Map Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-4 ${theme === 'midnight' ? 'border-slate-800' : 'border-white'} bg-white group transition-all duration-500`}>
              <img 
                src="/Photoroom_20260404_222532.jpg" 
                alt={CONTENT.mapAlt.jp}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {PARKING_LOTS.map((lot) => (
                <div key={lot.id} className={`${currentTheme.card} flex items-center gap-1 px-3 py-1.5 rounded-full shadow-sm border ${currentTheme.cardBorder} whitespace-nowrap transition-all`}>
                  <span className={`w-3 h-3 rounded-full ${lot.color}`} />
                  <span className={`text-xs font-bold ${currentTheme.text}`}>{lot.id}</span>
                </div>
              ))}
            </div>

            {/* Large Orange Navigation Button for P1 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-2"
            >
              <a
                href={PARKING_LOTS[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center gap-1 w-full py-6 ${currentTheme.accent} text-white rounded-3xl font-bold ${currentTheme.accentHover} transition-all shadow-xl active:scale-[0.98] border-4 ${theme === 'midnight' ? 'border-slate-800' : 'border-white'}`}
              >
                <div className="flex items-center gap-3 text-xl">
                  <MapPin className="w-6 h-6" />
                  <span>大宮第三公園 ナビ開始</span>
                </div>
                <div className="text-base opacity-90 font-medium">Start Navigation (Omiya Third Park)</div>
              </a>
            </motion.div>
          </motion.div>

          {/* Navigation & Details Sections */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {PARKING_LOTS.map((lot) => (
                <div 
                  key={lot.id}
                  className={`${currentTheme.card} rounded-2xl p-5 shadow-sm border ${currentTheme.cardBorder} transition-all group`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`flex items-center justify-center w-10 h-10 rounded-xl ${lot.color} text-white font-bold text-lg shadow-lg shadow-blue-100`}>
                        {lot.id}
                      </span>
                      <div>
                        <h3 className={`font-bold ${currentTheme.text} leading-tight`}>
                          <div className="text-base">{lot.name.jp}</div>
                          <div className={`text-base ${currentTheme.textMuted} font-medium`}>{lot.name.en}</div>
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className={`flex flex-col gap-1 mb-4 text-sm ${currentTheme.textMuted} ${theme === 'midnight' ? 'bg-slate-800/50' : 'bg-gray-50'} p-3 rounded-xl transition-all`}>
                    <div className="flex items-center gap-1.5">
                      <Info className="w-4 h-4 opacity-50" />
                      <span className={`font-bold ${currentTheme.text}`}>{lot.capacity.jp}</span>
                      <span className="opacity-30">/</span>
                      <span className={`font-medium ${currentTheme.textMuted}`}>{lot.capacity.en}</span>
                    </div>
                  </div>

                  <a
                    href={lot.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center justify-center gap-0.5 w-full py-3 ${currentTheme.navBtn} text-white rounded-xl font-bold ${currentTheme.navBtnHover} transition-all shadow-md active:scale-[0.98]`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{CONTENT.navButton.jp}</span>
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </div>
                    <div className="text-xs opacity-70 font-medium">{CONTENT.navButton.en}</div>
                  </a>
                </div>
              ))}
            </motion.div>

            <div className={`${theme === 'midnight' ? 'bg-slate-900/50 border-slate-800' : 'bg-gray-100/50 border-gray-200'} rounded-2xl p-4 border border-dashed transition-all`}>
              <p className={`text-sm ${currentTheme.text} font-bold mb-1`}>{CONTENT.notice.jp}</p>
              <p className={`text-sm ${currentTheme.textMuted}`}>{CONTENT.notice.en}</p>
            </div>
          </div>
        </div>
      </main>

      <footer className={`max-w-6xl mx-auto p-8 text-center ${currentTheme.footer} text-xs border-t mt-8 transition-all`}>
        <p>&copy; 2026 Omiya Third Park Parking Guide. Optimized for Mobile.</p>
      </footer>
    </div>
  );
}
