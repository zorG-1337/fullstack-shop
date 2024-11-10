export const getReviewWordWithEnding = (reviewCount: number) => {
    switch (reviewCount) {
        case 1:
        case 21:
        case 31:
            return `${reviewCount} отзыв`;
        
        case 2:
        case 3:
        case 4:
        case 22:
        case 23:
        case 24:
        case 32:
        case 33:
        case 34:
            return `${reviewCount} отзыва`;
        
        default:
            return `${reviewCount} отзывов`;
    }
};