import { Button } from '@/components/ui/button';
import { BookOpenIcon, ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-1 h-full flex-col items-center justify-between p-24">
      <div className="mb-32 text-center w-full">
        <div className="text-4xl font-medium flex flex-col items-center gap-0">
          <div
            className="
              flex flex-col items-center
              bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-800 text-transparent bg-clip-text
            ">
            <Image
              src="/neurelo.png"
              alt="Neurelo"
              width={170}
              height={100}
              priority
            />
          </div>
          <span className="mt-2 text-zinc-50">+</span>
          <div
            className="
              flex flex-col items-center
              bg-gradient-to-br from-yellow-500 via-yellow-400 to-yellow-800 text-transparent bg-clip-text
            ">
            <Image
              src="/mongodb.svg"
              alt="MongoDB"
              width={150}
              height={100}
              priority
            />
          </div>
          <span className="mb-6 text-zinc-50">+</span>
          <div
            className="
              flex flex-col gap-y-3 items-center
              bg-gradient-to-br from-zinc-950 via-zinc-300 to-zinc-800 text-transparent bg-clip-text
            ">
            <Image
              src="/next.svg"
              alt="Next.js"
              width={140}
              height={100}
              priority
              className="invert opacity-75"
            />
          </div>
          <p className="mt-10 text-zinc-400 text-lg font-normal max-w-xl leading-normal">
            Nextjs application using a MongoDB database through Neurelo APIs. Built using
            Neurelo&apos;s schema-aware auto-generated TypeScript SDK.
          </p>
        </div>

        <div className="w-full flex gap-3 items-center justify-center my-4">
          <Link
            href="https://www.neurelo.com/"
            className="text-amber-500 font-semibold hover:underline focus-visible:underline decoration-amber-500 mx-1.5"
            tabIndex={0}
            target="_blank">
            <span className="pointer-events-none rounded-full border border-amber-400/50 text-sm w-auto py-0.5 px-2">
              Neurelo Website
            </span>
          </Link>

          <Link
            href="https://docs.neurelo.com/"
            className="text-sky-500 font-semibold hover:underline focus-visible:underline decoration-sky-500 mx-1.5"
            tabIndex={0}
            target="_blank">
            <span className="pointer-events-none rounded-full border border-sky-400/50 text-sm w-auto py-0.5 px-2">
              Neurelo Docs
              <BookOpenIcon className="w-4 h-4 ml-1 inline-block" />
            </span>
          </Link>
        </div>

        <div className="w-full mt-10 flex flex-row items-center justify-center">
          <Link
            href="/list-films"
            tabIndex={-1}>
            <Button
              className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950
              hover:from-yellow-900 hover:via-yellow-800 hover:to-yellow-950 border border-zinc-500">
              Explore App
              <ChevronRightIcon className="w-5 h-5 inline-block ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
