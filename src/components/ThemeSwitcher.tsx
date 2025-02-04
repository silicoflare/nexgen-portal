"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="text-foreground cursor-pointer"
      onClick={(e) => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "light" ? <SunIcon size={20} /> : <MoonIcon size={20} />}
    </div>
  );
}
