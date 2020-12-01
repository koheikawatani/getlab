/*
開いているファイルをピクセル毎にRGB値を取得し、
同階層にmalls.txtとして吐き出すプログラム
*/







preferences.rulerUnits = Units.PIXELS;
docw = activeDocument.width;
doch = activeDocument.height;

// 格納フォルダの作成
fPath = activeDocument.path;
dName = activeDocument.name.split(".");

foldername = fPath + "/" + dName[0] + "_getlab";
folderObj = new Folder(foldername);
flag = folderObj.exists;

// フォルダが重複した場合は末尾に数字を追加して重複回避
fn = 1;
while (flag == true)
{
  foldername = fPath + "/" + dName[0] + "_getlab_"+fn;
  folderObj = new Folder(foldername);
  flag = folderObj.exists;
  fn++;
}
folderObj.create();

l = ["L"];
a = ["A"];
b = ["B"];
iii = 1;
lab=["l","a","b"];


mySampl = activeDocument.colorSamplers.add([0.5,0.5]);
c = 0;


nx = 0.5;
ny = -0.5;

while ( ny < doch )
{
  ny++;
  if((ny + 0.5) % 2 == 0)
  {
    nx--;
  }else{
    nx++;
  }

  while((nx <= docw-0.5) && (0.5 <= nx))
  {
    alert(ny);
    l[c] = parseInt(mySampl.color.lab.l);
    a[c] = Math.round(eval(mySampl.color.lab.a)*100)/100;
    b[c] = Math.round(eval(mySampl.color.lab.b)*100)/100;
    c++;
    mySampl.move([nx,ny]);
    if((ny + 0.5) % 2 == 0)
    {
      nx--;
    }else{
      nx++;
    }
    if(c == 10)
    {
      v = [l, a, b];
      for(i=0; i<=2;i++)
      {
      save(i,v[i])
      }
      l = [];
      a = [];
      b = [];
      v = [];
      c = 0;
    }
  }
}
v = [l, a, b];
for(i=0; i<=2;i++)
{
  save(i,v[i])
}

// L,a,b - 0,1,2
function save (chn, chv)
{
  filename = foldername + "/" + dName[0] + "_" + lab[chn] +".txt";
  fileObj = new File(filename);
  fileObj.open("r");
  t= fileObj.read();
  fileObj.close();
  fileObj.open("w");
  fileObj.write(t + chv + ",");
  fileObj.close();
}

mySampl.remove();
