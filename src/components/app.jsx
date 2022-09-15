import { useFetchPopulations, useFetchPrefectures } from "../resas_gateway";
import { Checkbox } from "./checkbox";
import { Graph } from "./graph";

export const App = () => {
    let prefecturesResponce = useFetchPrefectures();
    let prefectures = useExtractData(prefecturesResponce);

    let populationsResponce = useFetchPopulations();
    let populations = useExtractData(populationsResponce);
    return (
        <div>
            <Checkbox data={prefectures} />
            {/* <Graph data={populations} /> */}
        </div>
    );
};

const useExtractData = (prefRes) => {
    return Object.entries(prefRes).flat(1).pop();
};
