require( '../../../helpers/unit.js' )( ( logger ) => {} )
	.describe( 'something' )
		.it( 'should get a time', ( assert, logger ) => new Promise( resolve =>
			logger( 'test', ( ...str ) => {
				assert.ok( str.join( ' ' ).indexOf( '3.145' ) >= 0 );
				resolve();
			} )( { timestamp: 1, name: 'name', level: 3, message: 'message', milliseconds: 3.1452 } ) ) )
		.it( 'should log an object seperatly as json', ( assert, logger ) => new Promise( resolve => {
			let count = 0;
			logger( 'test', ( str ) => {
				if( ++count === 2 ) {
					assert.equal( str, JSON.stringify( {}, null, 2 ) );
					resolve();
				}
			} )( { timestamp: 1, name: 'name', level: 3, message: 'message', meta: {}, milliseconds: 3.1452 } );
		} ) )
		.it( 'should log an error seperatly as is', ( assert, logger ) => new Promise( resolve => {
			let count = 0;
			const error = new Error();
			logger( 'test', ( str ) => {
				if( ++count === 2 ) {
					assert.equal( str, error );
					resolve();
				}
			} )( { timestamp: 1, name: 'name', level: 3, message: 'message', meta: error, milliseconds: 3.1452 } );
		} ) )
		.done()
	.done();
