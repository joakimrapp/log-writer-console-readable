module.exports = ( application, levelsConfig = [ "*", "!>info", "!<fatal" ], log = console.log ) => {
	const logger = require( './logger.js' );
	try {
		require( '@jrapp/log-emitter' ).on( levelsConfig, logger( application, log ) );
		logger( 'log', log )( { name: 'writer', level: 3, message: 'start', meta: new Date().toString() } );
	} catch( err ) {
		logger( 'log', log )( { name: 'writer', level: 0, message: 'Log emitter must be installed!' } ); }
	return require( './display.js' );
};
