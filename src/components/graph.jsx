import HighchartsReact from "highcharts-react-official";
import HighCharts from "highcharts";

export const Graph = (props) => {
    // prefNameを取り出す
    let prefName = "";
    props.data.forEach((elem) => {
        prefName = elem.prefName;
    });
    // 年度を取り出して配列をつくる [1980,1985,1990...]
    let years = props.data.flatMap((elem) => {
        return elem.data;
    });
    years = years.map((elem) => {
        return elem.year;
    });

    // 人口数を取り出して配列を作る [12817, 12707,12751...]
    let data = props.data.flatMap((elem) => {
        return elem.data;
    });
    data = data.map((elem) => {
        return elem.value;
    });

    // [{prefName: "北海道", data: [...]}...] の形へ変形
    let series = [];
    series[0] = {
        name: prefName,
        data: data,
    };

    let multiPopulations;
    if (props.multiData.length !== 0) {
        multiPopulations = props.multiData.map((elem) => {
            let prefName = Object.keys(elem)[0];
            let values = Object.values(elem).flat(1);
            values = values.map((elem) => {
                return elem.value;
            });
            return {
                name: prefName,
                data: values,
            };
        });
        series = multiPopulations;
    }

    HighCharts.chart({
        chart: {
            renderTo: "graph_container",
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
        series: series,
    });

    return <HighchartsReact highCharts={HighCharts} />;
};
