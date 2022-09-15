import { useFetchPopulations, useFetchPrefectures } from "../resas_gateway";
import { Checkbox } from "./checkbox";

export const App = () => {
    let prefectures = useExtractPrefectures();
    console.log(prefectures);

    return (
        <>
            <Checkbox data={prefectures} />
        </>
    );
};

const useExtractPrefectures = () => {
    let prefecturesResponce = useFetchPrefectures();
    // 配列に変換 + 次数を下げる
    let responceArray = Object.entries(prefecturesResponce).flat(1);

    // 配列を抜き出す + 次数下げ [{prefCode: 1, prefName: "北海道"}...]
    let prefectures = responceArray
        .filter((elem) => {
            return Object.prototype.toString.call(elem) === "[object Array]";
        })
        .flat(1);

    // {prefCodes: [1,2,3...], prefNames: ["北海道", "青森県", "岩手県"...]}に変形
    // let prefCodes: number[] = responceArray.map((elem) => {
    //     return Object.values(elem)[0];
    // });
    // let prefNames: string[] = responceArray.map((elem) => {
    //     return Object.values(elem)[1];
    // });

    // let prefectures: Prefectures = {
    //     prefCodes: prefCodes,
    //     prefNames: prefNames,
    // };

    return prefectures;
};

const useExtractPopulations = () => {
    let PopulationsResponce = useFetchPopulations();
    let responceArray = Object.entries(PopulationsResponce).flat(1);
    console.log(responceArray);
};
