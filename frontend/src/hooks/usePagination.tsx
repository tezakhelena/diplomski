import { useMemo, useState } from "react";

export const usePagination = <T,>(data: T[] = [], itemsPerPage = 6) => {
    const [currentPage, setCurrentPage] = useState(0);

    const pageCount = Math.ceil(data.length / itemsPerPage);

    const currentData = useMemo(() => {
        const offset = currentPage * itemsPerPage;
        return data.slice(offset, offset + itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    return {
        currentPage,
        currentData,
        pageCount,
        handlePageChange,
        setCurrentPage,
    };
};