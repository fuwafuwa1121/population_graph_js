import { useState, useEffect } from "react";
import axios from "axios";
import { apiKey } from "./api_key";

// 都道府県一覧を取得
export const useFetchPrefectures = () => {
    const [prefectures, setPrefectures] = useState([]);

    useEffect(() => {
        axios
            .get(
                "https://opendata.resas-portal.go.jp/api/v1/prefectures",
                config()
            )
            .then((responce) => {
                setPrefectures(responce.data);
            });
    }, []);

    // useEffect(() => {
    //     const fetchData = () => {
    //         axios
    //             .get(
    //                 "https://opendata.resas-portal.go.jp/api/v1/prefectures",
    //                 config()
    //             )
    //             .then((responce) => {
    //                 setPrefectures(responce.data);
    //                 console.log("hi");
    //             });
    //     };
    //     fetchData();
    // }, []);
};

// 人口一覧を取得
export const useFetchPopulations = () => {
    const [populations, setPopulations] = useState([]);

    useEffect(() => {
        axios
            .get(
                "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=11362&prefCode=11",
                config()
            )
            .then((responce) => {
                setPopulations(responce.data);
            });
    }, []);

    return populations;
};

const config = () => {
    return {
        headers: {
            "X-API-KEY": apiKey(),
        },
    };
};
