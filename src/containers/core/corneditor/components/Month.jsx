/**
 * 功能：week period- month 
 * 作者：宋鑫鑫
 *  day  period：2019.11.04
 */
import React, { PureComponent } from "react";
import { Radio, InputNumber, Row, Col, List, Checkbox, Select } from "antd";
const { Group } = Radio;
export default class Month extends PureComponent {
    constructor(props) {
        super(props);
        this.formatMonthOptions();
    }

    changeParams(type, value) {
        const state = { ...this.props.month };
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

    // eachMonthOptions() {
    //     const options = [];
    //     for (let i = 1; i < 13; i++) {
    //         options.push({ label: `${i} month `, value: `${i}` });
    //     }
    //     return options;
    // }

    formatMonthOptions() {
        this.monthOptions = [];
        for (let x = 1; x < 13; x++) {
            const label = `${x} month `;
            const value = `${x}`;
            const ele = (
                <Select.Option value={value} key={`${label}-${x}`}>
                    {label}
                </Select.Option>
            );
            this.monthOptions.push(ele);
        }
    }

    changeType = e => {
        const state = { ...this.props.month };
        // if (e.target.value === "some") {
        //     state.some = ["1"];
        // }
        state.type = e.target.value;
        this.props.onChange(state);
    };

    render() {
        const {
            month: { type, start, end, beginEvery, begin, some }
        } = this.props;
        return (
            <div>
                <Group value={type} onChange={this.changeType}>
                    <List size="small" bordered>
                        <List.Item>
                            <Radio value="*"> Every  month </Radio>
                        </List.Item>
                        {/* <List.Item>
                            <Radio value="?">Not specify</Radio>
                        </List.Item> */}
                        <List.Item style={{ marginBottom: 5 }}>
                            <Radio value="period">week period</Radio> From {" "}
                            <InputNumber
                                min={1}
                                max={11}
                                defaultValue={1}
                                placeholder=" month "
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
                                max={12}
                                defaultValue={2}
                                placeholder=" month "
                                value={end}
                                size="small"
                                onChange={value => {
                                    this.changeParams("end", value);
                                }}
                                disabled={type !== "period"}
                            />
                            &nbsp; month &nbsp;
                        </List.Item>
                        <List.Item>
                            <Radio value="beginInterval"></Radio>
                             From 
                            <InputNumber
                                min={1}
                                max={12}
                                defaultValue={1}
                                placeholder="day"
                                size="small"
                                value={begin}
                                onChange={value => {
                                    this.changeParams("begin", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />{" "}
                             month  Start ，  Every {" "}
                            <InputNumber
                                min={1}
                                max={12}
                                defaultValue={1}
                                placeholder=" month "
                                endYear={beginEvery}
                                size="small"
                                onChange={value => {
                                    this.changeParams("beginEvery", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />{" "}
                             month execute once
                        </List.Item>
                        <List.Item>
                            <Radio value="some">Specific month  number (multiple choices)</Radio>
                            <Select
                                style={{ width: "auto" }}
                                defaultValue={1}
                                mode="multiple"
                                placeholder=" month  number "
                                size="small"
                                value={some}
                                showArrow
                                onChange={value => {
                                    if (value.length < 1) {
                                        ////return message.warn("Select at least one");
                                    }
                                    this.changeParams("some", value);
                                }}
                                disabled={type !== "some"}
                            >
                                {this.monthOptions}
                            </Select>
                            {/* <Checkbox.Group
                                value={some}
                                onChange={value => {
                                    this.changeParams("some", value);
                                }}
                                options={this.eachMonthOptions()}
                                disabled={type !== "some"}
                            /> */}
                        </List.Item>
                    </List>
                </Group>
            </div>
        );
    }
}
