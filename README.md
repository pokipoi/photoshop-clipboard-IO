# photoshop-clipboard-IO
使用前需要安装paste into file:https://github.com/eltos/PasteIntoFile/

ps默认不支持剪切板输入或者输出透明像素,这是一个结合paste into file程序,用来直接在photoshop上往剪切板输入png或者读取png的脚本文件

建议将jsx放入D:\Program Files\Adobe Photoshop 2024\Presets\Scripts这些文件夹中,然后录制一个动作,分配快捷键使用

![Animation](https://github.com/user-attachments/assets/b40093e7-c2c1-4366-b908-6bd74d366ecf)

## Clipboard Exporter
支持notion,支持微信,支持paste into file

2025/6更新:通过脚本将当前画布内容输出到%temp%PasteIntoFile/文件夹,并用PsClipboardata+当前时间命名
格式参考"C:\WINDOWS\TEMP\PsClipboardata_20250602_030317.png"
经过该更新可以支持ditto直接管理剪切板数据

## Clipbard lmporter
利用paste into file使用JSX脚本将调用`"C:\Program Files (x86)\PasteIntoFile\PasteIntoFile.exe" -f "%temp%\WebPasteboardata.png" --overwrite`将剪贴板的数据保存到”%temp%\WebPasteboardata.png”，然后再使用jSX脚本将该图片置入到当前的PSD文件当中

## 已知bug
~~当ps目录中有PSUserConfig.txt时，不管有没有内容，脚本都不起作用，具体表现为不能执行脚本中调用外部程序的代码段~~

判断是windows升级时更改了脚本运行策略，不再默认支持cmd命令调用，应该更新为powershell调用。



