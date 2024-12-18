import { ClassValue, clsx } from "clsx";
import { Dimensions } from "react-native";
import { twMerge } from "tailwind-merge";

function cn(...args: ClassValue[]) {
    return twMerge(clsx(args));
}

const screenHeight = Dimensions.get("screen").height;
const windowHeight = Dimensions.get("window").height;

export { cn, screenHeight, windowHeight }