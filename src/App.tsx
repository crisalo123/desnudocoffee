import { CartProvider } from '@/presentation/context/CartProvider'
import { HomePage } from '@/presentation/pages/HomePage'

export default function App() {
  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  )
}
