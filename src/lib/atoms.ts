import { Snack } from "@/types";
import { atom } from "jotai";
import { KeyedMutator } from "swr";

export const entryAtom = atom<string>("");

export const snackMutateAtom = atom<KeyedMutator<Snack[]> | null>(null);
