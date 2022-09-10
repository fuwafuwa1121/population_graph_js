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
        fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
            headers: { "X-API-KEY": apiKey() },
        })
            .then((responce) => responce.json())
            .then((res) => {
                this.setState({ prefectures: res.result });
            });
    }

    render() {
        let { selected, prefectures } = this.state;
        console.log(prefectures);
        return <></>;
    }
}

export default Population;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Population />);
