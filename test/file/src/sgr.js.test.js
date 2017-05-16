require( '@jrapp/node-project-setup' ).testing.file( './test/file' )( ( sgr ) => {} )
	.it( 'should output a red string', ( assert, sgr ) => {
		assert.equal( sgr().red.output( 'hej' ), '\033[' + 31 + 'mhej' + '\033[0m' );
	} )
	.done();
