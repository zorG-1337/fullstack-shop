'use client'

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/auth/product.service";
import { useGetCategories } from "@/hooks/queries/categories/useGetCategories";
import { useGetColors } from "@/hooks/queries/colors/useGetColors";
import { colorService } from "@/services/color.service";
import { ColorForm } from "../ColorForm";

export function ColorEdit() {

    const params = useParams<{colorId: string}>()

    const { data } = useQuery({
        queryKey: ['get color'],
        queryFn: () => colorService.getById(params.colorId)
    })

    console.log(data)

    return (
        <ColorForm color={data}/>
    )
}