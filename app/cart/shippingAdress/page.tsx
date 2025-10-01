
import { getAddress } from '@/app/actions/address';
import AddressDisplay from '@/components/ui/AdressDisplay';
import AdressForm from '@/components/ui/AdressForm';
import Link from 'next/link';

export const dynamic = "force-dynamic";

export default async function ShippingAddressPage() {
  const result = await getAddress();

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>
        <p className="text-red-500">{result.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>
      {result.addresses && result.addresses.length > 0 ? (
        <div className="flex ">
          <AddressDisplay initialAddresses={JSON.parse(JSON.stringify(result.addresses))} />
          <Link href = '/cart/payment ' className = 'mt-50 h-full  inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded'>
            Proceed to Payment
          </Link>
        </div>
        
      ) : (
        <div>
          <p>No addresses found</p>
          <AdressForm />
        </div>
      )}
    </div>
  );
}
