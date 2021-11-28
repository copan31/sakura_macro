(function() {
    // pretend console.log 
    var console = typeof console !== 'undefined' ? console : {};
    if (console) {
        console.log = function(str) {
            var log_str = "[DEBUG] $d$t ($f) > " + str;
            Editor.TraceOut(log_str, 1);
        }
        console.info = function(str) {
            var log_str = "[INFO] $d$t ($f) > " + str;
            Editor.TraceOut(log_str, 1);
        }
        console.dir = function(obj) {
            var str = "[DUMP] $d$t ($f) > " + JSON.stringify(obj);
            Editor.TraceOut(str, 1);
        }
    }

    libs = [
        "./lib/test.js"
    ]
    var lib_path = "D:\\local_repos\\sakura_macro";
    var objFS = new ActiveXObject("Scripting.FileSystemObject");
    with({
        get_moduleCode: function(path) {
            return objFS.OpenTextFile(path, 1).ReadAll();
        }
    }) {
        var len = libs.length;
        for (var i = 0; i < len; i++) {
            try {
                var module_path = objFS.BuildPath(lib_path, libs[i]);
                // console.log(module_path);
                eval(get_moduleCode(module_path));
            } catch (e) {
                null;
            }
        }
    };
    objFS = null;

    // Execute    
    console.log(test_func());
}())