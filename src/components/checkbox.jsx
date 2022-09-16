// 都道府県一覧のチェックボックス
export const Checkbox = (props) => {
    return (
        <>
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
        </>
    );
};
