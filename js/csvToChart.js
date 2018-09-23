/**************************************************
 * Author        :  AK-12
 * Last modified :	2018-09-21 09:46
 * Email         :  saber2pr@gmail.com
 * github        :  https://github.com/Saber2pr
 * Filename      :	csvToChart.js
 * Description   :  csvToChart核心代码， 基于c3.js和d3.js。
 */
/**
 * @example
 * ```csv
 *  (csv格式)
 *  data1,data2
 *  1,15
 *  6,12
 *  3,13
 *  4,14
 *  5,15
 *  6,16
 * ```
 * types:
 * (可用类型)
 *  ""
 *  "donut"
 *  "bar"
 *  "spline"
 *  "step"
 *  "area-step"
 *  "area"
 *  "area-spline"
 *  "scatter"
 *  "pie"
 *  "gauge"
 */
import * as c3 from 'c3'
require("../css/c3.min.css")

var _result = null

function _set(result){
    _result = result
}

function _get(){
    return _result
}

function _parseString(string){
    if(typeof(string)!=="undefined"){
        var json = string.split("\n")
            json.pop()
            var array = []
            for(var ele of json){
                array.push(ele.split(","))
            }
        return array
    }else{
        return
    }
}

function _draw(chartId, data, type){
    c3.generate({
        bindto: "#"+chartId,
        data:{
            rows:data,
            type:type
        }
    })
}

function _createOnEvent(type, chartId){
    if(_get()!==null){
        _draw(chartId, _get(), type)
    }else{
        return
    }
}

function _init(target, chartId, type){
    var reader = new FileReader()
        if(typeof(target)!=="undefined"){
            reader.readAsText(target.files[0]);
            reader.onload = function () {
                _set(_parseString(this.result))
                    _createOnEvent(type, chartId)
            }
        }else{
            return
        }
}

function _heredoc(fn){
    return fn.toString().split('\n').slice(1,-1).join('\n') + '\n'
}

let initData = function(inputId, chartId){
    document.querySelector("#"+inputId).addEventListener(
            "change", function(event){
                _init(event.target, chartId)
            })            
}

let configBtn = function(chartId, btnId, type){
    document.querySelector("#"+btnId).addEventListener(
            "mouseenter", function(){
                _createOnEvent(type, chartId)
            })
}

let createChartUseVar = function(chartId, varCsv, type){
    _set(_parseString(varCsv))
        _draw(chartId, _get(), type)
}

let heredoc = function(fn) {
    return _heredoc(fn)
}

export var csvToChart = {
    initData:initData,
    configBtn:configBtn,
    createChartUseVar:createChartUseVar,
    heredoc:heredoc,
}
