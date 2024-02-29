import { createSelectorFunctions } from "auto-zustand-selectors-hook";
import { create } from "zustand";
import authSlice from "./slice/auth-slice";

const store = create((set) => ({
  authSlice: authSlice.getState(),
  dispatchAuthSlice: (state) => set({ authSlice: state }),
}));

export const useStore = createSelectorFunctions(store);

export default store;
