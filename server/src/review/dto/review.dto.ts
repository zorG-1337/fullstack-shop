import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class ReviewDto {
    @IsString({
        message: "Текст отзыва должен быть строкой"
    })
    @IsNotEmpty({
        message: "Текст отзыва обязателен"
    })
    text: string

    @IsNumber({}, {
        message: 'Рейтинг должен быть числом'
    })
    @IsNotEmpty({message: "Рейтинг обязателен"})
    @Min(1, {
        message: 'Минимальный рейтинг - 1'
    })
    @Max(5, {
        message: "Максимальный рейтинг - 5"
    })
    rating: number
}