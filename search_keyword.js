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


    var GetCursorPosition = function() {
        return { 'x': 0 | Editor.ExpandParameter('$x'), 'y': 0 | Editor.ExpandParameter('$y') };
    }

    var search_keyword = function(keyword, start, rev) {
        var line_no = -1;

        // Save first cursol position
        first_pos = GetCursorPosition();

        // Go to file_end
        if (!rev) {
            Editor.GoFileTop();
        } else {
            Editor.GoFileEnd();
        }

        // Search keyword in reverse 
        if (!rev) {
            Editor.SearchNext(keyword, 1);
        } else {
            Editor.SearchPrev(keyword, 1);
        }

        // Init for loop
        var is_find = false;
        cur_pos = GetCursorPosition();
        prev_pos = cur_pos;
        do {
            // Found it?
            if (cur_pos.x == start) {
                is_find = true;
                line_no = cur_pos.y;
            }

            // Go next
            if (!rev) {
                Editor.SearchNext(keyword, 1);
            } else {
                Editor.SearchPrev(keyword, 1);
            }

            // Updat position
            prev_pos = cur_pos;
            cur_pos = GetCursorPosition();
        } while (!is_find && prev_pos.y != cur_pos.y);

        // Reset cursol position
        Editor.MoveCursor(first_pos.y, first_pos.x, 0);

        return line_no;
    }

    console.log(search_keyword("SHALL", 67, false));
    console.log(search_keyword("SHALL", 67, true));
}())