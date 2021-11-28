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

    var write_lib = function(lib, text) {
        var lib_path = "D:\\local_repos\\sakura_macro";

        var objFS = new ActiveXObject("Scripting.FileSystemObject");
        var module_path = objFS.BuildPath(lib_path, lib);
        objFS.CreateTextFile(module_path);

        var objFile = objFS.GetFile(module_path);
        var objText = objFile.OpenAsTextStream(2)

        objText.Write(text);

        objText.Close();
    }


    var lib = "./lib/write_test.js";
    var text = "var CONFIG = { " +
        "'DEBUG_MODE': 'test' " +
        "}";
    write_lib(lib, text);
}())