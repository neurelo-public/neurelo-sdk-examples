export const Page = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full h-full container mx-auto grid grid-cols-1 px-2 md:px-4 lg:px-8 py-5 md:pb-12 gap-y-4 place-content-start">
    {children}
  </div>
);
