require( '../../../helpers/unit.js' )( ( writer ) => {} )
	.describe( 'something' )
		.it( 'should initialize', ( assert, writer ) => new Promise( resolve =>
			assert.ok( writer( 'test', undefined, () => resolve() ) ) ) )
		.it( 'should log a fatal log if log-emitter is not installed', ( assert, writer ) => new Promise( resolve =>
			assert.ok( writer( 'test', () => {}, ( time, name, message ) => {
				assert.ok( message.indexOf( 'Log emitter must be installed!' ) >= 0 );
				resolve();
			} ) ) ) )
		.done()
	.done();
