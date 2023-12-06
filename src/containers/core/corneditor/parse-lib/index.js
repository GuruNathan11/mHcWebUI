/**
 * 功能：解析cron类
 * 作者：宋鑫鑫
 *  day  period：2019.11.04
 */

class CronParse {
    constructor() {
        // constructor是一个构造方法，用来接收参 number 
        this.dayRule = "";
        this.dayRuleSup = "";
        this.dateArr = [];
        this.resultList = [];
        this.isShow = false;
    }

    // 表达式值变化 hour ， Start 去计算结果
    expressionChange(cron) {
        // 计算 Start -隐藏结果
        this.isShow = false;
        // 获取规则 number 组[0 second 、1Minute、2 hour 、3 day 、4 month 、5Week、6year]
        const ruleArr = cron.split(" ");
        // 用于记录进入循环的次 number 
        let nums = 0;
        // 用于暂 hour 存符号 hour 间规则结果的 number 组
        const resultArr = [];
        // 获取当前 hour 间精确至[year、 month 、 day 、 hour 、Minute、 second ]
        const nTime = new Date();
        const nYear = nTime.getFullYear();
        let nMouth = nTime.getMonth() + 1;
        let nDay = nTime.getDate();
        let nHour = nTime.getHours();
        let nMin = nTime.getMinutes();
        let nSecond = nTime.getSeconds();
        // 根据规则获取 To近100year可能year number 组、 month  number 组等等
        this.getSecondArr(ruleArr[0]);
        this.getMinArr(ruleArr[1]);
        this.getHourArr(ruleArr[2]);
        this.getDayArr(ruleArr[3]);
        this.getMouthArr(ruleArr[4]);
        this.getWeekArr(ruleArr[5]);
        this.getYearArr(ruleArr[6], nYear);
        // 将获取 To的 number 组赋值-方便使用
        const sDate = this.dateArr[0];
        const mDate = this.dateArr[1];
        const hDate = this.dateArr[2];
        const DDate = this.dateArr[3];
        const MDate = this.dateArr[4];
        const YDate = this.dateArr[5];
        // 获取当前 hour 间在 number 组中的索引
        let sIdx = this.getIndex(sDate, nSecond);
        let mIdx = this.getIndex(mDate, nMin);
        let hIdx = this.getIndex(hDate, nHour);
        let DIdx = this.getIndex(DDate, nDay);
        let MIdx = this.getIndex(MDate, nMouth);
        const YIdx = this.getIndex(YDate, nYear);
        // 重置 month  day  hour Minute second 的函 number (后面用的比较多)
        const resetSecond = function() {
            sIdx = 0;
            nSecond = sDate[sIdx];
        };
        const resetMin = function() {
            mIdx = 0;
            nMin = mDate[mIdx];
            resetSecond();
        };
        const resetHour = function() {
            hIdx = 0;
            nHour = hDate[hIdx];
            resetMin();
        };
        const resetDay = function() {
            DIdx = 0;
            nDay = DDate[DIdx];
            resetHour();
        };
        const resetMouth = function() {
            MIdx = 0;
            nMouth = MDate[MIdx];
            resetDay();
        };
        // 如果当前year份不为 number 组中当前值
        if (nYear !== YDate[YIdx]) {
            resetMouth();
        }
        // 如果当前 month 份不为 number 组中当前值
        if (nMouth !== MDate[MIdx]) {
            resetDay();
        }
        // 如果当前“ day ”不为 number 组中当前值
        if (nDay !== DDate[DIdx]) {
            resetHour();
        }
        // 如果当前“ hour ”不为 number 组中当前值
        if (nHour !== hDate[hIdx]) {
            resetMin();
        }
        // 如果当前“Minute”不为 number 组中当前值
        if (nMin !== mDate[mIdx]) {
            resetSecond();
        }

        // 循环year份 number 组
        goYear: for (let Yi = YIdx; Yi < YDate.length; Yi++) {
            const YY = YDate[Yi];
            // 如果 To达最大值 hour 
            if (nMouth > MDate[MDate.length - 1]) {
                resetMouth();
                continue;
            }
            // 循环 month 份 number 组
            goMouth: for (let Mi = MIdx; Mi < MDate.length; Mi++) {
                // 赋值、方便后面运算
                let MM = MDate[Mi];
                MM = MM < 10 ? `0${MM}` : MM;
                // 如果 To达最大值 hour 
                if (nDay > DDate[DDate.length - 1]) {
                    resetDay();
                    if (Mi === MDate.length - 1) {
                        resetMouth();
                        continue goYear;
                    }
                    continue;
                }
                // 循环 day  period number 组
                goDay: for (let Di = DIdx; Di < DDate.length; Di++) {
                    // 赋值、方便后面运算
                    let DD = DDate[Di];
                    let thisDD = DD < 10 ? `0${DD}` : DD;
                    // 如果 To达最大值 hour 
                    if (nHour > hDate[hDate.length - 1]) {
                        resetHour();
                        if (Di === DDate.length - 1) {
                            resetDay();
                            if (Mi === MDate.length - 1) {
                                resetMouth();
                                continue goYear;
                            }
                            continue goMouth;
                        }
                        continue;
                    }
                    // 判断 day  period的合法性，不合法的话也是跳出当前循环
                    if (
                        this.checkDate(`${YY}-${MM}-${thisDD} 00:00:00`) !== true &&
                        this.dayRule !== "workDay" &&
                        this.dayRule !== "lastWeek" &&
                        this.dayRule !== "lastDay"
                    ) {
                        resetDay();
                        continue goMouth;
                    }
                    // 如果 day  period规则中有值 hour 
                    if (this.dayRule === "lastDay") {
                        // 如果不是合法 day  period则需要将前将 day  period调 To合法 day  period即 month 末At last一day
                        if (this.checkDate(`${YY}-${MM}-${thisDD} 00:00:00`) !== true) {
                            while (this.checkDate(`${YY}-${MM}-${thisDD} 00:00:00`) !== true) {
                                DD--;
                                thisDD = DD < 10 ? `0${DD}` : DD;
                            }
                        }
                    } else if (this.dayRule === "workDay") {
                        // 校验并调整如果是2 month 30号这种 day  period传进来 hour 需调整至正常 month 底
                        if (this.checkDate(`${YY}-${MM}-${thisDD} 00:00:00`) !== true) {
                            while (this.checkDate(`${YY}-${MM}-${thisDD} 00:00:00`) !== true) {
                                DD--;
                                thisDD = DD < 10 ? `0${DD}` : DD;
                            }
                        }
                        // 获取达 To条件的 day  period是WeekX
                        const thisWeek = this.formatDate(new Date(`${YY}-${MM}-${thisDD} 00:00:00`), "week");
                        // 当Week day  hour 
                        if (thisWeek === 0) {
                            // 先找下一个 day ，并判断是否为 month 底
                            DD++;
                            thisDD = DD < 10 ? `0${DD}` : DD;
                            // 判断下一 day 已经不是合法 day  period
                            if (this.checkDate(`${YY}-${MM}-${thisDD} 00:00:00`) !== true) {
                                DD -= 3;
                            }
                        } else if (thisWeek === 6) {
                            // 当Week6 hour 只需判断不是1号就可进行操作
                            if (this.dayRuleSup !== 1) {
                                DD--;
                            } else {
                                DD += 2;
                            }
                        }
                    } else if (this.dayRule === "weekDay") {
                        // 如果指定了是Week几
                        // 获取当前 day  period是属于Week几
                        const thisWeek = this.formatDate(new Date(`${YY}-${MM}-${DD} 00:00:00`), "week");
                        // 校验当前Week是否在Week池（dayRuleSup）中
                        if (Array.indexOf(this.dayRuleSup, thisWeek) < 0) {
                            // 如果 To达最大值 hour 
                            if (Di === DDate.length - 1) {
                                resetDay();
                                if (Mi === MDate.length - 1) {
                                    resetMouth();
                                    continue goYear;
                                }
                                continue goMouth;
                            }
                            continue;
                        }
                    } else if (this.dayRule === "assWeek") {
                        // 如果指定了是First几WeeklyWeek几
                        // 获取 Every  month 1号是属于Week几
                        const thisWeek = this.formatDate(new Date(`${YY}-${MM}-${DD} 00:00:00`), "week");
                        if (this.dayRuleSup[1] >= thisWeek) {
                            DD = (this.dayRuleSup[0] - 1) * 7 + this.dayRuleSup[1] - thisWeek + 1;
                        } else {
                            DD = this.dayRuleSup[0] * 7 + this.dayRuleSup[1] - thisWeek + 1;
                        }
                    } else if (this.dayRule === "lastWeek") {
                        // 如果指定了 Every  month At last一个Week几
                        // 校验并调整如果是2 month 30号这种 day  period传进来 hour 需调整至正常 month 底
                        if (this.checkDate(`${YY}-${MM}-${thisDD} 00:00:00`) !== true) {
                            while (this.checkDate(`${YY}-${MM}-${thisDD} 00:00:00`) !== true) {
                                DD--;
                                thisDD = DD < 10 ? `0${DD}` : DD;
                            }
                        }
                        // 获取 month 末At last一day是Week几
                        const thisWeek = this.formatDate(new Date(`${YY}-${MM}-${thisDD} 00:00:00`), "week");
                        // 找 To要求中最近的那个Week几
                        if (this.dayRuleSup < thisWeek) {
                            DD -= thisWeek - this.dayRuleSup;
                        } else if (this.dayRuleSup > thisWeek) {
                            DD -= 7 - (this.dayRuleSup - thisWeek);
                        }
                    }
                    // 判断 hour 间值是否小于10置换成“05”这种格式
                    DD = DD < 10 ? `0${DD}` : DD;
                    // 循环“ hour ” number 组
                    goHour: for (let hi = hIdx; hi < hDate.length; hi++) {
                        const hh = hDate[hi] < 10 ? `0${hDate[hi]}` : hDate[hi];
                        // 如果 To达最大值 hour 
                        if (nMin > mDate[mDate.length - 1]) {
                            resetMin();
                            if (hi === hDate.length - 1) {
                                resetHour();
                                if (Di === DDate.length - 1) {
                                    resetDay();
                                    if (Mi === MDate.length - 1) {
                                        resetMouth();
                                        continue goYear;
                                    }
                                    continue goMouth;
                                }
                                continue goDay;
                            }
                            continue;
                        }
                        // 循环"Minute" number 组
                        goMin: for (let mi = mIdx; mi < mDate.length; mi++) {
                            const mm = mDate[mi] < 10 ? `0${mDate[mi]}` : mDate[mi];
                            // 如果 To达最大值 hour 
                            if (nSecond > sDate[sDate.length - 1]) {
                                resetSecond();
                                if (mi === mDate.length - 1) {
                                    resetMin();
                                    if (hi === hDate.length - 1) {
                                        resetHour();
                                        if (Di === DDate.length - 1) {
                                            resetDay();
                                            if (Mi === MDate.length - 1) {
                                                resetMouth();
                                                continue goYear;
                                            }
                                            continue goMouth;
                                        }
                                        continue goDay;
                                    }
                                    continue goHour;
                                }
                                continue;
                            }
                            // 循环" second " number 组
                            for (let si = sIdx; si <= sDate.length - 1; si++) {
                                const ss = sDate[si] < 10 ? `0${sDate[si]}` : sDate[si];
                                // 添加当前 hour 间（ hour 间合法性在 day  period循环 hour 已经判断）
                                resultArr.push(`${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`);
                                nums++;
                                // 如果条 number 满了就退出循环
                                if (nums === 5) break goYear;
                                // 如果 To达最大值 hour 
                                if (si === sDate.length - 1) {
                                    resetSecond();
                                    if (mi === mDate.length - 1) {
                                        resetMin();
                                        if (hi === hDate.length - 1) {
                                            resetHour();
                                            if (Di === DDate.length - 1) {
                                                resetDay();
                                                if (Mi === MDate.length - 1) {
                                                    resetMouth();
                                                    continue goYear;
                                                }
                                                continue goMouth;
                                            }
                                            continue goDay;
                                        }
                                        continue goHour;
                                    }
                                    continue goMin;
                                }
                            } // goSecond
                        } // goMin
                    } // goHour
                } // goDay
            } // goMouth
        }
        // 判断100year内的结果条 number 
        if (resultArr.length === 0) {
            this.resultList = ["没有达 To条件的结果！"];
        } else {
            this.resultList = resultArr;
            if (resultArr.length !== 5) {
                this.resultList.push(`最近100year内只有上面${resultArr.length}条结果！`);
            }
        }
        // 计算完成-显示结果
        this.isShow = true;
        return this.resultList;
    }

