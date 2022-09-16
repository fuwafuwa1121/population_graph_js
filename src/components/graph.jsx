import HighchartsReact from "highcharts-react-official";
import HighCharts from "highcharts";

export const Graph = (props) => {
    // 年度を取り出して配列をつくる [1980,1985,1990...]
    let years = props.data.map((elem) => {
        return String(elem.year);
    });
    // 人口数を取り出して配列を作る [12817, 12707,12751...]
    let populations = props.data.map((elem) => {
        return elem.value;
    });
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
    console.log(years);
    HighCharts.chart({
        chart: {
            renderTo: "root",
            type: "line",
        },
        title: {
            text: "総人口推移",
        },
        xAxis: {
            title: {
                text: "年度",
            },
            categories: years,
        },
        yAxis: {
            title: {
                text: "総人口",
            },
        },
        series: [
            {
                name: "総人口推移",
                data: populations,
            },
        ],
    });

    return (
        <>
            <HighchartsReact highCharts={HighCharts} />
        </>
    );
};
