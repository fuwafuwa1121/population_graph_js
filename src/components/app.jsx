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

    useEffect(() => {
        axios
            .get(
                "https://opendata.resas-portal.go.jp/api/v1/prefectures",
                config
            )
            .then((responce) => {
                setPrefectures(responce.data);
                console.log(responce.data);
            });
    }, []);

    // [{prefCode: 1, prefName: "北海道"}...] を取り出す
    let prefArray = Object.entries(prefectures).flat(1).pop();

    return (
        <div>
            {!prefArray ? <div></div> : <Checkbox data={prefArray} />}
            {/* <Checkbox data={prefectures} /> */}
            {/* <Graph data={populations} /> */}
        </div>
    );
};

// 必要なデータの取り出し
// 次数を下げる + 最後の要素を取る
const useExtractData = (prefRes) => {
    return Object.entries(prefRes).flat(1).pop();
}; //