    // 用于计算某位 number 字在 number 组中的索引
    getIndex(arr, value) {
        if (value <= arr[0] || value > arr[arr.length - 1]) {
            return 0;
        }
        for (let i = 0; i < arr.length - 1; i++) {
            if (value > arr[i] && value <= arr[i + 1]) {
                return i + 1;
            }
        }
    }

    // 获取"year" number 组
    getYearArr(rule, year) {
        this.dateArr[5] = this.getOrderArr(year, year + 100);
        if (rule !== undefined) {
            if (rule.indexOf("-") >= 0) {
                this.dateArr[5] = this.getCycleArr(rule, year + 100, false);
            } else if (rule.indexOf("/") >= 0) {
                this.dateArr[5] = this.getAverageArr(rule, year + 100);
            } else if (rule !== "*") {
                this.dateArr[5] = this.getAssignArr(rule);
            }
        }
    }

    // 获取" month " number 组
    getMouthArr(rule) {
        this.dateArr[4] = this.getOrderArr(1, 12);
        if (rule.indexOf("-") >= 0) {
            this.dateArr[4] = this.getCycleArr(rule, 12, false);
        } else if (rule.indexOf("/") >= 0) {
            this.dateArr[4] = this.getAverageArr(rule, 12);
        } else if (rule !== "*") {
            this.dateArr[4] = this.getAssignArr(rule);
        }
    }

