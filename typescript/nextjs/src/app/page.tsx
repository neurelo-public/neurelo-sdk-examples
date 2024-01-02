import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-1 h-full flex-col items-center justify-between p-24">
      <div className="mb-32 text-center w-full">
        <div className="text-4xl font-medium flex flex-col items-center">
          <div
            className="
              flex flex-col gap-y-2 items-center
              bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-800 text-transparent bg-clip-text
            "
          >
            <Image
              src="/neurelo.png"
              alt="Neurelo"
              width={200}
              height={200}
              priority
            />
            <span className="rounded-full border border-yellow-400/20 text-sm w-auto py-0.5 px-2">
              PostgreSql
            </span>
          </div>
          <span className="my-2">+</span>
          <div
            className="
              flex flex-col gap-y-3 items-center
              bg-gradient-to-br from-zinc-950 via-zinc-300 to-zinc-800 text-transparent bg-clip-text
            "
          >
            <Image
              src="/next.svg"
              alt="Next.js"
              width={170}
              height={100}
              priority
              className="invert opacity-75"
            />
            <span className="rounded-full border border-zinc-700 text-sm w-auto py-0.5 px-2">
              Version 14
            </span>
          </div>
          <p className="mt-5 text-zinc-400 text-lg font-normal max-w-xl leading-normal">
            Nextjs application using PostgreSql database indirectly through neurelo apis. Using
            neurelo generated typescript SDK. Checkout
            <Link
              href="https://neurelo.com/"
              className="text-amber-500 font-semibold focus:underline decoration-sky-500 mx-1.5"
              tabIndex={0}
              target="_blank"
            >
              Neurelo
            </Link>
            for more details.
          </p>
        </div>

        <div className="w-full mt-10 flex flex-row items-center justify-center">
          <Link
            href="/list-films"
            tabIndex={-1}
          >
            <Button
              className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950
              hover:from-yellow-900 hover:via-yellow-800 hover:to-yellow-950"
            >
              Explore App
              <ChevronRightIcon className="w-5 h-5 inline-block ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
