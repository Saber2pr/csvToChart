/**************************************************
 * Author        :  AK-12
 * Last modified :  2018-09-21 14:20
 * Email         :  saber2pr@gmail.com
 * github        :  https://github.com/Saber2pr
 * Filename      :  main.js
 * Description   :  配置依赖。
 */
require.config({
    baseUrl:"./js",
    paths:{
        d3:"lib/d3-5.4.0.min",
        c3:"lib/c3.min",
        csvToChart:"csvToChart"
    },
    shim:{
        c3:{
            deps:["d3"],
            exports:"c3.min"
        },
    }
})
