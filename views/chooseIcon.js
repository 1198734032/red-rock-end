function Icon(res, ospan) {
    switch (res) {
        case "晴":
            ospan.className += " iconfont icon-ziwaixian";
            break;
        case "多云":
            ospan.className += " iconfont icon-duoyun";
            break;
        case "多云转阴":
            ospan.className += " iconfont icon-duoyun";
            break;
        case "阴转多云":
            ospan.className += " iconfont icon-duoyun";
            break;
        case "雨":
            ospan.className += " iconfont icon-xiaoyu";
            break;
        case "阴":
            ospan.className += " iconfont icon-yintian";
            break;
        case "小雨转阴":
            ospan.className += " iconfont icon-xiaoyu";
            break;
        case "月雨":
            ospan.className += " iconfont icon-ziyuan2";
            break;
        case "月晴":
            ospan.className += " iconfont icon-ziyuan1";
        default:
            ospan.className += " iconfont icon-yintian"

    }

}