//Load Web App JavaScript Dependencies/Plugins
define([
    "jquery",
    "modernizr.min",
    "html5shiv.min",
    "respond.min",
    "jquery-migrate.min",
    "plugins.min",
    "app/plugins.min",
    "app/script_non_jquery.min",
], function($)
{
    $(function()
    {
        //load jQuery Dependencies files, so we are save to use the "$" or "jQuery"
        loadScript(['script.min']);
    });
});