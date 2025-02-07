import { atomWithStorage } from "jotai/utils";

export const loggedUserAtom = atomWithStorage("loggedUser", {});

export const cartAtom = atomWithStorage("cart", []);
