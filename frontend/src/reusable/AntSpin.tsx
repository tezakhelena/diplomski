import { Spin, SpinProps } from "antd";
import { PawPrintIcon } from "lucide-react";

interface Props extends SpinProps{
    loading: boolean;
    children: React.ReactNode;
}

export const AntSpin = ({loading, children, ...props}: Props) => {

    const PawLoadingIcon = () => (
        <PawPrintIcon size={30} style={{ animation: 'spin 1s linear infinite', color: '#503B31' }} />
    );

    return(
        <Spin {...props} spinning={loading} indicator={<PawLoadingIcon />} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            {children}
        </Spin>

    )
}