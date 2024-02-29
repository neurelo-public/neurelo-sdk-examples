export function AccountAvatar({ account }) {
  const userFullName = account.name;
  const userFirstName = userFullName?.split(" ")?.[0];
  const userLastName = userFullName?.split(" ")?.[1];

  // FL : First Letter
  const userFirstNameFL = userFirstName?.slice(0, 1)?.toUpperCase();
  const userLastNameFL = userLastName?.slice(0, 1)?.toUpperCase();

  return (
    <div
      className="rounded-md bg-zinc-900 hover:bg-zinc-800 group py-1.5 px-2
      flex flex-nowrap gap-2 items-center cursor-default border border-zinc-700"
    >
      <div>
        <p className="w-full text-sm font-light text-zinc-400 group-hover:text-zinc-100 text-ellipsis overflow-hidden max-w-32">
          {account.email}
        </p>
      </div>

      <div className="w-8 h-8 bg-gradient-to-br from-sky-900 via-yellow-800/60 to-yellow-900 rounded-full flex items-center justify-center">
        <div className="flex gap-x-0.5 text-xs font-medium text-zinc-50 items-center justify-center leading-none select-none cursor-default">
          <span>{userFirstNameFL}</span>
          <span>{userLastNameFL}</span>
        </div>
      </div>
    </div>
  );
}
