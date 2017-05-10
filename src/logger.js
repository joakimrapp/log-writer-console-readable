const config = require( '../config/theme.json' );
const display = require( './display.js' );
const sgr = ( { text = '', background, effect = '' } = {} ) =>
	[ ...text.split( '.' ), ...( background ? `background.${background}`.split( '.' ) : [] ), ...effect.split( '.' ) ]
		.filter( action => action.length )
		.reduce( ( sgr, action ) => sgr[ action ], require( './sgr.js' )() ).compiled;
const sgrs = {
	time: sgr( config.time ),
	name: sgr( config.name ),
	milliseconds: sgr( config.milliseconds ),
	meta: sgr( config.meta ),
	message: Object.keys( config.message )
		.map( level => [ level, config.message[ level ] ] )
		.reduce( ( message, [ level, config ] ) => Object.assign( message, { [ level ]: sgr( config ) } ), {} )
};
module.exports = ( application, log ) => ( { timestamp, name, level, message, meta, milliseconds } ) => {
	const hasMeta = !( meta === undefined || meta === null );
	let separateMeta = false;
	if( hasMeta ) {
		message = message + ':';
		separateMeta = meta instanceof Error || meta instanceof Object;
	}
	const output = [ sgrs.time( display.time( timestamp ) ), sgrs.name( `${application}.${name}` ), sgrs.message[ level ]( message ) ];
	if( hasMeta && !separateMeta )
		output.push( sgrs.meta( meta ) );
	if( milliseconds !== undefined )
		output.push( sgrs.milliseconds( `(in ${milliseconds.toFixed( 3 )} ms)` ) );
	log( ...output );
	if( separateMeta )
		log( sgrs.meta( meta instanceof Error ? meta : JSON.stringify( meta, null, 2 ) ) );
};
