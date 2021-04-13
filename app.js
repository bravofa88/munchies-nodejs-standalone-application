const yargs = require('yargs/yargs')(process.argv.slice(2));
const { getProduct, showProducts, removeProduct, readProduct } = require('./munchies');


//Yargs handles command with query
    yargs.command({
        command: 'get',
        desc: 'calls the API with your query',
        builder: {
            food: {
                describe: "food description",
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv)  {
            getProduct(argv.food);
        }
    })
    .argv

//yargs handler for removing a query from a local list.
    yargs.command({
        command: 'remove',
        desc: 'removes food query from your.',
        builder: {
            food: {
                describe: "food description",
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv)  {
            removeProduct(argv.food);
        }
    }).argv


//Yargs handle for displaying list of queries.
    yargs.command({
        command: 'list',
        desc: 'display all calls to API',
        handler() {
            showProducts();
        }
    }).argv


    yargs.command({
        command: 'read',
        describe: 'read a query',
        builder: {
            food: {
                describe: 'Query',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            readProduct(argv.food);
        }
    }).argv

yargs.parse();

