# photoshop-clipboard-IO
使用前需要安装paste into file:https://github.com/eltos/PasteIntoFile/

ps默认不支持剪切板输入或者输出透明像素,这是一个结合paste into file程序,用来直接在photoshop上往剪切板输入png或者读取png的脚本文件

建议将jsx放入D:\Program Files\Adobe Photoshop 2024\Presets\Scripts这些文件夹中,然后录制一个动作,分配快捷键使用

![Animation](https://github.com/user-attachments/assets/b40093e7-c2c1-4366-b908-6bd74d366ecf)

## Clipboard Exporter
支持notion,支持微信,支持paste into file,
该jsx将当前画布导出为%temp%\ PsClipboardata.png,并拉取powershell运行cmd指令:
`"C:\\Program Files (x86)\\PasteIntoFile\\PasteIntoFile.exe" copy "%TEMP%\PsClipboardata.png"`

## Clipbard lmporter
利用paste into file使用JSX脚本将调用`"C:\Program Files (x86)\PasteIntoFile\PasteIntoFile.exe" -f "%temp%\WebPasteboardata.png" --overwrite`将剪贴板的数据保存到”%temp%\WebPasteboardata.png”，然后再使用jSX脚本将该图片置入到当前的PSD文件当中