    // 获取" day " number 组-主要为 day  period规则
    getWeekArr(rule) {
        // 只有当 day  period规则的两个值均为“” hour 则表达 day  period是有选项的
        if (this.dayRule === "" && this.dayRuleSup === "") {
            if (rule.indexOf("-") >= 0) {
                this.dayRule = "weekDay";
                this.dayRuleSup = this.getCycleArr(rule, 7, false);
            } else if (rule.indexOf("#") >= 0) {
                this.dayRule = "assWeek";
                const matchRule = rule.match(/[0-9]{1}/g);
                this.dayRuleSup = [Number(matchRule[0]), Number(matchRule[1])];
                this.dateArr[3] = [1];
                if (this.dayRuleSup[1] === 7) {
                    this.dayRuleSup[1] = 0;
                }
            } else if (rule.indexOf("L") >= 0) {
                this.dayRule = "lastWeek";
                this.dayRuleSup = Number(rule.match(/[0-9]{1,2}/g)[0]);
                this.dateArr[3] = [31];
                if (this.dayRuleSup === 7) {
                    this.dayRuleSup = 0;
                }
            } else if (rule !== "*" && rule !== "?") {
                this.dayRule = "weekDay";
                this.dayRuleSup = this.getAssignArr(rule);
            }
            // 如果weekDay hour 将7调整为0【week值0即是Week day 】
            if (this.dayRule === "weekDay") {
                for (let i = 0; i < this.dayRuleSup.length; i++) {
                    if (this.dayRuleSup[i] === 7) {
                        this.dayRuleSup[i] = 0;
                    }
                }
            }
        }
    }

