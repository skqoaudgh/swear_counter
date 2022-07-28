import IconButton from '../IconButton';

import { ReactComponent as ChartIcon } from '../../../public/chart.svg';
import { ReactComponent as HomeIcon } from '../../../public/home.svg';

import PAGE from '../../constants/page';

import styles from './Header.module.css';

const Header = ({ page, setPage }) => {
    const onClickHomePage = () => {
        setPage(PAGE.HOME);
    };

    const onClickChartPage = () => {
        setPage(PAGE.CHART);
    };

    return (
        <div className={styles.Header}>
            <IconButton onClick={onClickChartPage} active={page === PAGE.CHART}>
                <ChartIcon />
            </IconButton>
            <IconButton onClick={onClickHomePage} active={page === PAGE.HOME}>
                <HomeIcon />
            </IconButton>
        </div>
    );
};

export default Header;