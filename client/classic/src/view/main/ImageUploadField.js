/**
 * This componet handles icon upload along with preview and drag drop.
 * Usage: include it as xtype: 'imageuploadfield', including this field in a form requires us to submit it via a method submitWithImage instead of submit.
 */

Ext.define('MyAdsApp.view.main.ImageUploadField', {
    alias: 'widget.imageuploadfield',
    extend: 'Ext.form.FieldContainer',

    config: {
        /**
         * @cfg {Sting} title of the fieldset which includes this field
         */

        title: 'Choose an image',

        /**
         * @cfg {String} text of the button, which is one of the ways to choose image
         */
        buttonText: 'Choose image',

        /**
         * @cfg {String} name of the params which contained the image. This is will be used to process the image in the server side
         */
        name: 'image',

        /**
         * @cfg {String} src of preview image
         */
        previewImageSrc: 'classic/resources/default.jpg',

        /**
         * @cfg {Int} width of image
         */
        imageWidth: 200,

        /**
         * @cfg {Int} height of image
         */
        imageHeight: 200,

        /**
         * text to be displayed in the drag area
         */
        dragAreaText: 'Drop an image here'
    },

    initComponent: function () {
        var me = this;

        var upLoadButton = {
            xtype: 'fileuploadfield',
            inputId: 'fileuploadfield_' + me.id,
            buttonText: me.buttonText,
            buttonOnly: true,
            listeners: {
                change: function (input, value, opts) {
                    var canvas = Ext.ComponentQuery.query('image[canvas="' + input.inputId + '"]')[0],
                        file = input.getEl().down('input[type=file]').dom.files[0];
                    me.attachImage(file, canvas);
                }
            }
        };

        var previewImage = {
            xtype: 'image',
            frame: true,
            canvas: upLoadButton.inputId,
            width: me.imageWidth,
            height: me.imageHeight,
            animate: 2000,
            hidden: true, // initially hidden
            scope: this
        };

        if (!Ext.isEmpty(me.previewImageSrc)) {
            // if an existing value
            previewImage.src = me.previewImageSrc;
            previewImage.hidden = false;
        }

        me.dropTargetId = 'droptaget-' + (me.itemId || Math.random().toString());

        var dropTarget = {
            xtype: 'label',
            html: '<div style="height: 70px; border: solid 1px;" class="drop-target"' + 'id=' + '\'' + me.dropTargetId + '\'' + '>' + me.dragAreaText + '</div>'
        };
        me.on('afterrender', function (e) {
            var previewImage = me.down('image');
            if (!me.previewImageSrc) {
                previewImage.setSrc('');
            }

            var dropWindow = document.getElementById(me.dropTargetId),
                form = me.up('form');
            dropWindow.addEventListener('dragenter', function (e) {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'none';
                e.target.style.opacity = .5;
                e.target.style.background = 'grey';
            }, false);

            dropWindow.addEventListener('dragover', function (e) {
                e.preventDefault();
            });

            dropWindow.addEventListener('drop', function (e) {
                e.preventDefault();
                e.target.style.opacity = "";
                e.target.style.background = 'white';
                var file = e.dataTransfer.files[0],
                    canvas = Ext.ComponentQuery.query('image[canvas="' + previewImage.canvas + '"]')[0];
                me.attachImage(file, canvas);
            }, false);


            dropWindow.addEventListener('dragleave', function (e) {
                e.target.style.opacity = "";
                e.target.style.background = 'white';
            }, false);

        });

        var fileUploadFieldSet = {
            xtype: 'fieldset',
            layout: {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            title: me.title,
            items: [
                {
                    width: '90%',
                    items: [dropTarget, upLoadButton]
                },
                {
                    items: [previewImage]
                }
            ]
        };

        me.items = [fileUploadFieldSet];
        me.callParent(arguments);
    },

    attachImage: function (file, canvas) {
        var me = this,
            form = me.up('form');

        if (file.type == "image/jpeg" ||
            file.type == "image/jpg" ||
            file.type == "image/png" ||
            file.type == "image/gif" ||
            file.type == "image/ico"
        ) {
            form.lastImage = file;

            var reader = new FileReader();
            reader.onload = function (e) {
                canvas.setSrc(e.target.result);
            };

            reader.readAsDataURL(file);
            canvas.show();
        } else {
            Ext.Msg.alert('Error', 'Only images please, supported files are jpeg,jpg,png,gif,ico');
        }
    },

    setPreviewImageSrc: function (val) {
        var me = this;
        if (val) {
            if (me.items && val !== me.previewImageSrc) {
                var image = me.up('form').down('image');
                me.previewImageSrc = "data:image/png;base64," + val;
                image.setSrc(me.previewImageSrc);
            }
            else {
                me.previewImageSrc = val;
            }
        }
    }
});


/**
 * include a method submitImage for form. This method should be used when a form as xtype: 'imageuploadfield'.
 * it accepts params in the same as submit method, form.submitImage({
    url: 'some url',
    success: onSuccess
    failure: onFailure
});
 * returns false if no image has been loaded
 */
Ext.override(Ext.FormPanel, {
    submitImage: function (options) {
        var me = this;
        var data = new FormData();

        if (!me.lastImage) {
            return false;
        }

        data.append('file', me.lastImage);

        Ext.Ajax.request({
            method: 'POST',
            url: options.url,
            headers: { 'Content-Type': null },
            rawData: data,

            success: options.success,
            failure: options.failure
        });

        return true;
    }

});