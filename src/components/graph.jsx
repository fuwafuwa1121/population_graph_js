import HighchartsReact from "highcharts-react-official";
import HighCharts from "highcharts";

export const Graph = (props) => {
    // 年度を取り出して配列をつくる [1980,1985,1990...]
    let categories = props.data.map((elem) => {
        return elem.year;
    });
    // 人口数を取り出して配列を作る [12817, 12707,12751...]
    let series = props.data.map((elem) => {
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
