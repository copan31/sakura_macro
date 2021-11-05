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

    var over_bookmarks = function(act) {
        // Move to first one
        Editor.GoFileTop();
        is_book_at_top = Editor.GetLineAttribute(0, 2);

        if (!is_book_at_top) {
            Editor.BookmarkNext();
        }

        // Save first position
        var cur_pos = GetCursorPosition().y;
        var prev_pos = cur_pos;

        do {
            // Call function
            //console.log(cur_pos);
            act();

            // Go next
            Editor.BookmarkNext();

            // Update position
            prev_pos = cur_pos;
            cur_pos = GetCursorPosition().y;
        } while (cur_pos != prev_pos);
    }

    var append_it_to_clipboard = function() {
        // Get current Clipboard
        var cur_clip = Editor.GetClipboard(0);

        // Copy line
        cur_line_str = Editor.GetLineStr(0);
        //console.log(cur_line_str);

        // Set new clipboard
        Editor.SetClipboard(0, cur_clip + cur_line_str);
    }

    // Execute
    Editor.SetClipboard(0, '');
    over_bookmarks(append_it_to_clipboard);
}())