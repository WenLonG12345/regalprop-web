
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCurrency } from "@/components/common/CurrencyContext";
import { useUnitMeasurement } from "@/components/common/UnitMeasurementContext";
import PreferenceModal from '@/components/popup/Preference';
import React, { useEffect, useState, useCallback } from "react";
import { Search, Heart, MapPin, Bed, Bath, Maximize, X, Menu, ChevronDown, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

function buildNavItems(dict) {
  const n = dict?.nav || {};
  return [
    { href: "/", label: n.home ?? "Home" },
    { href: "/properties", label: n.properties ?? "Properties" },
    { href: "/projects", label: n.projects ?? "Projects" },
    { href: "/agents", label: n.agents ?? "Agents" },
    { href: "/about", label: n.about ?? "About us" },
    { href: "/contact", label: n.contact ?? "Contact" },
    { href: "/news", label: n.news ?? "News" },
    { href: "/events", label: n.events ?? "Events" },
    { href: "/mm2h", label: n.mm2h ?? "MM2H" },
    { href: "/education", label: n.education ?? "Education" },
    { href: "/faq", label: n.faq ?? "FAQ" },
    { href: "/online-listing", label: n.onlineListing ?? "Online listing" },
    {
      href: "/recruitment-agent",
      label: n.recruitmentAgent ?? "Recruitment"
    },
    {
      href: "/login-register",
      label: n.loginRegister ?? "Login / Register"
    },
    {
      href: "/saved-properties",
      label: n.savedProperties ?? "Saved properties"
    },
    {
      href: "/transacted-properties",
      label: n.transactedProperties ?? "Transacted properties"
    }
  ];
}

const languages = [
  { code: "en", label: "English", label_shortform: "EN" },
  { code: "ms", label: "Bahasa Melayu", label_shortform: "BM" },
  { code: "zh-cn", label: "简体", label_shortform: "简" },
  { code: "zh-hk", label: "繁中", label_shortform: "繁" }
];

const currencyOptions = [
  { code: "MYR", label: "RM" },
  { code: "USD", label: "USD $" },
  { code: "SGD", label: "SGD $" },
  { code: "CNY", label: "CNY ¥" }
];

const measurementUnitOptions = [
  { code: "ft2", label: "Square foot | ft²", label_shortform: "ft²" },
  { code: "m2", label: "Square meter | m²", label_shortform: "m²" }
];

const NAV_MENU_ITEMS = [
  { label: '主頁', icon: '🏠' },
  { label: '買盤', icon: '🏘️' },
  { label: '租盤', icon: '🔑' },
  { label: '屋苑', icon: '🏢' },
  { label: '一手新盤', icon: '✨' },
  { label: '地區搜樓', icon: '📍' },
  { label: '搵代理人', icon: '👤' },
  { label: '更多', icon: '⋯' },
];

// Social Media Icons Data
const SOCIAL_MEDIA_LINKS = [
  { name: 'Facebook', url: 'https://facebook.com', color: '#1877f2', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { name: 'YouTube', url: 'https://youtube.com', color: '#ff0000', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  { name: 'Instagram', url: 'https://instagram.com', color: '#e4405f', icon: 'M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z' },
  { name: 'Threads', url: 'https://threads.net', color: '#000000', icon: 'M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.33-3.022.88-.73 2.108-1.15 3.456-1.187 1.024-.028 1.985.108 2.865.406-.07-.737-.281-1.322-.636-1.747-.465-.559-1.17-.848-2.095-.861h-.048c-.748 0-1.672.209-2.378.797l-1.283-1.566c.972-.794 2.253-1.236 3.612-1.248h.072c1.482.017 2.694.493 3.552 1.45.715.798 1.128 1.89 1.237 3.258.387.168.752.367 1.09.595 1.08.73 1.881 1.768 2.313 3.006.598 1.712.506 4.25-1.592 6.312-1.86 1.826-4.165 2.584-7.276 2.608zm-.353-8.28c-.818.022-1.46.201-1.857.518-.324.259-.467.588-.439.972.024.33.197.627.515.885.398.322 1.003.497 1.702.462.984-.054 1.71-.377 2.218-.987.37-.445.627-1.04.763-1.77-.876-.258-1.812-.375-2.756-.343l-.146.263z' },
  { name: 'Xiaohongshu', url: 'https://xiaohongshu.com', color: '#fe2c55', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' },
  { name: 'WeChat', url: '#', color: '#07c160', icon: 'M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.5c.89.31 1.87.5 2.89.5.17 0 .34 0 .51-.02-.11-.49-.17-1-.17-1.48 0-3.31 3.13-6 7-6 .34 0 .67.02 1 .07C17.07 5.57 13.58 4 9.5 4zM7 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4.5 2c-3.04 0-5.5 2.12-5.5 4.75s2.46 4.75 5.5 4.75c.68 0 1.34-.11 1.96-.31L20 21l-.69-1.92C20.97 18.13 22 16.58 22 14.75 22 12.12 19.54 10 16.5 10zm-2 4c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75zm4 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75z' },
  { name: 'TikTok', url: 'https://tiktok.com', color: '#000000', icon: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
  { name: 'LinkedIn', url: 'https://linkedin.com', color: '#0a66c2', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
];

// More Dropdown Items
const MORE_DROPDOWN_ITEMS = [
  { label: '成交紀錄', href: '#' },
  { label: '按揭計算機', href: '#' },
  { label: '樓市資訊', href: '#' },
  { label: '業主放盤', href: '#' },
  { label: '代理加盟', href: '#' },
  { label: '聯絡我們', href: '#' },
];

// Social Icon Component
const SocialIcon = ({ name, url, color, icon }: { name: string; url: string; color: string; icon: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    title={name}
    className="w-7 h-7 rounded-full flex items-center justify-center transition-transform hover:scale-110"
    style={{ backgroundColor: color }}
  >
    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
      <path d={icon} />
    </svg>
  </a>
);

const MAIN_TABS = ['買房', '租房', '成交', '小區', '新房', '經紀人'];

export default function Header({  locale, dict  }: any) {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { currency, setCurrency } = useCurrency();
  const { unit, setUnit } = useUnitMeasurement();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMoreDropdown_AboutRegal, setShowMoreDropdown_AboutRegal] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);

  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);

  const basePath = `/${locale}`;

  let currentPath = "/properties";
  if (pathname) {
    const segments = pathname.split("/");
    if (segments.length > 2) {
      const rest = segments.slice(2).join("/");
      currentPath = `/${rest || "properties"}`;
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === "undefined") return;
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePreferenceSave = (values: {
    language: string;
    currency: string;
    unit: string;
  }) => {
    setIsPreferenceModalOpen(false);

    // Update currency
    if (values.currency && values.currency !== currency) {
      setCurrency(values.currency);
    }

    // Update locale in URL
    if (values.language && values.language !== locale) {
      const segments = pathname.split("/").filter(Boolean); 
      const rest = segments.slice(1).join("/") || "properties";
      router.push(`/${values.language}/${rest}`);
    }
  };

  const navItems = buildNavItems(dict);

  const headerClasses =
    "bg-white z-40 transition-shadow transition-transform duration-300 " +
    (isScrolled ? "fixed top-0 left-0 right-0 shadow-md" : "relative border-b");

  const innerPadding = isScrolled ? "py-2" : "py-3";

  return (
    <>
      {/* start custom header */}
      {/* Top Header - Sticky */}
      <header className={`sticky top-0 z-50 bg-white border-b-[3px] border-[#e30613] pb-2.5 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>

        {!isScrolled && (
          <>
            <div className="max-w-[1400px] mx-auto px-5 flex items-center justify-between flex-wrap gap-4 top-header-social-wrapper">
              
                  {/* Left - Navigation Links */}
                  <nav className="hidden md:flex items-center gap-6 text-sm">
                    <a href="#" className="text-gray-700 hover:text-[#e30613] transition-colors">Home</a>
                    <a href="#" className="text-gray-700 hover:text-[#e30613] transition-colors">Buy</a>
                    <a href="#" className="text-gray-700 hover:text-[#e30613] transition-colors">Rent</a>
                    <a href="#" className="text-gray-700 hover:text-[#e30613] transition-colors">Transaction</a>
                    <a href="#" className="text-gray-700 hover:text-[#e30613] transition-colors">Estate</a>
                    <a href="#" className="text-gray-700 hover:text-[#e30613] transition-colors">New Property</a>
                    
                    {/* About Regal */}
                    <div className="relative">
                      <button
                        onClick={() => setShowMoreDropdown_AboutRegal(!showMoreDropdown_AboutRegal)}
                        className="flex items-center gap-1 text-gray-700 hover:text-[#e30613] transition-colors"
                      >
                        更多
                        <ChevronDown className={`h-4 w-4 transition-transform ${showMoreDropdown_AboutRegal ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showMoreDropdown_AboutRegal && (
                        <>
                          <div
                            className="fixed inset-0 z-[98]"
                            onClick={() => setShowMoreDropdown_AboutRegal(false)}
                          />
                          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-[100] min-w-[180px] py-2">
                            {MORE_DROPDOWN_ITEMS.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#e30613] transition-colors"
                                onClick={() => setShowMoreDropdown_AboutRegal(false)}
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* More Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                        className="flex items-center gap-1 text-gray-700 hover:text-[#e30613] transition-colors"
                      >
                        更多
                        <ChevronDown className={`h-4 w-4 transition-transform ${showMoreDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showMoreDropdown && (
                        <>
                          <div
                            className="fixed inset-0 z-[98]"
                            onClick={() => setShowMoreDropdown(false)}
                          />
                          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-[100] min-w-[180px] py-2">
                            {MORE_DROPDOWN_ITEMS.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#e30613] transition-colors"
                                onClick={() => setShowMoreDropdown(false)}
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </nav>

                  {/* Right - Social Icons and Links */}
                  <div className="flex items-center gap-4">
                    {/* Social Media Icons */}
                    <div className="hidden lg:flex items-center gap-1.5">
                      {SOCIAL_MEDIA_LINKS.map((social) => (
                        <SocialIcon key={social.name} {...social} />
                      ))}
                    </div>
                  </div>
            </div>
          </>
        )}

        <div className="max-w-[1400px] mx-auto px-5 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-8">

            {/* Scrolled Menu Button */}
            {isScrolled && (
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-1.5"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}

            {/* Logo */}
            <div className="flex items-center gap-2.5">
              {/*<div className="w-10 h-10 bg-[#e30613] rounded flex items-center justify-center text-white font-bold text-xl">
                麗
              </div>*/}
              <div className="flex items-center gap-2.5">
                <span className="text-xl font-bold text-gray-800">
                  <Link
                    href={`${basePath}/properties`}
                    className="text-xl font-bold whitespace-nowrap">
                    <span className="text-slate-900">Regal</span>
                    <span className="text-primary">Prop</span>
                  </Link>
                </span>
                {isScrolled && (
                  <>
                    <span className="text-gray-300 text-xl">|</span>
                    <span className="text-lg font-semibold text-gray-600">Page Title</span>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Desktop Navigation */}
            {!isScrolled && (
              <nav className="hidden md:flex gap-6 text-sm">
                {['主頁', '買盤', '租盤', '屋苑', '一手新盤', '更多1'].map((item, idx) => (
                  <a
                    key={item}
                    href="#"
                    className={`text-gray-800 hover:text-[#e30613] transition-colors ${idx === 0 ? 'font-medium' : ''}`}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Right Side Links */}
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="text-gray-600 hover:text-[#e30613]">
              中原幣
            </a>
            <a href="#" className="text-gray-600 hover:text-[#e30613]">
              分行網絡
            </a>
            <a href="#" className="text-gray-600 hover:text-[#e30613]">
              登入/註冊
            </a>
            <button onClick={() => setIsPreferenceModalOpen(true)}>
                <span>{languages.find(lang => lang.code === locale)?.label_shortform} |</span>
                <span className="pl-1">{currencyOptions.find(opt => opt.code === currency)?.label} |</span>
                <span className="pl-1">{measurementUnitOptions.find(opt => opt.code === unit)?.label_shortform}</span>
              </button>
              <PreferenceModal
                isOpen={isPreferenceModalOpen}
                onClose={() => setIsPreferenceModalOpen(false)}
                onSave={handlePreferenceSave}
                languages={languages}
                currencyOptions={currencyOptions}
                measurementUnitOptions={measurementUnitOptions}
                selectedLang={locale}
              />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu show={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
      {/* end custom header */}

      {/* start original header */}
      <header className={headerClasses}>
        <div
          className={`max-w-6xl mx-auto px-4 ${innerPadding} flex items-center justify-between gap-4`}
        >
          <Link
            href={`${basePath}/properties`}
            className="text-xl font-bold whitespace-nowrap"
          >
            <span className="text-slate-900">Regal</span>
            <span className="text-primary">Prop</span>
          </Link>

          {/* Desktop nav: show full menu when not scrolled; hide when scrolled */}
          <nav
            className={
              "hidden md:flex gap-4 text-xs lg:text-sm flex-wrap items-center " +
              (isScrolled
                ? "opacity-0 pointer-events-none select-none"
                : "opacity-100")
            }
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`${basePath}${item.href}`}
                className={`hover:text-primary whitespace-nowrap ${
                  currentPath === item.href ? "text-primary font-semibold" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-xs">
            {/* Currency switcher */}
            <div className="hidden sm:flex gap-1 border rounded-full px-2 py-1 bg-slate-50">
              {currencyOptions.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setCurrency(opt.code)}
                  className={
                    currency === opt.code
                      ? "px-1 font-semibold text-primary"
                      : "px-1 text-slate-500"
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Language switcher */}
            <div className="hidden sm:flex gap-1 border rounded-full px-2 py-1 bg-slate-50">
              {languages.map((lng) => (
                <Link
                  key={lng.code}
                  href={`/${lng.code}${currentPath}`}
                  className={
                    locale === lng.code
                      ? "font-semibold text-primary"
                      : "text-slate-500"
                  }
                >
                  {lng.label}
                </Link>
              ))}
            </div>

            {/* Menu icon */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className={
                "inline-flex flex-col justify-center items-center w-9 h-9 rounded-full border border-slate-300 bg-white md:ml-2 " +
                (isScrolled ? "opacity-100" : "md:hidden")
              }
              aria-label="Open navigation"
            >
              <span className="w-4 h-[2px] bg-slate-800 mb-1" />
              <span className="w-4 h-[2px] bg-slate-800 mb-1" />
              <span className="w-4 h-[2px] bg-slate-800" />
            </button>
          </div>
        </div>
      </header>

      {/* Side drawer menu */}
      <div
        className={
          "fixed inset-0 z-30 transition-opacity duration-300 " +
          (isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none")
        }
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setIsMenuOpen(false)}
        />
        {/* Drawer */}
        <div
          className={
            "absolute left-0 top-0 bottom-0 w-72 max-w-[80%] bg-white shadow-xl p-4 flex flex-col gap-4 transform transition-transform duration-300 " +
            (isMenuOpen ? "translate-x-0" : "-translate-x-full")
          }
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-lg font-bold">
              <span className="text-slate-900">Regal</span>
              <span className="text-primary">Prop</span>
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-slate-300 text-slate-700 text-lg"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Side menu nav items */}
          <nav className="flex-1 overflow-y-auto text-sm space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={`${basePath}${item.href}`}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg hover:bg-slate-100 ${
                  currentPath === item.href
                    ? "text-primary font-semibold"
                    : "text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Bottom: language & currency inside drawer for mobile */}
          <div className="space-y-2 text-xs">
            <div className="flex flex-wrap gap-2">
              {currencyOptions.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => {
                    setCurrency(opt.code);
                  }}
                  className={
                    "px-3 py-1 rounded-full border " +
                    (currency === opt.code
                      ? "border-primary text-primary"
                      : "border-slate-300 text-slate-600")
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((lng) => (
                <Link
                  key={lng.code}
                  href={`/${lng.code}${currentPath}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={
                    "px-3 py-1 rounded-full border " +
                    (locale === lng.code
                      ? "border-primary text-primary"
                      : "border-slate-300 text-slate-600")
                  }
                >
                  {lng.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header so content doesn't jump */}
      <div className={isScrolled ? "h-[56px]" : "h-[60px]"} />
    </>
  );
}

// Components
// Mobile Menu Component
interface MobileMenuProps {
  show: boolean;
  onClose: () => void;
}

const MobileMenu = ({ show, onClose }: MobileMenuProps) => {
  return (
    <>
      {/* Overlay */}
      {show && (
        <div
          className="fixed inset-0 bg-black/50 z-[1999] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 h-screen w-80 bg-white shadow-xl z-[2000] transition-transform duration-300 overflow-y-auto ${show ? 'left-0' : '-left-80'}`}
      >
        <div className="p-5">
          {/* Menu Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#e30613] rounded flex items-center justify-center text-white font-bold">
                中
              </div>
              <span className="text-lg font-bold text-gray-800">中原地產</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-6 w-6 text-gray-600" />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col">
            {NAV_MENU_ITEMS.map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-3 px-3 py-4 border-b border-gray-100 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>

          {/* Quick Links */}
          <div className="mt-8 p-5 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-800 mb-4">快速連結</h4>
            <div className="flex flex-col gap-3 text-sm">
              {['中原幣', '分行網絡', '按揭計算機', '市場資訊'].map((link) => (
                <a key={link} href="#" className="text-gray-600 hover:text-[#e30613]">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Sub Navigation Component
const SubNavigation = () => {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-[1400px] mx-auto px-5 py-5 flex justify-between items-center gap-4">
        <span className="text-2xl font-bold">網上搵樓</span>
        <div className="flex gap-8 text-base">
          {['主頁', '地區搜樓', '屋苑', '搵代理人'].map((item, idx) => (
            <button
              key={item}
              className={`bg-transparent border-none py-2 cursor-pointer ${
                idx === 0
                  ? 'text-gray-800 font-medium border-b-[3px] border-[#e30613]'
                  : 'text-gray-600'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
