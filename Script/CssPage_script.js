//第一个示例样式  初始化开始
//percentage:宽度/百分比    timeinterval:完成时间/毫秒
function Schedule_textInit(percentage, timeinterval) {
    $(".schedule_text_d1").animate({
        width: percentage + "%"
    }, timeinterval);
}