import { create } from "zustand";

const useStore = create((set) => ({
  datas: [],
  setDatas: (values) => set((state) => ({ datas: values })),
}));

export default useStore;