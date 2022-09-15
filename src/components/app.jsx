import { useState, useEffect } from "react";
import axios from "axios";
import { apiKey } from "../api_key";
import { Checkbox } from "./checkbox";
import { Graph } from "./graph";

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
                "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=11362&prefCode=11",
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
        populationsArr = tmp.find((elem) => {
            return elem.label === "総人口";
        }).data;
        console.log(populationsArr);
    }

    return (
        <div>
            {prefecturesArr.length === 0 ? (
                <div></div>
            ) : (
                <Checkbox data={prefecturesArr} />
            )}
            {populationsArr.length === 0 ? (
                <div></div>
            ) : (
                <Graph data={populationsArr} />
            )}
        </div>
    );
};
