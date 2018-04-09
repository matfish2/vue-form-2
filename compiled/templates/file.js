"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

exports.default = function (h) {
        var value = '';
        var val = this.getValue();

        if (val) value = h(
                "span",
                { "class": "VF-Field__file_uploaded glyphicon glyphicon-ok",
                        attrs: { title: val }
                },
                []
        );

        return h(
                "span",
                { "class": "VF-Field__file-upload" },
                [h(
                        "span",
                        { "class": "glyphicon glyphicon-upload VF-Field__file-upload-icon" },
                        []
                ), h(
                        "input",
                        {
                                attrs: { disabled: this.disabled,
                                        type: "file",
                                        name: this.Name
                                },
                                "class": "form-control-file" },
                        []
                ), value]
        );
};