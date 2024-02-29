import { createSelectorFunctions } from "auto-zustand-selectors-hook";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const authSlice = create()(
  persist(
    (set) => ({
      account: null,
      dispatchAccount: (account) => set({ account }),
      reset: () =>
        set({
          account: null,
        }),
    }),
    {
      name: "authSlice",
    }
  )
);

export const useAuthSlice = createSelectorFunctions(authSlice);

export default authSlice;
