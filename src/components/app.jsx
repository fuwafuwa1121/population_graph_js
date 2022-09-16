import { useState, useEffect } from "react";
import axios from "axios";
import { apiKey } from "../api_key";
import { Checkbox } from "./checkbox";
import { Graph } from "./graph";
import { CheckboxWrapper, GraphWrapper, Title } from "./style";

export const App = () => {
    const [prefectures, setPrefectures] = useState([]);
    let config = {
        headers: {
            "X-API-KEY": "8zcmxWVVsrCbvLmCUwL65PIYWdmDzxeGzMSrVj0d",
        },
    };

    // 都道府県一覧を取得
    useEffect(() => {
        axios
            .get(
                "https://opendata.resas-portal.go.jp/api/v1/prefectures",
                config
            )
            .then((responce) => {
                setPrefectures(responce.data);
            });
    }, []);

    const [populations, setPopulations] = useState([]);
    // 人口一覧を取得
    useEffect(() => {
        axios
            .get(
                "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=1",
                config
            )
            .then((responce) => {
                setPopulations(responce.data);
            });
    }, []);

    // [{prefCode: 1, prefName: "北海道"}...] を取り出す
    let prefecturesArr;
    if (prefectures.length === 0) {
        prefecturesArr = [];
    } else {
        prefecturesArr = Object.entries(prefectures).flat(1).pop();
    }

    let populationsArr;
    if (populations.length === 0) {
        populationsArr = [];
    } else {
        // [{year: 1980, value: 12817}...] を取り出す
        let tmp = Object.entries(populations).flat(1).pop().data;
        tmp = tmp.find((elem) => {
            return elem.label === "総人口";
        }).data;
        populationsArr = [
            {
                prefName: "北海道",
                data: tmp,
            },
        ];
    }
    console.log(populationsArr);

    // 人口のデータを更新する
    const [multiPopulations, setMultiPopulations] = useState([]);
    const refetchOnChange = () => {
        let checkedBoxes = updateCheckBoxesCondition();
        let multiPopulations = [];

        // チェックの入っている県のデータを順に取得
        const refetch = () => {
            checkedBoxes.forEach((elem) => {
                let prefName = elem.prefName;
                axios
                    .get(
                        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${elem.prefCode}`,
                        config
                    )
                    .then((responce) => {
                        // ["北海道": {...},"青森県": {...}] の形に変形
                        multiPopulations.push({
                            [prefName]: responce.data,
                        });
                        callSetState(multiPopulations);
                    });
            });
        };

        // setStateを呼び出す
        const callSetState = (multiPopu) => {
            let multiPopulationsArr = formatMultiPopulations(multiPopu);
            setMultiPopulations(multiPopulationsArr);
            console.log(multiPopulations);
        };
        refetch();
    };

    // multiPopulationsの整形
    const formatMultiPopulations = (multiPopulations) => {
        let multiPopulationsArr = [];
        multiPopulations.flatMap((elem) => {
            let prefName = Object.keys(elem)[0];
            let data = Object.values(elem)
                .map((elem) => {
                    return elem.result.data;
                })
                .flat(1);
            let populations = data.find((elem) => {
                return elem.label === "総人口";
            }).data;
            multiPopulationsArr.push({
                [prefName]: populations,
            });
        });
        return multiPopulationsArr;
    };
    // すべてのチェックボックスについて、チェックされているか確認する
    const updateCheckBoxesCondition = () => {
        let inputElements = document.getElementsByTagName("input");
        inputElements = [...inputElements];
        let checkedBoxes = [];

        inputElements.forEach((elem) => {
            if (elem.checked === true) {
                checkedBoxes.push({
                    prefCode: elem.id,
                    prefName: elem.name,
                });
            }
        });
        return checkedBoxes;
    };

    return (
        <main>
            <Title>都道府県別総人口推移</Title>
            <CheckboxWrapper>
                {prefecturesArr.length !== 0 && (
                    <Checkbox
                        data={prefecturesArr}
                        key="checkbox"
                        refetch={refetchOnChange}
                    />
                )}
            </CheckboxWrapper>
            <GraphWrapper id="graph_container">
                {populationsArr.length !== 0 && (
                    <Graph
                        data={populationsArr}
                        key="highchats"
                        multiData={multiPopulations}
                    />
                )}
            </GraphWrapper>
        </main>
    );
};
