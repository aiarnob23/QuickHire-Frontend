import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { UrlQueryParams } from "./types/UrlQueryParams";
import qs from "query-string"
import { RemoveUrlQueryParams } from "./types/RemoveUrlQueryParams";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatJobType(type: string) {
  return type
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}


//form url query
export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
}

//remove keys from query
export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  },
    { skipNull: true }
  )
}
