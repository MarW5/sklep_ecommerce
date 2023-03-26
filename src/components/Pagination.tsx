interface TypePagination {
    itemsCount: number;
    currentPage: number;
    pageSize: number;
}

export const Pagination = ({ itemsCount, currentPage, pageSize }: TypePagination) => {
    const pagesCount = Math.ceil(itemsCount / pageSize)
    if (pagesCount === 1) return null;
    
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    return (
        <div className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
            <ul className="hidden md:-mt-px md:flex">
                {pages.map((page) => (
                    <li
                        key={page}
                        className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                    >
                        <a className={page === currentPage ? "bg-green-300" : "bg-white"} href={`/items/page/${page}`}>
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}