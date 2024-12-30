// Photoshop JSX 部分
function exportAndCopyToClipboard() {
    try {
        // 确保有打开的文档
        if (app.documents.length === 0) {
            alert("请先打开一个文档！");
            return;
        }

        // 获取当前文档
        var doc = app.activeDocument;
        
        // 准备临时保存路径
        var tempPath = Folder.temp + "/clipboarddata.png";
        
        // 准备导出选项
        var pngOptions = new ExportOptionsSaveForWeb();
        pngOptions.format = SaveDocumentType.PNG;
        pngOptions.PNG8 = false; // 使用 PNG-24
        pngOptions.transparency = true;
        
        // 导出文件
        doc.exportDocument(new File(tempPath), ExportType.SAVEFORWEB, pngOptions);
        
        // 准备 PowerShell 命令
        var psCommand = 'Add-Type -AssemblyName System.Windows.Forms; ' +
        'Add-Type -AssemblyName System.Drawing; ' +
        '[Windows.Forms.Clipboard]::SetImage([System.Drawing.Image]::FromFile("$env:TEMP\\clipboarddata.png"))';

// 执行 PowerShell 命令
        app.system('powershell -command "' + psCommand.replace(/"/g, '\\"') + '"');
        
        // 删除临时文件
        var tempFile = new File(tempPath);
        if (tempFile.exists) {
            tempFile.remove();
        }
        
    } catch(e) {
        alert("发生错误：" + e);
    }
}

// 执行函数
exportAndCopyToClipboard();