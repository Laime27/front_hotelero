import React, { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    localStorage.setItem("theme", theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"))

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
