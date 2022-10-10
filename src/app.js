let express = require( 'express' );
let app = express();
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );

const {MongoClient} = require('mongodb');
const Thing = require('./models/user');

async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb+srv://Tarek:Tarek@cluster0.jzh9xbj.mongodb.net/?retryWrites=true&w=majority";


  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      await client.connect();
      console.log("Connected correctly to server");

      // Make the appropriate DB calls

  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
  
}


main().catch(console.error);



app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );
app.get( '/login', ( req, res ) => {
    res.sendFile(__dirname +'/login.html' );
} );





io.of( '/stream' ).on( 'connection', stream );

server.listen( 3000 );
