(function($) {
    var _prefix = (function(temp) {
        var aPrefix = ["webkit", "moz", "o", "ms"],
            props = "";
        for (var i in aPrefix) {
            props = aPrefix[i] + "Transition";
            if (temp.style[props] !== undefined) {
                return "-" + aPrefix[i].toLowerCase() + "-";
            }
        }
        return false;
    })(document.createElement(PageSwitch));
    var PageSwitch = (function() {
        function PageSwitch(element, options) {
            this.settings = $.extend(true, $.fn.PageSwitch.defaults, options || {});
            this.element = element;
            this.init();
        }
        PageSwitch.prototype = {
            /*初始化dom结构,布局,分页以及绑定事件*/
            init: function() {
                var me = this;
                me.selectors = me.settings.selectors;
                me.sections = me.element.find(me.selectors.sections);
                me.section = me.element.find(me.selectors.section);

                me.direction = me.settings.direction == "Y" ? true : false;
                me.pagesCount = me.pagesCounts();
                //console.log(this.section.length);
                me.index = (me.settings.index >= 0 && me.settings.index < me.pagesCount) ? me.settings.index : 0;
                if (!me.direction) { _initLayout(); }
                if (me.settings.pagination) { me._initPaging(); }
                me._initEvent();
            },
            /*获取滑动页面数量*/
            pagesCounts: function() {
                return this.section.length;
            },
            /*获取滑动宽度(横屏)或者 滑动高度(竖屏)*/
            switchLenght: function() {
                return this.direction ? this.element.height() : this.element.width();
            },
            /*向上/前滑动页面*/
            prev: function() {
                var me = this;
                if (me.index > 0) { me.index--; } else if (me.settings.loop) {
                    me.index = me.pagesCount - 1;
                }
                me._scrollPage();
            },
            /*向下/后滑动页面*/
            next: function() {
                var me = this;
                if (me.index < (me.pagesCount - 1)) { me.index++; } else if (me.settings.loop) {
                    me.index = 0;
                }
                me._scrollPage();
            },
            /*针对横屏情况进行页面布局*/
            _initLayout: function() {
                var me = this;
                var width = (me.pagesCount * 100) + "%",
                    cellWidth = (100 / me.pagesCount).toFixed(2) + "%";
                me.sections.width(width);
                me.section.width(cellWidth).css("float", "left");
            },
            /*实现分页的dom结构以及CSS样式*/
            _initPaging: function() {
                var me = this,
                    pagesClass = me.selectors.page.substring(1);
                me.activeClass = me.selectors.active.substring(1);

                var pageHtml = "<ul class=" + pagesClass + ">";
                for (var i = 0; i < me.pagesCount; i++) {
                    pageHtml += "<li></li>";
                }
                pageHtml += "</ul>";
                //console.log(me.pagesCount);
                me.element.append(pageHtml);
                var pages = me.element.find(me.selectors.page);
                me.pagesItem = pages.find("li");
                me.pagesItem.eq(me.index).addClass(me.activeClass);
                if (me.direction) {
                    pages.addClass("vertical"); //竖
                } else {
                    pages.addClass("horizontal"); //横
                }
            },
            _scrollPage: function() {
                var me = this,
                    dest = me.section.eq(me.index).position();
                if (!dest) {
                    return; }
                if (_prefix) {
                    //console.log(me.section.eq(me.index));
                    me.sections.css(_prefix + "transition", "all " + me.settings.duration + "ms " + me.settings.easing);
                    var translate = me.direction ? "translateY(-" + dest.top + "px)" : "translateX(-" + dest.left + "px)";
                    me.sections.css(_prefix + "transform", translate);
                } else {
                    var animateCss = me.direction ? { top: -dest.top } : { lest: -dest.left };
                    me.sections.animate(animateCss, me.settings.duration, function() {

                    });
                }
                 if (me.settings.pagination) {
                    me.pagesItem.eq(me.index).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
                }
            },
            /*初始化插件事件*/
            _initEvent: function() {
                var me = this;
                /*分页点击*/
                me.element.on("click", me.selectors.pages + "li", function() {
                    me.index = $(this).index();
                    me._scrollPage();
                });
                /*鼠标滑轮*/
                me.element.on("mousewheel DOMMouseScroll", function(e) {
                    var dalta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                    if (dalta > 0 && (me.index && !me.settings.loop || me.settings.loop)) {
                        me.prev();
                    } else if (dalta < 0 && (me.index < (me.pagesCount - 1) && !me.settings.loop || me.settings.loop)) {
                        me.next();
                    }
                });
                /*键盘按下*/
                if (me.settings.keyboard) {
                    $(window).on("keydown", function(e) {
                        var keycode = e.keyCode;
                        if (keycode == 37 || keycode == 38) {
                            me.prev();
                        } else if (keycode == 39 || keycode == 40) {
                            me.next();
                        }
                    });
                }
                /*窗口尺寸改变*/
                $(window).resize(function() {
                    // console.log(	me.section.eq(me.index));
                    var currentLenght = me.switchLenght(),
                        offset = me.settings.direction ? me.section.eq(me.index).offset().top : me.section.eq(me.index).offset().left;
                    if (Math.abs(offset) > currentLenght / 2 && me.index < (me.pagesCount - 1)) {
                        me.index++;
                    }
                    if (me.index) {
                        me._scrollPage();
                    }
                });
                me.section.on("transitionend webkitTransitionEnd oTransitionEnd otransitionEnd", function() {
                    if (me.settings.callback && $.type(me.settings.callback) === "function") {
                        me.settings.callback();
                    }
                });
            }
        };
        return PageSwitch;
    })();

    $.fn.PageSwitch = function(options) {
        return this.each(function() {
            var me = $(this);
            instance = me.data("PageSwitch");
            if (!instance) {
                instance = new PageSwitch(me, options);
                me.data("PageSwitch", instance);
            }
            if ($.type(options) === "string") {
                return instance[options]();
            }

        });
    }
    $.fn.PageSwitch.defaults = {
        selectors: {
            sections: ".sections",
            section: ".section",
            page: ".pages",
            active: ".active"
        },
        index: 0,
        easing: "ease-in",
        duration: 500, //ms
        loop: false,
        pagination: true,
        keyboard: true,
        direction: "Y",
        callback: ""
    }

})(jQuery);
