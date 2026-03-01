"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Modal from "./modal";

export default function useModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const close = (modalIds: string[]) => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: modalIds,
    });

    router.push(newUrl || pathname, { scroll: false });
  };

  const open = (modals: { modalId: string; openId: string }[]) => {
    let currentParams = searchParams.toString();

    modals.forEach(({ modalId, openId }) => {
      const updatedUrl = formUrlQuery({
        params: currentParams,
        key: modalId,
        value: openId,
      });
      currentParams = updatedUrl.split("?")[1] || "";
    });

    router.push(`${pathname}?${currentParams}`, { scroll: false });
  };

  return { close, open, Modal };
}