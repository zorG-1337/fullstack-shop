import { Metadata } from "next";
import { Auth } from "./Auth";
import { NO_INDEX_PAGE } from "@/constants/seo.constants";

export const metadata: Metadata = {
    title: 'Авторизация',
}

export default function AuthPage() {
    return <Auth />
}