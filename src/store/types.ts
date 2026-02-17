import type { ReactElement } from "react";
import { Icons } from "../components/Icon/Icons";

export const MAX_QUESTION = 20;

export interface UserInfo {
    name: string
    lastestLoggin: string
}

export interface Question {
    id: string | number
    createdDate: string
    calculateTask: string
    difficutlt: "novice" | 'pro' | "elite"
    timer: number
    point: number
    answer: number
    result: boolean
}

export type MathOperation = "+" | "-" | "*" | "/";

export interface LevelItem {
    id: number;
    name: "Novice" | 'Pro' | "Elite";
    example: string;
    operation: MathOperation[];
    point: number;
    range: [number, number];
    bgColor: string
    icon: ReactElement
}

export const NoviceLevel: LevelItem = {
    id: 1,
    name: "Novice",
    example: "12 + 45",
    operation: ["+", "-"],
    point: 5,
    range: [1, 1000],
    bgColor: "#22C55E",
    icon: Icons.cup
};

export const ProLevel = {
    id: 2,
    name: "Pro" as const,
    example: "12 x 8",
    operation: ["*", "/"] as MathOperation[],
    point: 10,
    range: [1, 1000],
    bgColor: "#3B82F6",
    icon: Icons.thunder
} satisfies LevelItem; 

export const EliteLevel: LevelItem = {
    id: 3,
    name: "Elite",
    example: "(15 × 4) - 12",
    operation: ["+", "-", "*", "/"],
    point: 20,
    range: [1, 1000],
    bgColor: "#A855F7",
    icon: Icons.diamond
};

export const LevelList: LevelItem[] = [NoviceLevel, ProLevel, EliteLevel];