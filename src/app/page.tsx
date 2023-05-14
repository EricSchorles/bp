
import { NavigationProvider } from "./components/context/Navigation/useNavigation";
import Button from "./components/context/Theme/Switchable";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <NavigationProvider>
        <div className='dark:bg-green-400 bg-black w-full h-full'>
        </div>
      </NavigationProvider>
    </main>
  )
}
