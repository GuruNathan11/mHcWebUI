/**
 * 功能：week period- minute 
 * 作者：宋鑫鑫
 *  day  period：2019.11.04
 */
import React, { PureComponent } from "react";
import { Radio, InputNumber, message, List, Checkbox, Select } from "antd";
const { Group } = Radio;
export default class Minute extends PureComponent {
    constructor(props) {
        super(props);
        this.formatMinuteOptions();
    }

    // formatMinuteOptions() {
    //     this.minuteOptions = [];
    //     for (let x = 0; x < 60; x++) {
    //         this.minuteOptions.push({
    //             label: x < 10 ? `0${x}` : x,
    //             value: `${x}`
    //         });
    //     }
    // }

    formatMinuteOptions() {
        this.minuteOptions = [];
        for (let x = 0; x < 60; x++) {
            const label = x < 10 ? `0${x}` : x;
            const value = `${x}`;
            const ele = (
                <Select.Option value={value} key={`${label}-${x}`}>
                    {label}
                </Select.Option>
            );
            this.minuteOptions.push(ele);
        }
    }

    changeParams(type, value) {
        const state = { ...this.props.minute };
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
        const state = { ...this.props.minute };
        // if (e.target.value === "some") {
        //     state.some = ["1"];
        // }
        state.type = e.target.value;
        this.props.onChange(state);
    };

    render() {
        const {
            minute: { type, start, end, some, begin, beginEvery }
        } = this.props;
        return (
            <div>
                <Group value={type} onChange={this.changeType}>
                    <List size="small" bordered>
                        <List.Item>
                            <Radio value="*"> Every  minute </Radio>
                        </List.Item>
                        <List.Item style={{ marginBottom: 5 }}>
                            <Radio value="period">week period</Radio>
                             From &nbsp;
                            <InputNumber
                                min={0}
                                max={58}
                                defaultValue={0}
                                style={{ width: 80 }}
                                placeholder="Minute"
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
                                placeholder="Minute"
                                value={end}
                                size="small"
                                onChange={value => {
                                    this.changeParams("end", value);
                                }}
                                disabled={type !== "period"}
                            />
                            &nbsp; minute &nbsp;
                        </List.Item>
                        <List.Item>
                            <Radio value="beginInterval"></Radio>
                             From First&nbsp;
                            <InputNumber
                                min={0}
                                max={59}
                                defaultValue={0}
                                placeholder="Minute"
                                size="small"
                                value={begin}
                                onChange={value => {
                                    this.changeParams("begin", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />
                            &nbsp;Minute Start ，  Every &nbsp;
                            <InputNumber
                                min={1}
                                max={59}
                                defaultValue={1}
                                placeholder="Minute"
                                size="small"
                                value={beginEvery}
                                onChange={value => {
                                    this.changeParams("beginEvery", value);
                                }}
                                disabled={type !== "beginInterval"}
                            />
                            &nbsp;Minute execute once
                        </List.Item>
                        <List.Item>
                            <Radio value="some">Specific minute  number (multiple choices)</Radio>
                            <Select
                                style={{ width: "auto" }}
                                defaultValue={1}
                                mode="multiple"
                                placeholder=" minute  number "
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
                                {this.minuteOptions}
                            </Select>
                            {/* <Checkbox.Group
                                value={some}
                                onChange={value => {
                                    if (value.length < 1) {
                                        //return message.warn("Select at least one");
                                    }
                                    this.changeParams("some", value);
                                }}
                                options={this.minuteOptions}
                                disabled={type !== "some"}
                            /> */}
                        </List.Item>
                    </List>
                </Group>
            </div>
        );
    }
}
