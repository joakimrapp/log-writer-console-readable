const startTime = Date.now();
const colors = require( 'colors' );
const moment = require( 'moment' );
module.exports = ( applicationName = 'unknown', omits = [] ) => {
	const logEmitter = require( '../../log-emitter' );
	const theme = {
		fatal: [ 'bgRed', 'black' ],
		error: [ 'red' ],
		warning: [ 'yellow' ],
		info: [ 'green' ],
		debug: [ 'gray' ],
		trace: [ 'dim', 'white' ],
		default: [ 'dim', 'green' ]
	};
	colors.setTheme( theme );
	const colorize = ( level, message ) => ( theme[ level ] ? message[ level ] : message.default );
	const dim = str => `(${applicationName}.${str})`.dim.gray;
	const listener = ( { moduleName, level, message, meta, extra = '' } ) => {
		const displayElapsedTime = moment( ( Date.now() - startTime ) + ( 23 * 60 * 60 * 1000 ) ).format( 'HH:mm:ss.SSS' ).dim.yellow;
		if( omits.indexOf( level ) < 0 )
			if( meta === undefined )
				console.log( displayElapsedTime, `${dim(moduleName)} ${colorize(level, message)}`, extra.toString().dim.gray );
			else if( meta instanceof Error ) {
				console.log( displayElapsedTime, `${dim(moduleName)} ${colorize(level, message + ':')}`, extra.toString().dim.gray );
				console.log( meta );
			}
			else if( typeof( meta ) === typeof( {} ) ) {
				console.log( displayElapsedTime, `${dim(moduleName)} ${colorize(level, message + ':')}`, extra.toString().dim.gray );
				console.log( JSON.stringify( meta, null, 2 ).cyan );
			}
			else
				console.log( displayElapsedTime, `${dim(moduleName)} ${colorize(level, message + ':')}`, meta.toString().cyan, extra.toString().dim.gray );
	};
	logEmitter.on( listener );
	console.log( '-'.repeat( 80 ) );
	listener( { moduleName: 'log', level: 'info', message: 'log writer started', meta: applicationName } );
	return logEmitter;
};
