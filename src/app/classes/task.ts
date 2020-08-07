export class Task {
    _id:string;
    subject:string;
    issue:string;
    history:object;
    owner:string;
    notes:string;
    //messages:Message[];
}

export function workflow(x?){
  if(typeof x == "object"){
    let y = x
    y.state = y.history[y.history.length - 1]; // append current state time and its code
    y.state.phase = model.findIndex((state)=>state.code==y.state.code); // numeric position in workflow
    return y;
  }else if(typeof x == "number"){
    return model[x]; // only looking for information on one state
  }else{
    return model; // looking for the entire workflow, say, to generate groups
  }
}

const model = [
  {code:"A",name:"Draft",icon:"💡"},
  {code:"B",name:"Queued",icon:"🛎️️"},
  {code:"C",name:"Building",icon:"🏗️"},
  {code:"D",name:"Refactoring",icon:"🧹"},
  {code:"E",name:"Complete",icon:"🎉"}
]


/*
workflow(task) run as called from the server to load with current state properties
task.state.time // entered the state
workflow(task.state.phase).name // describe the state it occupies
workflow(task.state.phase + 1).code // what to save next in the history as it's advanced
*/

/*
export class Task {
  constructor(
    public _id?: string,
    public subject: string,
    public issue: string,
    public history: object,
    public owner: string
    //public messages: Message[]
  ){}
}
*/
