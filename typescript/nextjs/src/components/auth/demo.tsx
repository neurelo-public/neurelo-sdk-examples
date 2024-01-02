import { GenericError, SafeError } from '@/types/generic';
import { Address, AddressApiService } from 'neurelo-sdk';

const getAddresses = async ({
  search,
}: {
  search: string;
}): Promise<[Address[] | undefined, SafeError | undefined]> => {
  try {
    const res = await AddressApiService.findAddress(undefined, {
      OR: [
        {
          address: {
            contains: search,
          },
        },
        // ...otherConditions
      ],
    });
    return [res.data.data, undefined];
  } catch (error) {
    const err = error as GenericError;
    return [
      undefined,
      { message: err.response.data?.errors?.[0]?.error || 'Encountered generic error' },
    ];
  }
};

export const UpdateAddressForm = async () => {
  const [data, error] = await getAddresses({ search: '1145' });

  // Handle error
  if (error) {
    return <div>{error.message}</div>;
  }

  // Handle success
  if (data) {
    return (
      <div>
        {data.map((address) => (
          <div key={address.address_id}>{address?.postal_code || '--'}</div>
        ))}
      </div>
    );
  }
};
