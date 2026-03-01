"use client";

import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import type { PropsWithChildren } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface ModalProps {
    modalId: string;
    openId: string;
    closeModals?: string[];
    className?: string;
}

export default function Modal({
    openId,
    modalId,
    closeModals,
    className,
    children
}: PropsWithChildren<ModalProps>) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const modalValue = searchParams.get(modalId);

    const handleOpenChange = (open: boolean) => {
        let newUrl: string | null;
        
        if (open) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: modalId,
                value: openId,
            });
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: closeModals ?? [modalId],
            });
        }

        router.push(newUrl || pathname, { scroll: false });
    }

    return (
        <Dialog open={modalValue === openId} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild hidden />
            <DialogContent
                className={cn(
                    "min-h-auto min-w-fit border-none bg-transparent p-0 shadow-none [&>button]:hidden",
                    className,
                )}
            >
                <DialogHeader className="hidden">
                    <DialogTitle className="hidden" />
                    <DialogDescription className="hidden" />
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}