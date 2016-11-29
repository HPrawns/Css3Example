//第一个示例脚本  初始化开始
//percentage:宽度/百分比    timeinterval:完成时间/毫秒
function Schedule_textInit(percentage, timeinterval) {
    $(".schedule_text_d1").animate({
        width: percentage + "%"
    }, timeinterval);
}
//第二个示例脚本  初始化开始
var index = 0;
var t;
function scheduleblockAddDiv() {
    var divs = "<div></div>";
    var data = $(".scheduleblock").append(divs);
}

function scheduleblockInit() {
    t = setInterval("scheduleblockAddDiv()", 300);
    index++;
    if (index == 30) {
        clearInterval(t);
    }
}
function scheduleblockClear() {
    clearInterval(t);
    $(".scheduleblock").html("");
}
//第三个示例脚本  初始化开始
///菜单滑动初始化
//ultagclass:菜单UL外层DIV类名,请保持唯一    slidedivclass:滑动的DIV类名请保持唯一   seed:速度/毫秒
function slideMenu(ultagclass, slidedivclass, seed) {
    this.ultagclass = ultagclass;
    this.slidedivclass = slidedivclass;
    this.seed = seed;
}
slideMenu.prototype.Init = function () {
    var liobj = $("." + this.ultagclass).find("li"); if (!liobj) { return; }
    var sldiv = $("." + this.slidedivclass);
    var fileft = $(liobj[0]).offset().left;
    sldiv.css({ "width": $(liobj[0]).css("width"), "left": fileft });
    $(liobj).hover(function () {
        var lefts = $(this).offset().left;
        sldiv.stop().animate({
            left: lefts
        }, this.seed);
    }, function () {
        sldiv.stop().animate({
            left: fileft
        }, "fast");
    });
}
//第四个脚本示例,返回顶部

function BacktoTop() {
    $("#backtop").on("click", function () {
        $("html,body").animate({
            scrollTop: 0
        }, 800);
    });
}
//方块移动
function MoveBlock() {
    var BlockArry = Array.apply(null, { length: 81 }).map(function (_, index) {
        return {
            id: index,
            number: index % 9 + 1
        }
    });
    new Vue({
        el: '#sudoku-demo',
        data: {
            cells: BlockArry
        },
        methods: {
            shuffle: function () {
                this.cells = _.shuffle(this.cells)      // _.shuffle为lodash 中的一个方法 打乱数组顺序
            }
        }
    })
}