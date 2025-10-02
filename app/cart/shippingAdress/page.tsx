import { getAddress } from '@/app/actions/address';
import AddressDisplay from '@/components/ui/AdressDisplay';
import AdressForm from '@/components/ui/AdressForm';
import Link from 'next/link';

export const dynamic = "force-dynamic";

export default async function ShippingAddressPage() {
  const result = await getAddress();

  if (!result.success) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>
        <p className="text-red-500">{result.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>
      {result.addresses && result.addresses.length > 0 ? (
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8 gap-6">
          <div className="flex-1 min-w-0">
            <AddressDisplay initialAddresses={JSON.parse(JSON.stringify(result.addresses))} />
          </div>

          <div className="mt-4 md:mt-0 flex-shrink-0">
            <Link
              href="/cart/payment"
              className="inline-block w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded text-center"
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4">No addresses found</p>
          <AdressForm />
        </div>
      )}
    </div>
  );
}
