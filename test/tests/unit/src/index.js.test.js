require( '../../../helpers/unit.js' )( ( writer ) => {} )
	.describe( 'something' )
		.it( 'should initialize', ( assert, writer ) => new Promise( resolve =>
			assert.ok( writer( 'test', undefined, () => resolve() ) ) ) )
		.done()
	.done();
