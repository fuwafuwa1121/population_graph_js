import { PrefCheckBox } from "./style";

// 都道府県一覧のチェックボックス
export const Checkbox = (props) => {
    return (
        <>
            {props.data.map((elem) => {
                return (
                    <div key={elem.prefCode}>
                        <label htmlFor={elem.prefCode}>{elem.prefName}</label>
                        <PrefCheckBox
                            type="checkbox"
                            name={elem.prefCode}
                            id={elem.prefCode}
                            onChange={(event) => {
                                props.refetch(
                                    elem.prefCode,
                                    elem.prefName,
                                    event.target.checked
                                );
                            }}
                        />
                    </div>
                );
            })}
        </>
    );
};
