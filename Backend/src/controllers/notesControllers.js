import Note from "../models/Note.js";

export async function getAllNotes(req,res){
    try{
        const result=await Note.find().sort({createdAt:-1}); //newest first
        res.status(200).json(result);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Could not fetch notes"});
    }
};

export async function getNoteById(req,res){
    try{
        const result=await Note.findById(req.params.id);
        if(!result){
            res.status(404).json({message:"Note not found"})
        }
        res.status(200).json(result);
    }
    catch(err){
        console.log("err");
        res.status(500).json({message:`${err}`});
    }
};

export async function createNote(req,res){
    try{
        let {title,content}=req.body;
        const result=await Note.insertOne({title, content  });
        res.status(200).json(result);
    }
    catch(err){
        console.log("err");
        res.status(500).json({message:`${err}`});
    }
}

export async function deleteNote(req,res){
    try{
        let {id}=req.params;
        const result=await Note.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(result);
    }
    catch(err){
        console.log("err");
        res.status(500).json({message:`${err}`});
    }
}

export async function editNote(req,res){
    try{
        const {title, content}=req.body;
        const {id}=req.params;
        const updatedNote = await Note.findByIdAndUpdate(id,{ title, content },{ new: true });
        res.status(200).json(updatedNote);
    }
    catch(err){
        res.status(500).json({message:`${err}`});
    }
}