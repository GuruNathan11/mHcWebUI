/**
 * 功能：week period-day
 * 作者：宋鑫鑫
 *  day  period：2019.11.04
 */
import React, { PureComponent } from "react";
import { Radio, InputNumber, Row, Col, Select, List, Checkbox } from "antd";
const { Group } = Radio;
export default class Day extends PureComponent {
    constructor(props) {
        super(props);
        this.formatDayOptions();
    }

    // formatDayOptions() {
    //     this.dayOptions = [];
    //     for (let x = 1; x < 32; x++) {
    //         this.dayOptions.push({
    //             label: x,
    //             value: `${x}`
    //         });
    //     }
    // }

    formatDayOptions() {
        this.dayOptions = [];
        for (let x = 1; x < 32; x++) {
            const label = x < 10 ? `0${x}` : x;
            const value = `${x}`;
            const ele = (
                <Select.Option value={value} key={`${label}-${x}`}>
                    {label}
                </Select.Option>
            );
            this.dayOptions.push(ele);
        }
    }

    changeParams(type, value) {
        const state = { ...this.props.day };
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

    changeType = e => {
        const state = { ...this.props.day };
        // if (e.target.value === "some") {
        //     state.some = ["1"];
        // }
        state.type = e.target.value;
        this.props.onChange(state);
    };

    render() {
        const {
            day: { type, start, end, some, begin, beginEvery, last, closeWorkDay }
        } = this.props;
        return (
            <div>
                <Group value={type} onChange={this.changeType}>
                    <List size="small" bordered>
                        <List.Item>
                            <Radio value="*"> Every  day </Radio>
                        </List.Item>
                        <List.Item>
                            <Radio value="?">Not specify</Radio>
                        </List.Item>
                        <List.Item style={{ marginBottom: 5 }}>
                            <Radio value="period">week period</Radio> From {" "}
                            <InputNumber
                                min={1}
                                max={30}
                                defaultValue={1}
                                style={{ width: 80 }}
                                placeholder=" day "
                                size="small"
                                value={start}
                                onChange={value => {
                                    this.changeParams("start", value);
                                }}
                                disabled={type !== "period"}
                            />{" "}
                             To{" "}
                            <InputNumber
                                min={2}
                                max={31}
                                defaultValue={2}
                                style={{ width: 80 }}
                                placeholder=" day "
                                value={end}
                                size="small"
                                onChange={value => {
                                    this.changeParams("end", value);
                                }}
                                disabled={type !== "period"}
                            />
                            &nbsp; day &nbsp;
                        </List.Item>
                        <List.Item>
                            <Radio value="beginInterval"></Radio>
                             From {" "}
                            <InputNumber
                                min={1}
                                defaultValue={1}
                                placeholder=" day "
                                size="small"
                                value={begin}
                                onChange={value => {
                                    this.changeParams("begin", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />{" "}
                             day  Start ，  Every {" "}
                            <InputNumber
                                min={1}
                                defaultValue={1}
                                placeholder="day"
                                size="small"
                                value={beginEvery}
                                onChange={value => {
                                    this.changeParams("beginEvery", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />
                            &nbsp;Once a day
                        </List.Item>
                        <List.Item style={{ marginBottom: 5 }}>
                            <Radio value="closeWorkDay"></Radio>
                             Every  month {" "}
                            <InputNumber
                                min={1}
                                defaultValue={1}
                                placeholder=" day "
                                size="small"
                                value={closeWorkDay}
                                onChange={value => {
                                    this.changeParams("closeWorkDay", value);
                                }}
                                disabled={type !== "closeWorkDay"}
                            />
                            &nbsp; day last job day
                        </List.Item>
                        <List.Item style={{ marginBottom: 5 }}>
                            <Radio value="last">
                                this month At last{" "}
                                <InputNumber
                                    min={0}
                                    placeholder="day"
                                    size="small"
                                    value={last}
                                    onChange={value => {
                                        this.changeParams("last", value);
                                    }}
                                    disabled
                                // disabled={type !== "last"}
                                />{" "}
                                day
                            </Radio>
                        </List.Item>
                        <List.Item>
                            <Radio value="some">Specific days (multiple choices)</Radio>
                            <Select
                                style={{ width: "auto" }}
                                defaultValue={["00"]}
                                mode="multiple"
                                placeholder="day number "
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
                                {this.dayOptions}
                            </Select>
                            {/* <Checkbox.Group
                                value={some}
                                onChange={value => {
                                    this.changeParams("some", value);
                                }}
                                options={this.dayOptions}
                                disabled={type !== "some"}
                            /> */}
                        </List.Item>
                    </List>
                </Group>
            </div>
        );
    }
}
