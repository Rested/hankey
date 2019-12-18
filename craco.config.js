module.exports = {
    plugins: [{
        plugin: require('@semantic-ui-react/craco-less')
    }],
    babel: {
        loaderOptions: {
            babelrc: true,
        },
    },
}