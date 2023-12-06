/**
 * 功能：week period- second 
 * 作者：宋鑫鑫
 *  day  period：2019.11.04
 */
import React, { PureComponent } from "react";
import { Radio, InputNumber, message, List, Checkbox, Select } from "antd";
const { Group } = Radio;
export default class Second extends PureComponent {
    constructor(props) {
        super(props);
        this.formatSecondOptions();
    }

    // formatSecondOptions() {
    //     this.secondOptions = [];
    //     for (let x = 0; x < 60; x++) {
    //         this.secondOptions.push({
    //             label: x < 10 ? `0${x}` : x,
    //             value: `${x}`
    //         });
    //     }
    // }

    changeParams(type, value) {
        const state = { ...this.props.second };
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

    formatSecondOptions() {
        this.secondOptions = [];
        for (let x = 0; x < 60; x++) {
            const label = x < 10 ? `0${x}` : x;
            const value = `${x}`;
            const ele = (
                <Select.Option value={value} key={`${label}-${x}`}>
                    {label}
                </Select.Option>
            );
            this.secondOptions.push(ele);
        }
    }

    render() {
        const {
            second: { type, start, end, begin, beginEvery, some }
        } = this.props;
        return (
            <div>
                <Group
                    value={type}
                    onChange={e => {
                        const state = { ...this.props.second };
                        // if (e.target.value !== "some") {
                        //     state.some = ["0"];
                        // }
                        state.type = e.target.value;
                        this.props.onChange(state);
                    }}
                >
                    <List size="small" bordered>
                        <List.Item>
                            <Radio value="*"> Every  second </Radio>
                        </List.Item>
                        <List.Item style={{ marginBottom: 5 }}>
                            <Radio value="period">week period</Radio>
                             From  &nbsp;
                            <InputNumber
                                min={0}
                                max={58}
                                defaultValue={0}
                                style={{ width: 80 }}
                                placeholder=" second "
                                size="small"
                                value={start}
                                onChange={value => {
                                    this.changeParams("start", value);
                                }}
                                disabled={type !== "period"}
                            />
                            &nbsp; To&nbsp;
                            <InputNumber
                                min={1}
                                max={59}
                                defaultValue={1}
                                style={{ width: 80 }}
                                placeholder=" second "
                                value={end}
                                size="small"
                                onChange={value => {
                                    this.changeParams("end", value);
                                }}
                                disabled={type !== "period"}
                            />
                            &nbsp; second &nbsp;
                        </List.Item>
                        <List.Item>
                            <Radio value="beginInterval"></Radio>
                             From First &nbsp;
                            <InputNumber
                                min={0}
                                max={59}
                                defaultValue={0}
                                placeholder=" second "
                                size="small"
                                value={begin}
                                onChange={value => {
                                    this.changeParams("begin", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />{" "}
                            &nbsp; second  Start ，  Every  &nbsp;
                            <InputNumber
                                min={0}
                                max={59}
                                defaultValue={0}
                                placeholder=" second "
                                size="small"
                                value={beginEvery}
                                onChange={value => {
                                    this.changeParams("beginEvery", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />{" "}
                            &nbsp; second execute once
                        </List.Item>
                        <List.Item>
                            <Radio value="some">Specific second  number (multiple choices)</Radio>
                            <Select
                                style={{ width: "auto" }}
                                defaultValue={1}
                                mode="multiple"
                                placeholder=" second  number "
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
                                {this.secondOptions}
                            </Select>
                            {/* <Checkbox.Group
                                value={some}
                                onChange={value => {
                                    if (value.length < 1) {
                                        //return message.warn("Select at least one");
                                    }
                                    this.changeParams("some", value);
                                }}
                                options={this.secondOptions}
                                disabled={type !== "some"}
                            /> */}
                        </List.Item>
                    </List>
                </Group>
            </div>
        );
    }
}
