import { Col, Flex, Row } from "antd";
import { SpeciesCardSelect } from "../attributes/components/SpeciesCardSelect";
import { BusinessUsers } from "./components/BusinessUsers";
import { HomeHero } from "./components/HomeHero";
import { HomePageStatistics } from "./components/HomePageStatistics";
import { HowItWorksCard } from "./components/HowItWorksCard";
import { LastPetAds } from "./components/LastPetAds";
import { Reviews } from "./components/Reviews";
import { useHomePageStatistics } from "./hooks/useHomePage";

export const HomePageContainer = () => {
    const { statistics, isLoadingStatistics } = useHomePageStatistics();

    return (
        <Flex vertical gap={48} style={{ width: "100%", padding: "28px clamp(20px, 4vw, 46px) 40px" }}>
            <HomeHero />

            <SpeciesCardSelect />

            <Row gutter={[20, 20]} align="stretch">
                <Col xs={24} xl={8}>
                    <LastPetAds />
                </Col>

                <Col xs={24} xl={8}>
                    <HowItWorksCard />
                </Col>

                <Col xs={24} xl={8}>
                    <BusinessUsers statistics={statistics} />
                </Col>
            </Row>

            <HomePageStatistics
                statistics={statistics}
                loading={isLoadingStatistics}
            />

            <Reviews />
        </Flex>
    );
};