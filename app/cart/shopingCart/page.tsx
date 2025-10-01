
import { getCartData } from '@/app/actions/cart';
import CartCard  from '@/components/ui/CartCard';

export const dynamic = "force-dynamic";

export default async function CartPage() {
  
  try {
    const result = await getCartData();
    
    if (!result.success) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
          <p className="text-red-500">{result.message}</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        
        {result.cart && result.cart.items && result.cart.items.length > 0 ? (
          <div>
            <p>Found {result.cart.items.length} items</p>
             <CartCard
        initialCartData={JSON.parse(JSON.stringify(result.cart))} 
      />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    return <div>Error loading cart: {String(error)}</div>;
  }
}


