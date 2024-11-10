'use client'

import { useGetCategories } from "@/hooks/queries/categories/useGetCategories"
import { useGetColors } from "@/hooks/queries/colors/useGetColors"
import { ColorForm } from "../ColorForm"

export function CreateColor() {

    return <ColorForm />
}