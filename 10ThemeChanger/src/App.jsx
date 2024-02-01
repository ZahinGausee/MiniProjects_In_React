import { useEffect, useState } from 'react'
import { ThemeProvider } from './contexts/themeContext'
import ThemeButton from './components/ThemeButton';
import Card from './components/Card';

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const darkMode = () => {
    setThemeMode("dark");
  }
  const lightMode = () => {
    setThemeMode("light");
  }

  useEffect(() => {
    const htmlElement = document.querySelector('html')
    htmlElement.classList.remove("dark", "light");
    htmlElement.classList.add(themeMode);
  }, [themeMode])

  return (
    <ThemeProvider value={{themeMode, lightMode, darkMode}}>
      <div className="flex flex-wrap min-h-screen items-center">
          <div className="w-full">
              <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                  <ThemeButton />
              </div>

              <div className="w-full max-w-sm mx-auto">
                  <Card />
              </div>
          </div>
      </div>
    </ThemeProvider>
  )
}

export default App
