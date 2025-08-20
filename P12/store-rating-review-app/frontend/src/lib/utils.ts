// lib/utils.ts

type ClassValue = string | number | null | boolean | undefined | ClassDictionary | ClassArray;
interface ClassDictionary {
  [id: string]: any;
}
interface ClassArray extends Array<ClassValue> {}

function clsx(...inputs: ClassValue[]): string {
  return inputs
    .reduce<ClassValue[]>((arr, input) => {
      if (Array.isArray(input)) {
        arr.push(...input);
      } else {
        arr.push(input);
      }
      return arr;
    }, [])
    .filter(Boolean)
    .map((input) => {
      if (typeof input === "string" || typeof input === "number") {
        return input;
      }
      if (Array.isArray(input)) {
        return clsx(...input);
      }
      if (typeof input === "object" && input !== null) {
        return Object.keys(input)
          .filter((key) => input[key])
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}

// Simple tailwind-merge alternative: just returns the string as is
function twMerge(classNames: string): string {
  return classNames;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
