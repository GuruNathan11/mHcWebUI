/**
 * 功能：week period-week
 * 作者：宋鑫鑫
 *  day  period：2019.11.04
 */
import React, { PureComponent } from "react";
import { Radio, InputNumber, Row, Col, Select, List, Checkbox, message } from "antd";
const { Group } = Radio;
export default class Week extends PureComponent {
    weekOptions = [
        {
            label: "Week一",
            value: 1
        },
        {
            label: "Week二",
            value: 2
        },
        {
            label: "Week三",
            value: 3
        },
        {
            label: "Week四",
            value: 4
        },
        {
            label: "Week五",
            value: 5
        },
        {
            label: "Week六",
            value: 6
        },
        {
            label: "Week day ",
            value: 7
        }
    ];

    getWeekOptions() {
        return this.weekOptions.map((item, index) => {
            return (
                <Select.Option value={item.value} key={`${item.label}-${index}`}>
                    {item.label}
                </Select.Option>
            );
        });
    }

    changeParams(type, value) {
        const state = { ...this.props.week };
        state[type] = value;
        if (type === 'start') {
            if (state.end - state.start <= 1) {
                state.end = value + 1;
            }
        }
        if (type === 'end') {
            if (state.end - state.start <= 1) {
                state.start = value - 1;
            }
        }
        this.props.onChange(state);
    }

    render() {
        const {
            week: { type, start, end, some, begin, beginEvery, last }
        } = this.props;
        return (
            <div>
                <Group
                    value={type}
                    onChange={e => {
                        const state = { ...this.props.week };
                        // if (e.target.value === "some") {
                        //     state.some = ["1"];
                        // }
                        state.type = e.target.value;
                        this.props.onChange(state);
                    }}
                >
                    <List size="small" bordered>
                        <List.Item>
                            <Radio value="*"> Every week</Radio>
                        </List.Item>
                        <List.Item>
                            <Radio value="?">Not specify</Radio>
                        </List.Item>
                        <List.Item style={{ marginBottom: 5 }}>
                            <Radio value="period">week period</Radio> From {" "}
                            <Select
                                style={{ width: 80 }}
                                defaultValue={1}
                                placeholder="week"
                                size="small"
                                value={start}
                                onChange={value => {
                                    this.changeParams("start", value);
                                }}
                                disabled={type !== "period"}
                            >
                                {this.getWeekOptions().slice(0, 6)}
                            </Select>{" "}
                             To{" "}
                            <Select
                                style={{ width: 80 }}
                                defaultValue={2}
                                placeholder="week"
                                value={end}
                                size="small"
                                onChange={value => {
                                    this.changeParams("end", value);
                                }}
                                disabled={type !== "period"}
                            >
                                {this.getWeekOptions().slice(1, 7)}
                            </Select>
                        </List.Item>
                        <List.Item>
                            <Radio value="beginInterval"></Radio>First{" "}
                            <InputNumber
                                min={1}
                                max={4}
                                defaultValue={"1"}
                                placeholder="week"
                                size="small"
                                value={begin}
                                onChange={value => {
                                    this.changeParams("begin", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />{" "}
                            Weekly{" "}
                            <Select
                                style={{ width: 80 }}
                                defaultValue={"1"}
                                placeholder="Week"
                                value={beginEvery}
                                size="small"
                                onChange={value => {
                                    this.changeParams("beginEvery", value);
                                }}
                                disabled={type !== "beginInterval"}
                            >
                                {this.getWeekOptions()}
                            </Select>
                        </List.Item>
                        <List.Item style={{ marginBottom: 5 }}>
                            <Radio value="last"></Radio>
                            Last month
                            <Select
                                style={{ width: 80 }}
                                defaultValue={1}
                                placeholder="Week"
                                size="small"
                                value={last}
                                onChange={value => {
                                    this.changeParams("last", value);
                                }}
                                disabled={type !== "last"}
                            >
                                {this.getWeekOptions()}
                            </Select>
                        </List.Item>
                        <List.Item>
                            <Radio value="some">Specific Week number (multiple choices)</Radio>
                            <Select
                                style={{ width: "auto" }}
                                defaultValue="1"
                                mode="multiple"
                                placeholder="Week number"
                                size="small"
                                value={some}
                                showArrow
                                onChange={value => {
                                    if (value.length < 1) {
                                        //return message.warn("Select at least one");
                                    }
                                    this.changeParams("some", value);
                                }}
                                disabled={type !== "some"}
                            >
                                {this.getWeekOptions()}
                            </Select>
                            {/* <Checkbox.Group
                                value={some}
                                defaultValue="1"
                                onChange={value => {
                                    this.changeParams("some", value);
                                }}
                                options={this.weekOptions}
                                disabled={type !== "some"}
                            /> */}
                        </List.Item>
                    </List>
                </Group>
            </div>
        );
    }
}
