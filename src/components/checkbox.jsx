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
                            name={elem.prefName}
                            id={elem.prefCode}
                            onChange={() => {
                                props.refetch();
                            }}
                        />
                    </div>
                );
            })}
        </>
    );
};