    // 获取" day " number 组-少量为 day  period规则
    getDayArr(rule) {
        this.dateArr[3] = this.getOrderArr(1, 31);
        this.dayRule = "";
        this.dayRuleSup = "";
        if (rule.indexOf("-") >= 0) {
            this.dateArr[3] = this.getCycleArr(rule, 31, false);
            this.dayRuleSup = "null";
        } else if (rule.indexOf("/") >= 0) {
            this.dateArr[3] = this.getAverageArr(rule, 31);
            this.dayRuleSup = "null";
        } else if (rule.indexOf("W") >= 0) {
            this.dayRule = "workDay";
            this.dayRuleSup = Number(rule.match(/[0-9]{1,2}/g)[0]);
            this.dateArr[3] = [this.dayRuleSup];
        } else if (rule.indexOf("L") >= 0) {
            this.dayRule = "lastDay";
            this.dayRuleSup = "null";
            this.dateArr[3] = [31];
        } else if (rule !== "*" && rule !== "?") {
            this.dateArr[3] = this.getAssignArr(rule);
            this.dayRuleSup = "null";
        } else if (rule === "*") {
            this.dayRuleSup = "null";
        }
    }

    // 获取" hour " number 组
    getHourArr(rule) {
        this.dateArr[2] = this.getOrderArr(0, 23);
        if (rule.indexOf("-") >= 0) {
            this.dateArr[2] = this.getCycleArr(rule, 24, true);
        } else if (rule.indexOf("/") >= 0) {
            this.dateArr[2] = this.getAverageArr(rule, 23);
        } else if (rule !== "*") {
            this.dateArr[2] = this.getAssignArr(rule);
        }
    }

