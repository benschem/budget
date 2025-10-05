import useLocalStorage from "./useLocalStorage";
import type { BankBalance } from "../types";

export default function useBankBalance() {
  const [bankBalance, setBankBalance] = useLocalStorage<BankBalance>("bankBalance", { amount: 0 });


  return { bankBalance, setBankBalance };
}
