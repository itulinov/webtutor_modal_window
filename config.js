const packageJson = require('./package.json')

module.exports = {
    url: 'https://bu-online.beeline.ru/view_doc.html?mode=modal_window_dev',
    publicPath: packageJson.homepage,
    cookieString: "SessionID=7238957732275846939"
};
