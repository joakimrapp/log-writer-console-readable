require( '../../../helpers/unit.js' )( ( sgr ) => {} )
	.describe( 'something' )
		.it( 'should', ( assert, sgr ) => {
			assert.equal( sgr().red.output( 'hej' ), '\033[' + 31 + 'mhej' + '\033[0m' );
		} )
		.done()
	.done();
