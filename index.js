const writer = require( '.' )( 'test-app' );
const log = require( '@jrapp/log-emitter' ).log( 'testModule' );
log.info( 'hej', 'hopp' );
writer.absolute();
log.info( 'hej', 'hopp' );
log.trace( 'hej', 'hopp' );
log.error( 'hej', 'hopp' );
