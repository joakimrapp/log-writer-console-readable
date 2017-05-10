const absolute = ( moment ) => ( ts = Date.now() ) => 'A ' + moment( ts ).format( 'HH:mm:ss.SSS' );
const relative = ( timestamp ) => ( ts = Date.now() ) => 'R ' + new Date( ts - timestamp ).toISOString().slice( 11, 23 );
module.exports = {
	time: relative( Date.now() ),
	absolute: () => ( module.exports.time = absolute( require( 'moment' ) ) ),
	relative: () => ( module.exports.time = relative( Date.now() ) )
};
