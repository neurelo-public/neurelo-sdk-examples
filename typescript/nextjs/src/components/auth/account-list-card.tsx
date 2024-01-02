import { formatDate, formatTimeShort } from '@/lib';
import { Auth } from 'neurelo-sdk';
import Link from 'next/link';

export const AccountListCard = ({ account }: { account: Auth }) => {
  return (
    <Link
      key={account.user_id}
      href={`/list-accounts/${account.user_id}`}
      className="flex items-stretch justify-stretch rounded-lg bg-zinc-900 text-zinc-200
        ring-1 ring-zinc-800 hover:bg-zinc-800 hover:ring-zinc-700
        focus-visible:outline-none focus-visible:ring-zinc-600 group">
      <div className="p-4">
        <h2 className="text-2xl font-medium w-full text-ellipsis text-zinc-300">
          {account.name || 'No name'}
        </h2>

        <div className="text-base font-normal mt-1 line-clamp-3 text-zinc-300">
          {account.email || 'Email not provided'}
        </div>

        <div className="flex flex-col items-stretch gap-2 text-sm leading-none mt-3">
          <p className="text-zinc-500 gap-2 flex items-center">
            Created at :
            <span className="text-sky-600">
              {account.created_at ? formatDate(account.created_at) : '--- --, ----'}
            </span>
            <span className="transition-all duration-600 ease-in-out text-transparent group-hover:text-sky-800">
              {account.created_at ? formatTimeShort(account.created_at) : '--'}
            </span>
          </p>
          <p className="text-zinc-500 gap-2 flex items-center">
            Updated at :
            <span className="text-sky-600">
              {account.updated_at ? formatDate(account.updated_at) : '--- --, ----'}
            </span>
            <span className="transition-all duration-600 ease-in-out text-transparent group-hover:text-sky-800">
              {account.updated_at ? formatTimeShort(account.updated_at) : '--'}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};
