#target photoshop;

app.bringToFront();
var selectedFolder=Folder.selectDialog("Please select folder");
main();

function main(){

	if (selectedFolder!=null){		
	const maskList=selectedFolder.getFiles("*_Mask.psd");
	const fileList=selectedFolder.getFiles("*_Rend.psd");
	alert(fileList.toString())
	alert(maskList.toString())
	if(fileList.length>0){
		for(var i=0; i<fileList.length; i++){
			app.open(fileList[i])
			app.open(maskList[i])
			app.activeDocument.activeLayer.copy()
			app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)
			mask();
			selectMask();
			app.activeDocument.paste();
			save();
			app.activeDocument.close(SaveOptions.DONOTSAVECHANGES)
		}
	} else {
		alert ("File list empty")
	}
	}

}

function mask(){
var idMk = charIDToTypeID( "Mk  " );
    var desc283 = new ActionDescriptor();
    var idNw = charIDToTypeID( "Nw  " );
    var idChnl = charIDToTypeID( "Chnl" );
    desc283.putClass( idNw, idChnl );
    var idAt = charIDToTypeID( "At  " );
        var ref1 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idChnl = charIDToTypeID( "Chnl" );
        var idMsk = charIDToTypeID( "Msk " );
        ref1.putEnumerated( idChnl, idChnl, idMsk );
    desc283.putReference( idAt, ref1 );
    var idUsng = charIDToTypeID( "Usng" );
    var idUsrM = charIDToTypeID( "UsrM" );
    var idRvlA = charIDToTypeID( "RvlA" );
    desc283.putEnumerated( idUsng, idUsrM, idRvlA );
executeAction( idMk, desc283, DialogModes.NO );
}

function selectMask(){
	var idslct = charIDToTypeID( "slct" );
    var desc289 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
        var ref2 = new ActionReference();
        var idChnl = charIDToTypeID( "Chnl" );
        var idOrdn = charIDToTypeID( "Ordn" );
        var idTrgt = charIDToTypeID( "Trgt" );
        ref2.putEnumerated( idChnl, idOrdn, idTrgt );
    desc289.putReference( idnull, ref2 );
    var idMkVs = charIDToTypeID( "MkVs" );
    desc289.putBoolean( idMkVs, true );
executeAction( idslct, desc289, DialogModes.NO );

}

function save(){

if(!documents.length) return;

try{

    var Path = decodeURI(activeDocument.path);

    }catch(e){alert(e); return;}   //Let the user know about the problem

if(!Folder(Path).exists){

    alert(Path + " Does not exist!");

    return;

    }

var Name = decodeURI(app.activeDocument.name).replace(/\.[^\.]+$/, '');

var saveFile = File(Path + "/" + Name + ".png");

sfwPNG24(saveFile);

// app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

}

function sfwPNG24(saveFile){

var pngOpts = new PNGSaveOptions;

pngOpts.compression = 9;

pngOpts.interlaced = false;

activeDocument.saveAs(saveFile, pngOpts, true, Extension.LOWERCASE);

}