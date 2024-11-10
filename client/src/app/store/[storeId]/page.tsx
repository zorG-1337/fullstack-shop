import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import { Store } from "./Store";
import { useParams } from "next/navigation";

export const metadata: Metadata = {
    title: 'Управление магазином',
    ...NO_INDEX_PAGE
}

export default function StorePage() {


    return <>
        <Store />
    </>
}