    // 获取"Minute" number 组
    getMinArr(rule) {
        this.dateArr[1] = this.getOrderArr(0, 59);
        if (rule.indexOf("-") >= 0) {
            this.dateArr[1] = this.getCycleArr(rule, 60, true);
        } else if (rule.indexOf("/") >= 0) {
            this.dateArr[1] = this.getAverageArr(rule, 59);
        } else if (rule !== "*") {
            this.dateArr[1] = this.getAssignArr(rule);
        }
    }

    // 获取" second " number 组
    getSecondArr(rule) {
        this.dateArr[0] = this.getOrderArr(0, 59);
        if (rule.indexOf("-") >= 0) {
            this.dateArr[0] = this.getCycleArr(rule, 60, true);
        } else if (rule.indexOf("/") >= 0) {
            this.dateArr[0] = this.getAverageArr(rule, 59);
        } else if (rule !== "*") {
            this.dateArr[0] = this.getAssignArr(rule);
        }
    }

    // 根据传进来的min-max返回一个顺序的 number 组
    getOrderArr(min, max) {
        const arr = [];
        for (let i = min; i <= max; i++) {
            arr.push(i);
        }
        return arr;
    }

    // 根据规则中指定的零散值返回一个 number 组
    getAssignArr(rule) {
        const arr = [];
        const assiginArr = rule.split(",");
        for (let i = 0; i < assiginArr.length; i++) {
            arr[i] = Number(assiginArr[i]);
        }
        arr.sort(this.compare);
        return arr;
    }

    // 根据一定算术规则计算返回一个 number 组
    getAverageArr(rule, limit) {
        const arr = [];
        const agArr = rule.split("/");

        let min = Number(agArr[0]);
        const step = Number(agArr[1]);
        while (min <= limit) {
            arr.push(min);
            min += step;
        }
        return arr;
    }

    // 根据规则返回一个具有week period性的 number 组
    getCycleArr(rule, limit, status) {
        // status--表示是否 From 0 Start （则 From 1 Start ）
        const arr = [];
        const cycleArr = rule.split("-");
        const min = Number(cycleArr[0]);
        let max = Number(cycleArr[1]);
        if (min > max) {
            max += limit;
        }
        for (let i = min; i <= max; i++) {
            let add = 0;
            if (status === false && i % limit === 0) {
                add = limit;
            }
            arr.push(Math.round((i % limit) + add));
        }
        arr.sort(this.compare);
        return arr;
    }

    // 比较 number 字大小（用于Array.sort）
    compare(value1, value2) {
        if (value2 - value1 > 0) {
            return -1;
        }
        return 1;
    }

    // 格式化 day  period格式如：2017-9-19 18:04:33
    formatDate(value, type) {
        // 计算 day  period相关值
        const time = typeof value === "number" ? new Date(value) : value;
        const Y = time.getFullYear();
        const M = time.getMonth() + 1;
        const D = time.getDate();
        const h = time.getHours();
        const m = time.getMinutes();
        const s = time.getSeconds();
        const week = time.getDay();
        // 如果传递了type的话
        if (type === undefined) {
            return `${Y}-${M < 10 ? `0${M}` : M}-${D < 10 ? `0${D}` : D} ${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
        }
        if (type === "week") {
            return week;
        }
    }

    // 检查 day  period是否存在
    checkDate(value) {
        const time = new Date(value);
        const format = this.formatDate(time);
        return value === format;
    }
}

// export default {
//     CronParse
// }
export default CronParse;
// module.exports = CronParse
