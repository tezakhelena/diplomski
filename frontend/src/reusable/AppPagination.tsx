import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Space } from "antd";
import ReactPaginate from "react-paginate";

interface Props {
    pageCount: number;
    currentPage: number;
    onPageChange: ({ selected }: { selected: number }) => void;
}

export const AppPagination = ({ pageCount, currentPage, onPageChange }: Props) => {
    if (pageCount <= 1) return null;

    return (
        <ReactPaginate
            pageCount={pageCount}
            onPageChange={onPageChange}
            forcePage={currentPage}
            containerClassName="app-pagination"
            pageClassName="app-pagination-page"
            pageLinkClassName="app-pagination-link"
            activeClassName="app-pagination-active"
            previousClassName="app-pagination-previous"
            nextClassName="app-pagination-next"
            breakClassName="app-pagination-break"
            breakLinkClassName="app-pagination-break-link"
            disabledClassName="app-pagination-disabled"
            previousLabel={
                <Space>
                    <LeftOutlined />
                    Prethodna
                </Space>
            }
            nextLabel={
                <Space>
                    Sljedeća
                    <RightOutlined />
                </Space>
            }
        />
    );
};