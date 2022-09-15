import HighchartsReact from "highcharts-react-official";
import HighCharts from "highcharts";

export const Graph = (props) => {
    // [{year: 1980, value: 12817}...]
    let totalPopulation = props.data.data.find((elem) => {
        return elem.label === "総人口";
    }).data;
    // 年度を取り出して配列をつくる [1980,1985,1990...]
    let categories = totalPopulation.map((elem) => {
        return elem.year;
    });
    // 人口数を取り出して配列を作る [12817, 12707,12751...]
    let series = totalPopulation.map((elem) => {
        return elem.value;
    });
    console.log(categories);
    categories = HighCharts.chart(categories);
    // グラフの設定
    // const options = {
    //     title: {
    //         text: "総人口推移",
    //     },
    //     xAxis: {
    //         title: {
    //             text: "年度",
    //         },
    //         categories: categories,
    //     },
    //     yAxis: {
    //         title: {
    //             text: "人口数",
    //         },
    //     },
    //     series: series,
    // };
    HighCharts.setOptions({
        chart: {
            renderTo: "container",
            type: "line",
        },
        title: {
            text: "総人口推移",
        },
    });

    return (
        <>
            <HighchartsReact highCharts={HighCharts} />
        </>
    );
};
