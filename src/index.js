module.exports = ( application, levelsConfig = [ "*", "!>info", "!<fatal" ], log = console.log ) => {
	require( './logger.js' )( 'log', log )( { name: 'writer', level: 3, message: 'start', meta: new Date().toString() } );
	const logger = require( './logger.js' )( application, log );
	require( '@jrapp/log-emitter' ).on( levelsConfig, logger );
	return require( './display.js' );
};
