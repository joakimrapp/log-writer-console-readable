require( '@jrapp/node-project-setup' ).testing.file( './test/file' )( ( display ) => {} )
	.it( 'should start off as relative', ( assert, display ) =>
		assert.equal( display.time().charAt( 0 ), 'R' ) )
	.it( 'should switch to absolute', ( assert, display ) => {
		display.absolute();
		assert.equal( display.time().charAt( 0 ), 'A' );
	} )
	.it( 'should switch to relative', ( assert, display ) => {
		display.relative();
		assert.equal( display.time().charAt( 0 ), 'R' );
	} )
	.done();
