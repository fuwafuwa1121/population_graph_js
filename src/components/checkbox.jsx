import { useFetchPopulations, useFetchPrefectures } from "../resas_gateway";

export const Checkbox = (props) => {
    return (
        <div>
            {props.data.map((elem) => {
                return (
                    <div key={elem.prefCode}>
                        <label htmlFor={elem.prefCode}>{elem.prefName}</label>
                        <input
                            type="checkbox"
                            name={elem.prefCode}
                            id={elem.prefCode}
                        />
                    </div>
                );
            })}
        </div>
    );
};
