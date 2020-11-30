/*
開いているファイルをピクセル毎にRGB値を取得し、
同階層にmalls.txtとして吐き出すプログラム
*/

/*
readしたものを加えてwriteするときにずれちゃうのが解消しない！！
*/




preferences.rulerUnits = Units.PIXELS;
docw = activeDocument.width;
doch = activeDocument.height;

// 格納フォルダの作成
fPath = activeDocument.path;
dName = activeDocument.name.split(".");

foldername = fPath + "/" + dName[0] + "_getlab";
folderObj = new Folder(foldername);
folderObj.create();


/*
uDlg = new Window('dialog','サンプル',[100,100,505,220]);
uDlg.pBar = uDlg.add("progressbar",[10,30,10+384,30+15], 0, 100);
uDlg.okBtn = uDlg.add("button",[130,80,225,80+25], "OK!", { name:"ok"});
uDlg.pBar.value = 1/docw*doch;
uDlg.show();
*/
l = ["L"];
a = ["A"];
b = ["B"];

lab=["l","a","b"];

mySampl = activeDocument.colorSamplers.add([0.5,0.5]);
c = 0;


nx = 0.5;
ny = 0.5;

for (ii=0; ii<=doch-2;ii++)
{
  for (i=0;i<=docw-2;i++)
  {
    if (nx == 0.5)
    {
      p = 1;
    }else{
      p = -1;
    }

    nx = nx + p;

    l[c] = parseInt(mySampl.color.lab.l);
    a[c] = Math.round(eval(mySampl.color.lab.a)*100)/100;
    b[c] = Math.round(eval(mySampl.color.lab.b)*100)/100;
    c++;

    mySampl.move([nx,ny]);

    iii = 1;
    iii++;
    if(c == 50)
    {
      labn=0;
      while(labn<=2)
      {
        filename = foldername + "/" + dName[0] + "_" + lab[labn] +".txt";
        fileObj = new File(filename);
        fileObj.open("r");
        t = fileObj.read();
        fileObj.close();
        fileObj.open("w");
        if(labn == 0)
        {
          fileObj.write(t+l);

        }if(labn == 1){
          fileObj.write(t+a);
        }else{
          fileObj.write(t+b);
        }
        fileObj.close();
        labn++;
      }
      l = [];
      a = [];
      b = [];
      c = 0;
    }
  }
  ny = ny + 1;
}

for(labn=0; labn<=2; labn++)
{
  filename = foldername + "/" + dName[0] + "_" + lab[labn] +".txt";

  fileObj.open("r");
  t = fileObj.read();
  fileObj.close();
  fileObj.open("w");　
  if(labn==0)
  {
    fileObj.write(t+l);
  }if(labn==1){
    fileObj.write(t+a);
  }else{
    fileObj.write(t+b);
  }
  fileObj.close();
}



mySampl.remove();
