let selectedFile;
let model = [];
let pitcherInput;
let batterInput;

let batterID;
let pitcherID;
let batterName;
let pitcherName;

let model_index;



document.addEventListener("DOMContentLoaded", function(){
    document.getElementById('input').addEventListener("change", (event)=>{
    selectedFile = event.target.files[0];

})

//this will convert the excel sheet to a json and output it
document.getElementById('button').addEventListener("click", ()=>{
    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload=(event)=>{
            // console.log(event.target.result);
            let data = event.target.result;
            let workbook = XLSX.read(data, {type:"binary"});
            // console.log(workbook);
            const sheetName = "Data";
                model = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                console.log(model);
        }
    }
})

});

// this will change the view once the file is converted
function handle_submit_event(){
    document.querySelector('#submit').onclick = ()=>{

    pitcherInput = document.querySelector('#pitcherInput').value;
    console.log(pitcherInput);

    batterInput = document.querySelector('#batterInput').value;
    console.log(batterInput);

    document.querySelector('#next').onclick = () =>{  model_index=return_index(batterInput,model);
        console.log(model_index);
        render_view ('#player_info', model_index);
    }
    } 
}

var find_index= (batterInput, model)=>{
    let matchFound = false;

    for (let i=0; i<model.length; i++){
        if(batterInput == model[i].BATTER_ID || pitcherInput == model[i].PITCHER_ID || batterInput == model[i].BATTER || pitcherInput == model){
            if(!matchFound){
                console.log('Match Found!',model[i].BATTER_ID);
                matchFound = true;
                return (model[i].__rowNum__)-1;
            }
            
        }
    }
    if(!matchFound){
        console.log('No match Found.');
        return null;
    }
}

var return_index = (batterInput,model) =>{
    let index = find_index(batterInput, model);
    console.log(index);
    return model[index];
}

//intial view has the first inputs fields for the user to submit the player ID/names
function initial_view(view_id) {
    console.log("Rendering View");
    var source = document.querySelector(view_id).innerHTML;
    var template = Handlebars.compile(source);
    var html = template();
    document.querySelector('#view_widget').innerHTML = html;
}
var render_view= (view_id, model_index) =>{
    console.log("Rendering View");
    var source = document.querySelector(view_id).innerHTML;
    var template = Handlebars.compile(source);
    var html = template(model_index);

    document.querySelector('#view_widget').innerHTML=html;
};


