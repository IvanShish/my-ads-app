Ext.define('MyAdsApp.model.Ad', {
    extend: 'MyAdsApp.model.Base',

    identifier: 'uuid',

    fields: [{
        name: 'title',
        type: 'string'
    },
    {
        name: 'description',
        type: 'string'
    },
    {
        name: 'price',
        type: 'float'
    },
    {
        name: 'category',
        type: 'string'
    },
    {
        name: 'condition',
        type: 'string'
    },
    {
        name: 'state',
        type: 'string'
    },
    {
        name: 'userId',
        type: 'string'
    },
    {
        name: 'sellerName',
        type: 'string',
        convert: function (value, record) {
            var userId = record.get('userId');
            var name = "";

            Ext.Ajax.request({
                url: serverUrl + '/api/users/' + userId,
                async: false,

                success: function (response) {
                    name = Ext.JSON.decode(response.responseText).firstName;
                }
            });

            return name;
        }
    },
    {
        name: 'adPicture',
        type: 'auto'
    }],
});
