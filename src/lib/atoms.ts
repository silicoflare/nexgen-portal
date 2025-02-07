import { Snack } from "@/types";
import { atom } from "jotai";
import { KeyedMutator } from "swr";

export const entryAtom = atom<number>(0);

export const snackMutateAtom = atom<KeyedMutator<Snack[]> | null>(null);
