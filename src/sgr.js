const { colors, styles, effects } = require( '../config/sgr.json' );
const escape = '\033[';
class Sgr {
	constructor() {
		this.current = 0;
		this.config = [];
	}
	color( code ) {
		this.config.push( this.current + code );
		this.current = 0;
		return this;
	}
	style( code ) {
		this.current += code;
		return this;
	}
	effect( code ) {
		this.config.push( code );
		return this;
	}
	output( str ) {
		return `${escape}${this.config.join( ';' )}m${str}${escape}0m`;
	}
	get compiled() {
		if( this.config.length ) {
			const [ pre, post ] = [ `${escape}${this.config.join( ';' )}m`, `${escape}0m` ];
			return ( str ) => `${pre}${str}${post}`;
		}
		else
			return ( str ) => str;
	}
}
Object.keys( colors ).map( color => [ color, colors[ color ] ] ).forEach( ( [ color, code ] ) =>
	Object.defineProperty( Sgr.prototype, color, {
		get: function() { return this.color( code ); }
	} ) );
Object.keys( styles ).map( style => [ style, styles[ style ] ] ).forEach( ( [ style, code ] ) =>
	Object.defineProperty( Sgr.prototype, style, {
		get: function() { return this.style( code ); }
	} ) );
Object.keys( effects ).map( effect => [ effect, effects[ effect ] ] ).forEach( ( [ effect, code ] ) =>
	Object.defineProperty( Sgr.prototype, effect, {
		get: function() { return this.effect( code ); }
	} ) );
module.exports = () => new Sgr();
