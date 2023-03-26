interface RatingType {
    rating: number
}

export const Rating =({rating}: RatingType)=>{
    return (
            <>
                <div className="text-lg font-medium text-gray-900">{rating}</div>
            </>
    )
}