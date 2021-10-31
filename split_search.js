(function() {
    // pretend console.log 
    var console = typeof console !== 'undefined' ? console : {};
    if (console) {
        console.log = function(str) {
            var log_str = "[DEBUG] $d$t ($f) > " + str;
            Editor.TraceOut(log_str, 1)
        }
        console.info = function(str) {
            var log_str = "[INFO] $d$t ($f) > " + str;
            Editor.TraceOut(log_str, 1)
        }
        console.dir = function(obj) {
            var str = "[DUMP] $d$t ($f) > " + JSON.stringify(obj);
            Editor.TraceOut(str, 1);
        }
    }

    win_status = Editor.GetCookie("window", "test");
    //console.log(win_status);

    if (win_status != "open") {
        org_clip = GetClipboard(0)

        Editor.Copy();
        target = Editor.GetClipboard(0);
        //console.log(target);
        Editor.SetClipboard(0, org_clip);

        Editor.SplitWinV();
        Editor.SetCookie("window", "test", "open")

        Editor.SearchNext(target, 0);

    } else {
        Editor.SplitWinV();
        Editor.SetCookie("window", "test", "close")
    }
}())