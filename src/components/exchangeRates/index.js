import React from 'react';
import {LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line} from "recharts";

import {getCourseQuantityDays} from "../../api/exchangeCourse";

import "./style.scss";

const QUANTITY_DAYS = 30;

export class ExchangeRates extends React.PureComponent {
    state = {
        course: [],
    };

    componentDidMount() {
        const get = getCourseQuantityDays(QUANTITY_DAYS);

        for (let i = 0; i <= (QUANTITY_DAYS + 1); i++) {
            setTimeout(() => {
                get()
                    .then(result => {
                        const {status, data} = result;

                        if (status === 200) {
                            this.buildForGraph(data);
                        }
                    })
            }, `${i}000`);
        }
    };

    buildForGraph = (data) => {
        const course = [...this.state.course];
        const {date, rates, base} = data;
        const currency = {};

        for (let key in rates) {
            currency[key] = (1 / Number(rates[key])).toFixed(2);
        }

        course.push({
            base,
            date,
            ...currency,
        });

        this.setState({
            course,
        });
    };

    render() {
        const {course} = this.state;

        return (
            <div className="courses">
                <LineChart
                    width={730} height={250} data={course}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="EUR" stroke="#8884d8" />
                    <Line type="monotone" dataKey="USD" stroke="#82ca9d" />
                </LineChart>

                <table className="courses__table">
                    <thead>
                    <tr>
                        <td>Дата</td>
                        <td>Курс USD</td>
                        <td>Курс EUR</td>
                        <td>Относительно</td>
                    </tr>
                    </thead>

                    <tbody>
                    {course.map(date => (
                        <tr>
                            <td>{date.date}</td>
                            <td>{date.USD}</td>
                            <td>{date.EUR}</td>
                            <td>{date.base}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    };
}