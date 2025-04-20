import React, { createContext, useState, useContext, useEffect } from 'react';

interface SiteSettings {
  siteName: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

const defaultSettings: SiteSettings = {
  siteName: 'Wallet2QR',
  metaTitle: 'Wallet2QR | Tether (USDT) QR Code Generator for Secure Transactions',
  metaDescription: 'Convert USDT to QR codes effortlessly with our user-friendly generator. Simplify your crypto transactions and enhance your payment experience now.',
  metaKeywords: 'usdt to qr generator, usdt qr code generator, qr to usdt, btc to qr code generator, usdt qr code, btc to qr code, usdt trc20 qr code generator, ethereum qr code, eth qr code generator, crypto qr code, wallet qr code',
};

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  // Load settings from localStorage on initial render
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('siteSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading site settings:', error);
    }
  }, []);

  // Update settings and save to localStorage
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    try {
      localStorage.setItem('siteSettings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Error saving site settings:', error);
    }
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
