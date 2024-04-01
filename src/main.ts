import readline from 'readline';
import { Reactor } from "./reactor/reactor"

function usage() {
  console.log("")
  console.log("Usage: npx ts-node ./src/main.ts <input-file>")
  console.log("")

  process.exit(1)
}

function main() {
  const reactor = new Reactor()
  if ( ! process.argv[2] ) {
    usage()
  }  
  
  reactor.load(process.argv[2])

  console.clear()

  console.log("Menu: choose a | b command, q | quite to exit the program")
  console.log(" a. Print current state")
  console.log(" b. Change a value")
  console.log(" q. Quite the program")
  console.log("")
  console.log("# ")
  
  const rl = readline.createInterface(process.stdin, process.stdout);
  rl.setPrompt('# ');
  rl.prompt();

  rl.on('line', function(line) {
    if (line === "quite" || line === 'q') rl.close();    

    switch(line) {
    case 'a': reactor.print(rl); rl.write('\n'); break;
    // case 'b': reactor.print(); break;
    }

    rl.prompt();
  }).on('close',function(){
    process.exit(0);
  });

}

main()