import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import './index.css'
import App from './App.tsx'
import { Skeleton } from './components/ui/skeleton'

// Simple loading component for persist gate
const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center bg-f1-black">
    <Skeleton className="h-12 w-48" />
  </div>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
