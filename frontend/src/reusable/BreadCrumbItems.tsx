import { HomeOutlined, LeftOutlined } from "@ant-design/icons";
import { Breadcrumb, Space } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { protectedRoutes } from "../routes/protectedRoutes";
import { findCurrentRoute } from "../utils/helperFunctions";
import { publicRoutes } from "../routes/publicRoutes";

export const BreadCrumbItems = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const allRoutes = [
        ...publicRoutes,
        ...protectedRoutes,
    ];

    const generatedBreadcrumbs = () => {
        const pathSnippets = location.pathname.split("/").filter((i) => i);
        const breadCrumb = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
            const route = findCurrentRoute(allRoutes, url);
            const isLast = index === pathSnippets.length - 1;
            return {
                breadcrumbItem: (
                    <Breadcrumb.Item key={url}>
                        <Link
                            to={url}
                            style={{
                                color: isLast ? "#503b31e1" : "inherit",
                                fontWeight: isLast ? "bold" : "normal",
                            }}>{
                                route?.breadcrumb || "Unknown"}
                        </Link>
                    </Breadcrumb.Item>
                ),
                breadcrumbText: route?.breadcrumb || "Unknown",
            };
        });

        return [
            {
                breadcrumbItem: (
                    <Breadcrumb.Item key="/">
                        <Link to="/">
                            <Space>
                                <HomeOutlined /> Naslovnica
                            </Space>
                        </Link>
                    </Breadcrumb.Item>
                ),
                breadcrumbText: "Naslovnica",
            },
            ...breadCrumb,
        ];
    };

    const breadcrumbs = generatedBreadcrumbs();

    return (
        <Space align="center" style={{ padding: '20px' }}>
            <LeftOutlined
                onClick={() => navigate(-1)}
                style={{ padding: 0 }}
            />
            <Breadcrumb>{breadcrumbs.map((b) => b.breadcrumbItem)}</Breadcrumb>
        </Space>
    );
}