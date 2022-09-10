import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import apiKey from "./apiKey";

class Population extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: Array(47).fill(false),
            prefectures: {},
        };
    }

    componentDidMount() {
        fetch(
            "https://opendata.resas-portal.go.jp/api/v1/population/sum/perYear?cityCode=11362&prefCode=11",
            {
                headers: { "X-API-KEY": apiKey() },
            }
        )
            .then((responce) => responce.json())
            .then((res) => {
                this.setState({ prefectures: res.result });
            });
    }

    render() {
        let { selected, prefectures } = this.state;
        console.log(prefectures);
        return (
            <>
                <p>成功</p>
            </>
        );
    }
}

export default Population;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Population />);
