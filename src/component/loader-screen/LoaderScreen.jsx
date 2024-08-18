import { SafeAreaView } from "react-native";
import Preloader from "../preloader/Preloader";
import PropTypes from "prop-types";

const LoaderScreen = ({ style, loader, children }) => {
    return (
        <SafeAreaView style={style}>
            {loader ? <Preloader /> : children}
        </SafeAreaView>
    );
};

LoaderScreen.propTypes = {
    loader: PropTypes.bool.isRequired,
    style: PropTypes.object,
    children: PropTypes.array.isRequired || PropTypes.element.isRequired,
};

export default LoaderScreen;
